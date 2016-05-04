import React from 'react'
import { connect } from 'react-redux'

import { OneLineInputForm, VisibleMessageList} from './components'
import { addMessage, switchUsername } from '../actions/actions'
import { LiveOneLineInputForm } from './presentation/liveOneLineInputForm'

import BackendConnection from '../networking/backendConnection'
import Message from '../domainModel/message'

class MainApp extends React.Component {

  componentDidMount() {
    let oReq = new XMLHttpRequest();
    oReq.addEventListener("load", (event) => {
      const response = JSON.parse(event.target.responseText);
      console.log("Got token", response);
      this.backendConnection = new BackendConnection(response.token);
    });
    oReq.open("GET", "api/channel");
    oReq.send();
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <a href="/logout">logout</a>
        <h1>Username</h1>
        <LiveOneLineInputForm
            onChange={this.props.handleUsernameChange.bind(this)}
            initialValue={this.props.username}/>
        <button onClick={this.handleCloseConnection.bind(this)}>Close connection</button>
        <h1>Messages</h1>
        <OneLineInputForm onSubmit={
          this.props.handleSubmit.bind(this, this.props.username)
        } />
        <VisibleMessageList />
      </div>
    )
  }

  handleCloseConnection() {
    if (this.backendConnection != null) {
      this.backendConnection.close();
    }
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
        Message.sendMessage(message, username);
      },
      handleUsernameChange: (value) => {
        dispatch(switchUsername(value));
      }
    }
  }
)(MainApp)

export default ConnectedMainApp
