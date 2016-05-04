import webapp2

from google.appengine.api import channel
from google.appengine.api import users
from google.appengine.api import xmpp

import models.models as models

open_channels = set()
previousChannels = models.Channel.query().fetch()
print "Retrieved: %s" % previousChannels
for _channel in previousChannels:
    open_channels.add(_channel.channelId)

class ChannelDidConnect(webapp2.RequestHandler):

    def post(self):
        channelId = self.request.get("from")
        print "Got connection: %s" % channelId
        if channelId not in open_channels:
            # Add to local set of channels
            open_channels.add(channelId)

            # Save to datastore
            channel = models.Channel()
            channel.channelId = channelId
            channel.put()

class ChannelDisconnect(webapp2.RequestHandler):

    def post(self):
        channelId = self.request.get("from")
        print "Got disconnection: %s" % channelId

        if channelId in open_channels:
            open_channels.remove(channelId)
            # Delete from datastore
            channels = models.Channel.query(
                        models.Channel.channelId==channelId
                      ).fetch(1)
            channels[0].key.delete()


class ChannelRequest(webapp2.RequestHandler):

    def get(self):
        user = users.get_current_user()
        if not user:
            print "Invalid user requesting channel"
            self.response.write({"token": ""})
            return
        token = channel.create_channel(user.user_id())
        self.response.write(
            "{\"token\": \"%s\"}" % token
        )
        print "Passing token: %s" % token


class Message(webapp2.RequestHandler):

    def post(self):
        self.handleRequest()

    def get(self):
        self.handleRequest()

    def handleRequest(self):
        print open_channels
        message = self.request.params["message"]
        author = self.request.params["author"]
        for channelId in open_channels:
            channel.send_message(
                channelId,
                "message=%s&author=%s" % (
                    message, author))
        # Send through XMPP
        xmpp.send_message("gae-channels-1@appspot.com", message)


class XMPPHandler(webapp2.RequestHandler):
    def post(self):
        message = xmpp.Message(self.request.POST)
        for channelId in open_channels:
            channel.send_message(
                channelId,
                "message=%s&author=xmpp-%s" % (
                    message.body,
                    message.sender,
                )
            )


app = webapp2.WSGIApplication([
    ('/api/channel', ChannelRequest),
    ('/api/message', Message),
    ('/_ah/channel/connected/', ChannelDidConnect),
    ('/_ah/channel/disconnected/', ChannelDisconnect),
    ('/_ah/xmpp/message/chat/', XMPPHandler)
])
