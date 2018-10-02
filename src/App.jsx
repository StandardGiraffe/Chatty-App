import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import NavBar from './NavBar.jsx';
import Messages from './Messages.jsx';

// Parent component
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          username: "Bob",
          content: "Has anyone seen my marbles?",
          id: "001"
        },
        {
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good.",
          id: "002"
        }
      ]
    }
  }

  render() {
    return (
      <div>
        <NavBar />
        <Messages messages={this.state.messages}/>
        <ChatBar currentUser={this.state.currentUser.name} />
      </div>
    );
  }
}

// class Messages extends Component {
//   render() {

//     return (
//       <main className="messages">
//         <div className="message">
//           <span className="message-username">Anonymous1</span>
//           <span className="message-content">I won't be impressed with technology until I can download food.</span>
//         </div>
//         <div className="message system">
//           Anonymous1 changed their name to nomnom.
//         </div>
//       </main>
//     );
//   }
// }

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

