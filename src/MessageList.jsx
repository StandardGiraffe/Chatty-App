import React, {Component} from 'react';

class MessageList extends Component {


  render() {
    return(
      <div>
        {this.props.messages.map((message) => {

          switch (message.type) {

            // Format for a normal user's message...
            case "postMessage":
              return (
                <div className="message" key={message.id}>
                  <span className="message-username">{message.username}</span>
                  <span className="message-content">{message.content}</span>
                </div>
              );
            break;

            // Format for a system message: User update.  (Probably should make this universal.)
            case "postUserUpdate":
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