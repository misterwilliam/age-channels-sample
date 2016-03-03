import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import { MainReducer } from './actions/reducers'
import MainApp from './uiComponents/mainApp'

let store = createStore(MainReducer);

ReactDOM.render(
  <Provider store={store}>
    <MainApp />
  </Provider>,
  document.getElementById('wrapper')
);
