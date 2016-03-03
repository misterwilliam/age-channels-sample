import { ADD_MESSAGE } from './actionTypes'

const initialState = {
  messages: []
}

export function MainReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_MESSAGE:
      return Object.assign({}, state, {
        messages: [
          ...state.messages,
          {
            message: action.message,
            author: action.author
          }
        ]
      })
    default:
      return state;
  }
}
