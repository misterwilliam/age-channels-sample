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

export const VisibleMessageList = connect(
  (state) => {
    return {
      messages: state.messages
    }
  }
)(MessageList)

export class OneLineInputForm extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        value: this.props.initialValue != null ? this.props.initialValue : ""
      }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)} >
        <input type="text" value={this.state.value}
               onChange={this.handleChange.bind(this)} />
      </form>
    )
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.props.onSubmit != null) {
      this.props.onSubmit(this.state.value);
    }

    this.setState({value: ""});
  }
}
