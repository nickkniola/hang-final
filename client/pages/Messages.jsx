import React from 'react';
import io from 'socket.io-client';

export default class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSend = this.handleSend.bind(this);
  }

  handleClick() {
    this.props.history.push('/matches');
  }

  handleChange(event) {
    this.setState({
      message: event.target.value
    });
  }

  handleSend(event) {
    const params = new URLSearchParams(this.props.location.search);
    const userId = params.get('userId');
    const partnerId = params.get('partnerId');
    const socket = io();
    socket.emit('send-message', { message: this.state.message, userId: userId, partnerId: partnerId });
  }

  render() {
    return (
      <>
        <button className="ui icon button basic message-button" onClick={this.handleClick}>
          <i className="angle left icon"></i>
        </button>
        <h3 className="secondary-header message-header">Messages</h3>
        <div className="ui divider message-divider"></div>
        <div className="ui grid two columns message-container">
          <div className="row blue-message-left">
            <div className="ui compact blue message left floated column" >
              <p></p>
            </div>
          </div>
          <div className="row blue-message-right">
            <div className="ui compact blue message right floated column" >
              <p></p>
            </div>
          </div>
        </div>
        <div className="ui fluid action input send-message ">
          <input type="text" placeholder="" value={this.state.message} onChange={this.handleChange}/>
          <button type="button" className="ui icon button blue" onClick={this.handleSend}>
            <i className="send icon "></i>
          </button>
        </div>
      </>
    );
  }
}
