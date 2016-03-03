import React from 'react'

import { connect } from 'react-redux'

class Message extends React.Component {
  render() {
    return (
      <div>
        {this.props.author}: {this.props.message}
      </div>
    )
  }
}

class MessageList extends React.Component {
  render() {
    return (
      <div>
        {this.props.messages.map(
          msg => <Message key={msg.id}
                          author={msg.author} message={msg.message} />
        )}
      </div>
    )
  }
}

const VisibleMessageList = connect(
  (state) => {
    return {
      messages: state.messages
    }
  }
)(MessageList)

class Input extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        value: ""
      }
  }

  render() {
    return (
      <input type="text" value={this.state.value}
             onChange={this.handleChange} />
    )
  }
}

export class App extends React.Component {
  render() {
    return (
      <div>
        <Input/>
        <VisibleMessageList />
      </div>
    )
  }
}
