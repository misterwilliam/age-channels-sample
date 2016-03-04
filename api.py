import webapp2

from google.appengine.api import channel
from google.appengine.api import users

open_channels = set()

class ChannelDidConnect(webapp2.RequestHandler):

    def get(self):
        user = users.get_current_user()
        if user:
            print "opening with: %s" % user.user_id()
            open_channels.add(user.user_id())

class ChannelDisconnect(webapp2.RequestHandler):

    def get(self):
        user = users.get_current_user()
        if user:
            print "closing with: %s" % user.user_id()
            open_channels.remove(user.user_id())


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

    def get(self):
        user = users.get_current_user()
        if not user:
            return
        channel.send_message(user.user_id(), "ACK")


app = webapp2.WSGIApplication([
    ('/api/channel', ChannelRequest),
    ('/api/message', Message),
    ('/_ah/channel/connected/', ChannelDidConnect),
    ('/_ah/channel/disconnected/', ChannelDisconnect),
])
