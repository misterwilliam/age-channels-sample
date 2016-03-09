import webapp2

from google.appengine.api import users

class Main(webapp2.RequestHandler):
    def get(self):
        user = users.get_current_user()

        if user:
            self.redirect('/chat')
        else:
            self.redirect(users.create_login_url(self.request.uri))

class Logout(webapp2.RequestHandler):
    def get(self):
        self.redirect(users.create_logout_url('/'))

app = webapp2.WSGIApplication([
    ('/', Main),
    ('/logout', Logout)
])
