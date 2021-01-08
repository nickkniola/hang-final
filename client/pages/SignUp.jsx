import React from 'react';

export default class SignUp extends React.Component {
  render() {
    return (
      <div className="sign-up-container">
        <form className="ui form">
          <div className="ui segment sign-up-segment">
            <h2 className="secondary-header">Sign Up</h2>
            <div className="field">
              <label htmlFor="firstName">First Name</label>
              <input type="text" name="firstName" id="firstName" placeholder="First Name" required />
            </div>
            <div className="field">
              <label htmlFor="name">Last Name</label>
              <input type="text" name="lastName" id="lastName" placeholder="Last Name" required />
            </div>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" placeholder="Email" required />
            </div>
            <div className="field">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" id="password" placeholder="Password" autoComplete="on" required />
            </div>
            <div className="button-container sign-up">
              <button className="large ui primary button sign-up-button" type="submit">Create Account</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
