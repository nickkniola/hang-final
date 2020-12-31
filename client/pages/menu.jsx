import React from 'react';
import { NavLink } from 'react-router-dom';

export default class Menu extends React.Component {

  render() {
    return (
      <div className="ui menu">
        <a className="item">
          <img src="/images/hang_logo.png"></img>
        </a>
        <NavLink className="item" to="/pairing" onClick={this.props.handleMenuClick}>
        Pairing
        </NavLink>
        <NavLink className="item" to="/random" onClick={this.props.handleMenuClick}>
        Random
        </NavLink>
      </div>
    );
  }
}
