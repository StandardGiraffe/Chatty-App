import React, {Component} from 'react';

class NavBar extends Component {
  render() {

    return (
    <nav className="navbar">
      <a href="/" className="navbar-brand">Chatty</a>
      <p>Current population: {this.props.population}.</p>
    </nav>
    );
  }
}

export default NavBar;