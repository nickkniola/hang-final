import React from 'react';
import io from 'socket.io-client';

export default class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      chat: []
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSend = this.handleSend.bind(this);
  }

  componentDidMount() {
    this.socket = io();
    this.params = new URLSearchParams(this.props.location.search);
    this.userId = this.params.get('userId');
    this.partnerId = this.params.get('partnerId');
    fetch(`/api/messages/${this.userId}/${this.partnerId}`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          chat: data
        });
      })
      .catch(() => console.error('An unexpected error occurred'));
  }

  componentWillUnmount() {
    this.socket.disconnect();
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
    this.socket.emit('send-message', { message: this.state.message, userId: this.userId, partnerId: this.partnerId });
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
