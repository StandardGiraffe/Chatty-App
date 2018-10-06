import React, {Component} from 'react';

class MessageList extends Component {


  // The message list component renders messages in different formats depending on their type properties.
  render() {
    return(
      <div>
        {this.props.messages.map((message) => {

          switch (message.type) {

            // Normal user messages are rendered with coloured usernames and text.
            case "incomingMessage":

              return (
                <div className="message" key={message.id}>
                  <span className="message-username" style={{color: message.nameColour}}>{message.username}</span>
                  <span className="message-content">{message.content}</span>
                </div>
              );
            break;

            // System messages are formatted in italics without a username in order to set them apart.
            case "incomingSystemMessage":
              return (
                <div className="message system" key={message.id}>
                  {message.content}
                </div>
              );
            break;
          }

      })
    }
    </div>
    );
  }

}



export default MessageList;