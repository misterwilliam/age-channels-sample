import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'

import Store from './store'
import MainApp from './uiComponents/mainApp'

ReactDOM.render(
  <Provider store={Store}>
    <MainApp />
  </Provider>,
  document.getElementById('wrapper')
);
