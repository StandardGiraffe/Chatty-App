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
      messages: []
    }

  }

  onMessageSubmit = (messagePackage) => {
    // Package the message into an object
    const newMessage = {
      username: this.state.currentUser.name,
      content: messagePackage.content,
      type: messagePackage.type
    }

    if (newMessage.type === "postUserUpdate") {
      this.setState({currentUser: {name: messagePackage.newUserName} });
    }

    // Publishes messages to the server.  (USE SOON)
    this.socketToMe.send(JSON.stringify(newMessage));

  }

  buildSystemNotification = (messagePackage) => {

  }

  componentDidMount() {
    this.socketToMe = new WebSocket("ws://localhost:3001");

    this.socketToMe.onopen = function (event) {
      console.log("Hello!  You done connectified.");
    }

    this.socketToMe.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);

      // switch (newMessage.type) {
      //   case "postUserUpdate":
      //   console.log("I got a user change!");

      //   break;

      //   case "postMessage":
          const updatedMessages = this.state.messages.concat(newMessage);
          this.setState({ messages: updatedMessages }); // Update the message list
      //     break;

      //   default:
      //     console.log(newMessage.type + "?!  What kind of message is that?!");
      // }

      // console.log(event.data);
    }

  }


  render() {
    return (
      <div>
        <NavBar />
        <Messages messages={this.state.messages}/>
        <ChatBar currentUser={this.state.currentUser.name} onMessageSubmit={this.onMessageSubmit} />
      </div>
    );
  }
}



export default App;

