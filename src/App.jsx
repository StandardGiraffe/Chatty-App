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
      messages: [],
      population: 0
    }

  }

  onMessageSubmit = (messagePackage) => {
    // Package the message into an object
    const newMessage = {
      username: this.state.currentUser.name,
      content: messagePackage.content,
      type: messagePackage.type,
      nameColour: this.state.currentUser.nameColour
    }
    console.log(`Packaging message to send to the server: ${JSON.stringify(newMessage)}`)

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

      switch (newMessage.type) {
        case "receivedError":
          console.log("Server sent an unknown message type.  Lah lah lah, I can't hear it.");
          break;

        case "incomingPopulationUpdate":
          console.log(newMessage.content);
          // newMessage.type = "postUserUpdate";
          this.setState({population: newMessage.population});
          break;

        case "incomingColourUpdate":
          this.setState({currentUser: {...this.state.currentUser, nameColour: newMessage.colour}});
          console.log("Your colour is:", this.state.currentUser.nameColour);

        default:
          const updatedMessages = this.state.messages.concat(newMessage);
          this.setState({ messages: updatedMessages }); // Update the message list
          break;
      }

    }

  }


  render() {
    return (
      <div>
        <NavBar population={this.state.population} nameColour={this.state.currentUser.nameColour}/>
        <Messages messages={this.state.messages}/>
        <ChatBar currentUser={this.state.currentUser.name} onMessageSubmit={this.onMessageSubmit} nameColour={this.state.currentUser.nameColour}/>
      </div>
    );
  }
}



export default App;

