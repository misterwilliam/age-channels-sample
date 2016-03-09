import { ADD_MESSAGE, SWITCH_USERNAME, SET_CHANNEL_TOKEN } from './actionTypes'

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

export function setChannelToken(token) {
  return {
    type: SET_CHANNEL_TOKEN,
    token: token
  }
}
