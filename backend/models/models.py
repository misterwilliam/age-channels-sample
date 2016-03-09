from google.appengine.ext import ndb

class Channel(ndb.Model):

    channelId = ndb.StringProperty()
