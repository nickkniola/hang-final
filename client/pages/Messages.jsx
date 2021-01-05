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
        <div className="ui grid celled">
        </div>
      </>
    );
  }
}
