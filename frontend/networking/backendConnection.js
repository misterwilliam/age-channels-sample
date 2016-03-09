import Store from '../store'
import { addMessage } from '../actions/actions'

function getJsonFromUrl(query) {
  var result = {};
  query.split("&").forEach(function(part) {
    var item = part.split("=");
    result[item[0]] = decodeURIComponent(item[1]);
  });
  return result;
}

export default class BackendConnection {

  constructor(channelToken) {
    const channel = new goog.appengine.Channel(channelToken);
    const socket = channel.open({
        onmessage: (message) => {
          let params = getJsonFromUrl(message.data);
          Store.dispatch(addMessage(params.message, params.author));
        },
        onopen: () => {
          console.log("opened");
        },
        onerror: () => {
          console.log("socket error");
        },
        onclose: () => {
          console.log("close");
        }
    });
  }

}
