import React from 'react'

export class LiveOneLineInputForm extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        value: this.props.initialValue != null ? this.props.initialValue : ""
      }
  }

  render() {
    return (
      <form>
        <input type="text" value={this.state.value}
               onChange={this.handleChange.bind(this)} />
      </form>
    )
  }

  handleChange(event) {
    this.setState({value: event.target.value});
    this.props.onChange(event.target.value);
  }

}
