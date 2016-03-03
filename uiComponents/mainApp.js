import React from 'react'
import { connect } from 'react-redux'

import { OneLineInputForm, VisibleMessageList} from './components'
import { addMessage, switchUsername } from '../actions/actions'
import { LiveOneLineInputForm } from './presentation/liveOneLineInputForm'

class MainApp extends React.Component {

  componentDidMount() {
    function reqListener () {
      console.log(this.responseText);
    }

    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", reqListener);
    oReq.open("GET", "api/channel");
    oReq.send();
  }

  render() {
    return (
      <div>
        <h1>Username</h1>
        <LiveOneLineInputForm
            onChange={this.props.handleUsernameChange.bind(this)}
            initialValue={this.props.username}/>
        <h1>Messages</h1>
        <OneLineInputForm onSubmit={
          this.props.handleSubmit.bind(this, this.props.username)
        } />
        <VisibleMessageList />
      </div>
    )
  }
}

const ConnectedMainApp = connect(
  (state) => {
    return {
      username: state.username
    }
  },
  (dispatch, props) => {
    return {
      handleSubmit: (username, message) => {
        dispatch(addMessage(message, username));
      },
      handleUsernameChange: (value) => {
        dispatch(switchUsername(value));
      }
    }
  }
)(MainApp)

export default ConnectedMainApp
