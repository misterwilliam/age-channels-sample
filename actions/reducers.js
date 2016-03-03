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
