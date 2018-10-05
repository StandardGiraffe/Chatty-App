import React, {Component} from 'react';


class ChatBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: this.props.currentUser,
      editedUser: this.props.currentUser,
      usernameFieldStyle: {"background-color": "white"}
    }
  }

  // Listens for keypresses in the message field.  In the event of Enter being pressed, calls the message-packaging function passed down from App.jsx, feeding it the contents of the username and message fields.

  keypressHandler = (event) => {
    if (event.key === 'Enter') {
      // send the message to the this.props.messageSubmit function, passed down from App
      switch (event.target.name) {
        case "content":
          const messageReceived = {
            content: event.target.value,
            type: "postMessage" }
          this.props.onMessageSubmit(messageReceived);
          event.target.value = "";
          break;

        case "username":
          if (this.state.currentUser !== this.state.editedUser) {
            const userChangeMessage = `${this.state.currentUser} changed their name to ${this.state.editedUser}.`;
            const messageReceived = {
              content: userChangeMessage,
              newUserName: this.state.editedUser,
              type: "postUserUpdate"
            }
            this.setState({ currentUser: this.state.editedUser}, () => {
              this.setState({usernameFieldStyle: {"background-color": "white"}});
            });
            this.props.onMessageSubmit(messageReceived);
          } else {
            console.log("Ignoring submission: Username hasn't changed.");
          }
          break;
      }

    }
  }

  onNameChange = (event) => {
    const updatedName = event.target.value;
    this.setState({editedUser: updatedName}, () => {
      if (this.state.editedUser !== this.state.currentUser) {
        this.setState({usernameFieldStyle: {"background-color": "cornsilk"}});
      } else {
        this.setState({usernameFieldStyle: {"background-color": "white"}});
      }
    });
  }

  render() {

    return (
      <footer className="chatbar">
        <input
          className="chatbar-username"
          id="chatbar-username"
          name="username"
          placeholder="Your Name (Optional)"
          value={this.state.editedUser}
          onKeyPress={this.keypressHandler}
          onChange={this.onNameChange}
          style={this.state.usernameFieldStyle}
        />
        <input
          className="chatbar-message"
          name="content"
          placeholder="Type a message and hit ENTER"
          onKeyPress={this.keypressHandler}
        />
      </footer>
    );
  }
}

export default ChatBar;