import React from 'react';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.history.push('/signup');
  }

  render() {
    return (
      <div className="main-container">
        <div className="text-container">
          <h1 className="header-main"><img className="header-logo" src="images/hang_logo.png"></img>Hang</h1>
          <p className="subtitle-main">The only web app which makes plans for you!</p>
        </div>
        <div className="button-container">
          <button className="ui primary button sign-up-button" type="button" onClick={this.handleClick}>Sign Up</button>
        </div>
      </div>
    );
  }
}
