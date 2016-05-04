import { ADD_MESSAGE, SWITCH_USERNAME } from './actionTypes'

export function addMessage(message, author) {
  return {
    type: ADD_MESSAGE,
    message: message,
    author: author,
  }
}

export function switchUsername(username) {
  return {
    type: SWITCH_USERNAME,
    username: username,
  }
}
