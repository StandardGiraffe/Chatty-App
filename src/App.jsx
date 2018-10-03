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
      username: messagePackage.username,
      content: messagePackage.content,
      type: "message"
    }
    // concat the message into the existing messages, inside the state

    // Publishes messages to the server.  (USE SOON)
    this.socketToMe.send(JSON.stringify(newMessage));


  }

  handleNameChange = (e) => {
    const updatedName = e.target.value;
    this.setState({currentUser: {name: updatedName}});
  }


  componentDidMount() {
    this.socketToMe = new WebSocket("ws://localhost:3001");

    this.socketToMe.onopen = function (event) {
      console.log("Hello!  You done connectified.");
    }

    this.socketToMe.onmessage = (event) => {

      const newMessage = JSON.parse(event.data);
      // console.log(newMessage);
      const updatedMessages = this.state.messages.concat(newMessage);
      this.setState({ messages: updatedMessages }); // Update the message list
      // console.log(event.data);
    }

  }


  render() {
    return (
      <div>
        <NavBar />
        <Messages messages={this.state.messages}/>
        <ChatBar currentUser={this.state.currentUser.name} onMessageSubmit={this.onMessageSubmit} onNameChange={this.handleNameChange}/>
      </div>
    );
  }
}



export default App;

