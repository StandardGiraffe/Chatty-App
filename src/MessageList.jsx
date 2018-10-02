import React, {Component} from 'react';

class MessageList extends Component {


  render() {
    return(
      <div>
        {this.props.messages.map((message) => {
          return (
            <div className="message" key={message.id}>
              <span className="message-username">{message.username}</span>
              <span className="message-content">{message.content}</span>
            </div>
          );
      })
    }
    </div>
    );
  }

}



export default MessageList;