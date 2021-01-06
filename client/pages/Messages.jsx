import React from 'react';

export default class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.history.push('/matches');
  }

  render() {
    return (
      <>
        <button onClick={this.handleClick} className="ui icon button basic message-button">
          <i className="angle left icon"></i>
        </button>
        <h3 className="secondary-header message-header">Messages</h3>
        <div className="ui divider message-divider"></div>
        <div className="ui grid two columns">
          <div className="row blue-message-left">
            <div className="ui compact blue message left floated column" >
              <p>Get all the best inventions in your e-mail every day. Sign up now!</p>
            </div>
          </div>
          <div className="row blue-message-right">
            <div className="ui compact blue message right floated column" >
              <p>Get all the best inventions in your e-mail every day. Sign up now!</p>
            </div>
          </div>
          <div className="row blue-message-left">
            <div className="ui compact blue message left floated column" >
              <p>Get all the best inventions in your e-mail every day. Sign up now!</p>
            </div>
          </div>
        </div>
        <div className="ui fluid action input send-message">
          <input type="text" placeholder=""/>
          <button className="ui icon button blue">
            <i className="send icon "></i>
          </button>
        </div>
      </>
    );
  }
}
