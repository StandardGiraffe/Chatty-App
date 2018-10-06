import React, {Component} from 'react';

class NavBar extends Component {
  render() {

    return (
    <nav className="navbar" style={{backgroundColor: this.props.nameColour}}>
      <a href="/" className="navbar-brand"><img src="./build/assets/logo.png" className="navbar-logo"/>Seemly Colloquy</a>
      <p className="navbar-usercount">Diologists present: {this.props.population}</p>
    </nav>
    );
  }
}

export default NavBar;