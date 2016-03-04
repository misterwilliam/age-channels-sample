export default class Message {
  static sendMessage(message, author) {
    let data = new FormData();
    data.append("message", message);
    data.append("author", author);

    let req = new XMLHttpRequest();
    req.open("POST", "api/message", true);
    req.send(data);
  }
}
