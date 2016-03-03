import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import { MainReducer } from './actions/reducers'
import { App } from './uiComponents/components'

let store = createStore(MainReducer, {messages: [
  {id: 0, message: "yo", author: "me"}
]});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('wrapper')
);
