import { ADD_MESSAGE } from './actionTypes'

export function addMessage(message, author) {
  return {
    type: ADD_MESSAGE,
    message: message,
    author: author,
  }
}
