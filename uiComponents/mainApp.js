import React from 'react'
import { connect } from 'react-redux'

import { OneLineInputForm, VisibleMessageList} from './components'
import { addMessage } from '../actions/actions'

class MainApp extends React.Component {
  render() {
    return (
      <div>
        <OneLineInputForm onSubmit={this.props.handleSubmit.bind(this)}/>
        <VisibleMessageList />
      </div>
    )
  }
}

const ConnectedMainApp = connect(
  null,
  (dispatch) => {
    return {
      handleSubmit: (messsage) => {
        dispatch(addMessage(messsage.message, messsage.author))
      }
    }
  }
)(MainApp)

export default ConnectedMainApp
