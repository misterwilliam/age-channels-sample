import React from 'react'
import { connect } from 'react-redux'

import { OneLineInputForm, VisibleMessageList} from './components'
import { addMessage, switchUsername, setChannelToken } from '../actions/actions'
import { LiveOneLineInputForm } from './presentation/liveOneLineInputForm'

class MainApp extends React.Component {

  componentDidMount() {
    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", (event) => {
      if (this.props.handleChannelTokenUpdate != null) {
        this.props.handleChannelTokenUpdate(event.target.responseText);
      }
    });
    oReq.open("GET", "api/channel");
    oReq.send();
  }

  render() {
    console.log(this.props);
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
      username: state.username,
      token: state.token
    }
  },
  (dispatch, props) => {
    return {
      handleSubmit: (username, message) => {
        dispatch(addMessage(message, username));
      },
      handleUsernameChange: (value) => {
        dispatch(switchUsername(value));
      },
      handleChannelTokenUpdate: (token) => {
        dispatch(setChannelToken(token));
      }
    }
  }
)(MainApp)

export default ConnectedMainApp
