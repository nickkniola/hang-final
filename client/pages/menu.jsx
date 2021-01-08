import React from 'react';
import { NavLink } from 'react-router-dom';

export default class Menu extends React.Component {
  render() {
    return (
      <div className="ui menu">
        <NavLink className="item" to="/main">
          <img src="/images/hang_logo.png"></img>
        </NavLink>
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
