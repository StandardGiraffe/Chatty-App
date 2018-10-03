import React, {Component} from 'react';


class ChatBar extends Component {

  // Listens for keypresses in the message field.  In the event of Enter being pressed, calls the message-packaging function passed down from App.jsx, feeding it the contents of the username and message fields.


  keypressHandler = (event) => {
    if (event.key === 'Enter') {
      // send the message to the this.props.messageSubmit function, passed down from App

      const messageReceived = {
        content: event.target.value
      }
      this.props.onMessageSubmit(messageReceived);

      // then, reset the value in the message field to "".
      event.target.value = "";
    }
  }

  render() {

    return (
      <footer className="chatbar">
        <input
          className="chatbar-username"
          id="chatbar-username"
          name="username"
          placeholder="Your Name (Optional)"
          value={this.props.currentUser}
          onChange={this.props.onNameChange}
        />
        <input
          className="chatbar-message"
          name="content"
          placeholder="Type a message and hit ENTER"
          onKeyPress={this.keypressHandler}
        />
      </footer>
    )
  }
}

export default ChatBar;