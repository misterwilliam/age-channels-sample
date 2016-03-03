import webapp2

from google.appengine.api import channel
from google.appengine.api import users

class Channel(webapp2.RequestHandler):
    def get(self):
        user = users.get_current_user()
        if not user:
            self.response.write({"token": ""})
            return
        token = channel.create_channel(user.user_id())
        self.response.write({"token": token})

app = webapp2.WSGIApplication([
    ('/api/channel', Channel),
])
