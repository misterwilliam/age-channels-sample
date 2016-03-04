export default class BackendConnection {

  constructor(channelToken) {
    const channel = new goog.appengine.Channel(channelToken);
    const socket = channel.open({
        onmessage: (message) => {
          console.log(message);
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
