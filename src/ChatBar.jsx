// ###################
// Import dependencies
// ###################

import React, {Component} from 'react';



// ################
// ################
// Parent Component
// ################
// ################

class ChatBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: this.props.currentUser,
      editedUser: this.props.currentUser,
      usernameFieldStyle: {"backgroundColor": "white"}
    }
  }



  // #############
  // App Functions
  // #############

  // Listens for keypresses in the message field.  In the event of Enter being pressed, calls the message-packaging function passed down from App.jsx, feeding it the contents of the username and message fields.


  // (This should be refactored up to the parent.)  Listens for the ENTER keypress. When received, determines action based on which field was confirmed.
  keypressHandler = (event) => {
    if (event.key === 'Enter') {
      switch (event.target.name) {

        // Message field was confirmed: Packages the contents of the message field, user's colour, and labels as a message, then passes the data up to the message submission apparatus in the parent app.
        case "content":
          const messageReceived = {
            content: event.target.value,
            nameColour: this.props.nameColour,
            type: "postMessage" }
          this.props.onMessageSubmit(messageReceived);
          console.log(messageReceived);
          event.target.value = "";
          break;

        // Username field was confirmed: Checks to see if a change was indeed made to the username.  If so, checks to see if the user was previously anonymous, and presents a different message in that case.  Either way, the notification of a new user name is packaged and sent up to the parent app for submission to the server.
        case "username":
          if (this.state.currentUser !== this.state.editedUser) {
            const userChangeMessage = (this.state.currentUser) && (this.state.editedUser) ? `${this.state.currentUser} would prefer to be called ${this.state.editedUser}.` : (this.state.currentUser) && !(this.state.editedUser) ? `${this.state.currentUser} has returned to anonymity.` : `${this.state.editedUser} has been unmasked!`;
            const messageReceived = {
              content: userChangeMessage,
              newUserName: this.state.editedUser,
              type: "postUserUpdate"
            }
            this.setState({ currentUser: this.state.editedUser}, () => {
              this.setState({usernameFieldStyle: {"backgroundColor": "white"}});
            });
            this.props.onMessageSubmit(messageReceived);
          } else {
            console.log("Ignoring submission: Username hasn't changed.");
          }
          break;
      }

    }
  }


  // (This should be refactored up to the parent.) Controls the content of the username field.  When a discrepancy is noticed between the current username and the contents of the field (indicating an unconfirmed change to the contents), the field is coloured "cornsilk".
  onNameChange = (event) => {
    const updatedName = event.target.value;
    this.setState({editedUser: updatedName}, () => {
      if (this.state.editedUser !== this.state.currentUser) {
        this.setState({usernameFieldStyle: {"backgroundColor": "cornsilk"}});
      } else {
        this.setState({usernameFieldStyle: {"backgroundColor": "white"}});
      }
    });
  }




  // ############################
  // Render ChatBar for the user.
  // ############################

  render() {

    return (
      <footer className="chatbar" style={{backgroundColor: this.props.nameColour}}>
        <input
          className="chatbar-username"
          id="chatbar-username"
          name="username"
          placeholder="Your sobriquet?"
          value={this.state.editedUser}
          onKeyPress={this.keypressHandler}
          onChange={this.onNameChange}
          style={this.state.usernameFieldStyle}
        />
        <input
          className="chatbar-message"
          name="content"
          placeholder="Contribute discourse?  (Kindly press ENTER when ready.)"
          onKeyPress={this.keypressHandler}
        />
      </footer>
    );
  }
}

export default ChatBar;