import webapp2

from google.appengine.api import channel
from google.appengine.api import users

open_channels = set()

class ChannelDidConnect(webapp2.RequestHandler):

    def post(self):
        open_channels.add(self.request.get("from"))

class ChannelDisconnect(webapp2.RequestHandler):

    def post(self):
        channelId = self.request.get("from")
        if channelId in open_channels:
            open_channels.remove()


class ChannelRequest(webapp2.RequestHandler):

    def get(self):
        user = users.get_current_user()
        if not user:
            self.response.write({"token": ""})
            return
        token = channel.create_channel(user.user_id())
        self.response.write(
            "{\"token\": \"%s\"}" % token
        )


class Message(webapp2.RequestHandler):

    def post(self):
        # Only accept messages from logged in users
        user = users.get_current_user()
        if not user:
            return
        print "Current channels: %s" % open_channels
        for channelId in open_channels:
            channel.send_message(channelId, self.request.body)


app = webapp2.WSGIApplication([
    ('/api/channel', ChannelRequest),
    ('/api/message', Message),
    ('/_ah/channel/connected/', ChannelDidConnect),
    ('/_ah/channel/disconnected/', ChannelDisconnect),
])
