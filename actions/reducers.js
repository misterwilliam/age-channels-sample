import { combineReducers } from 'redux'
import { ADD_MESSAGE } from './actionTypes'

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

export default combineReducers({
  messages: messagesReducer
})
