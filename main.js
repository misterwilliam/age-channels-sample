const React = require('react');
const ReactDOM = require('react-dom');

class Message extends React.Component {
  render() {
    return (
      <div>
        {this.props.author}: {this.props.message}
      </div>
    )
  }
}

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

class App extends React.Component {
  render() {
    return (
      <div>
        <Input/>
        <Message author="author" message="yo" />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('wrapper')
);
