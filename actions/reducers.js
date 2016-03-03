import { combineReducers } from 'redux'
import { ADD_MESSAGE, SWITCH_USERNAME, SET_CHANNEL_TOKEN } from './actionTypes'

function usernameReducer(state = "anonymous", action) {
  switch(action.type) {
    case SWITCH_USERNAME:
      return action.username;
    default:
      return state;
  }
}

let nextMessageId = 0;
function messagesReducer(state = [], action) {
  switch (action.type) {
    case ADD_MESSAGE:
      return [
        ...state, {
          id: nextMessageId++,
          message: action.message,
          author: action.author
        }]
    default:
      return state;
  }
}

function tokenReducer(state = "", action) {
  switch (action.type) {
    case SET_CHANNEL_TOKEN:
      if (action.token != "") {
        const channel = new goog.appengine.Channel(action.token);
        const socket = channel.open();
        socket.onmessage = (message) => {
          console.log(message);
        }
        socket.onopen = () => {
          console.log("opened");
        }
        socket.onerror = () => {
          console.log("socket error");
        }
        socket.onclose = () => {
          console.log("close");
        }

        console.log("Send to api/message")
        var oReq = new XMLHttpRequest();
        oReq.open("GET", "api/message");
        oReq.send();
      }

      return action.token;
    default:
      return state;
  }
}

export default combineReducers({
  messages: messagesReducer,
  username: usernameReducer,
  token: tokenReducer,
})
