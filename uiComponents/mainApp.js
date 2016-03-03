import React from 'react'

import { OneLineInputForm, VisibleMessageList} from './components'

export default class MainApp extends React.Component {
  render() {
    return (
      <div>
        <OneLineInputForm />
        <VisibleMessageList />
      </div>
    )
  }
}
