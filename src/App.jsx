// ###################
// Import dependencies
// ###################

import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import NavBar from './NavBar.jsx';
import Messages from './Messages.jsx';




// ################
// ################
// Parent Component
// ################
// ################

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: {name: ""}, // The username is optional.  If currentUser is not defined (default), it means the user is Anonymous.
      messages: [], // Messages are currently caches on the client's system.  The log of messages begins empty.
      population: 0
    }

  }


  // #############
  // App Functions
  // #############

  // Processes outgoing messages and updates from ChatBar.  Applies "Anonymous" username if no username has been set.
  onMessageSubmit = (messagePackage) => {

    // Appends user's colour and username to the message package.
    const newMessage = {
      username: (this.state.currentUser.name) ? (this.state.currentUser.name) : "Anonymous",
      content: messagePackage.content,
      type: messagePackage.type,
      nameColour: this.state.currentUser.nameColour
    }

    // Detects if the message is a username change and updates the app's current username if necessary.
    if (newMessage.type === "postUserUpdate") {
      this.setState({currentUser: {...this.state.currentUser, name: messagePackage.newUserName} });
    }

    // Sends the final message object to the server.
    this.socketToMe.send(JSON.stringify(newMessage));
  }



  // ###########################
  // Message Server Interactions
  // ###########################

  // Upon successful rendering of the user interface, a connection is attempted to the message server.
  componentDidMount() {
    this.socketToMe = new WebSocket("ws://localhost:3001");

    // Success is reported.
    this.socketToMe.onopen = function (event) {
      console.log("The server welcomes you.");
    }

    // On receipt of messages from the server...
    this.socketToMe.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);

      // ... detect the message-type and process appropriately:
      switch (newMessage.type) {
        case "receivedError":
          console.log("Server sent an unknown message type.  Lah lah lah, I can't hear it.");
          break;

        // Update the interface to display the new global population.
        case "incomingPopulationUpdate":
          console.log(newMessage.content);
          this.setState({population: newMessage.population});
          break;

        // Record user-colour assignment.
        case "incomingColourUpdate":
          this.setState({currentUser: {...this.state.currentUser, nameColour: newMessage.colour}});

        // Default case assumes a message with printable content, and is added to the messages in cache.
        default:
          const updatedMessages = this.state.messages.concat(newMessage);
          this.setState({ messages: updatedMessages }); // Update the message list
          break;
      }

    }

  }



  // ##########################################################
  // Send props down to subordinate components and render them.
  // ##########################################################

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

