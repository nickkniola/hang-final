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
    this.socket.on('emit-message', (data, socketId) => {
      console.log('data', data);
      this.socketId = socketId;
      if (!socketId) {
        this.socketId = this.socket.id;
        console.log('socket.id', this.socket.id);
      }
    });
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
    this.socket.emit('send-message', { message: this.state.message, userId: this.userId, partnerId: this.partnerId }, this.socketId);
    this.setState({ message: '' });
  }

  render() {
    const messages = this.state.chat;
    const userId = parseInt(this.userId);
    return (
      <>
        <button className="ui icon button basic message-button" onClick={this.handleClick}>
          <i className="angle left icon"></i>
        </button>
        <h3 className="secondary-header message-header">Messages</h3>
        <div className="ui divider message-divider"></div>
        <div className="ui grid two columns message-container">
          { messages.map(message =>
            message.userId === userId
              ? <div className="row blue-message-right" key={message.messageId}>
                  <div className="ui compact blue message right floated column" >
                    <p>{message.messageContent}</p>
                  </div>
                </div>
              : <div className="row blue-message-left" key={message.messageId}>
                  <div className="ui compact blue message left floated column" >
                    <p>{message.messageContent}</p>
                  </div>
                </div>
          )
          }
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
