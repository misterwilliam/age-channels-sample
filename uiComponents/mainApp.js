import React from 'react'
import { connect } from 'react-redux'

import { OneLineInputForm, VisibleMessageList} from './components'
import { addMessage, switchUsername } from '../actions/actions'

class MainApp extends React.Component {
  render() {
    return (
      <div>
        <h1>Username</h1>
        <OneLineInputForm onSubmit={this.props.handleUsernameChange.bind(this)} />
        <h1>Messages</h1>
        <OneLineInputForm onSubmit={this.props.handleSubmit.bind(this)} />
        <VisibleMessageList />
      </div>
    )
  }
}

const ConnectedMainApp = connect(
  null,
  (dispatch) => {
    return {
      handleSubmit: (value) => {
        dispatch(addMessage(value, "not yet implemented"));
      },
      handleUsernameChange: (value) => {
        dispatch(switchUsername(value));
      }
    }
  }
)(MainApp)

export default ConnectedMainApp
