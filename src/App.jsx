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
      type: "message"
    }

    // Publishes messages to the server.  (USE SOON)
    this.socketToMe.send(JSON.stringify(newMessage));

  }

  handleNameChange = (valueChange) => {
    const updatedName = valueChange.target.value;
    this.setState({currentUser: {name: updatedName}});
  }


  componentDidMount() {
    this.socketToMe = new WebSocket("ws://localhost:3001");

    this.socketToMe.onopen = function (event) {
      console.log("Hello!  You done connectified.");
    }

    this.socketToMe.onmessage = (event) => {

      const newMessage = JSON.parse(event.data);
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

