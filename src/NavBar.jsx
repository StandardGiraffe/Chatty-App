import React, {Component} from 'react';

class NavBar extends Component {
  render() {

    return (
    <nav className="navbar" style={{backgroundColor: this.props.nameColour}}>
      <a href="/" className="navbar-brand">Chatty</a>
      <p className="navbar-usercount">Current population: {this.props.population}</p>
    </nav>
    );
  }
}

export default NavBar;