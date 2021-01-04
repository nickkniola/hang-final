import React from 'react';
import { NavLink } from 'react-router-dom';

export default class Menu extends React.Component {
  render() {
    return (
      <div className="ui menu">
        <a className="item">
          <img src="/images/hang_logo.png"></img>
        </a>
        <NavLink className="item" to="/pairing/select" >
          Pairing
        </NavLink>
        <NavLink className="item" to="/random/select" >
          Random
        </NavLink>
        <NavLink className="item" to="/matches">
          Matches
        </NavLink>
      </div>
    );
  }
}
