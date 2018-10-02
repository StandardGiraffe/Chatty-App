import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import NavBar from './NavBar.jsx';

// Parent component
class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Messages />
        <ChatBar />
      </div>
    );
  }
}

class Messages extends Component {
  render() {

    return (
      <main className="messages">
        <div className="message">
          <span className="message-username">Anonymous1</span>
          <span className="message-content">I won't be impressed with technology until I can download food.</span>
        </div>
        <div className="message system">
          Anonymous1 changed their name to nomnom.
        </div>
      </main>
    );
  }
}

// class ChatBar extends Component {
//   render() {

//     return (
//       <footer className="chatbar">
//         <input className="chatbar-username" placeholder="Your Name (Optional)" />
//         <input className="chatbar-message" placeholder="Type a message and hit ENTER" />
//       </footer>
//     )
//   }
// }

export default App;

