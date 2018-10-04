// server.js

const express = require('express');
const WebSocket = require('ws');
const uuidv4 = require('uuid/v4');


// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new WebSocket.Server({ server });

// ####################
// Functions
// ####################

const validateMessages = (messageObject) => {
      switch (messageObject.type) {

      case "postUserUpdate":
        messageObject.type = "receivedUserUpdate";
      break;

      case "postMessage":
        messageObject.type = "receivedMessage";
      break;

      // default:
      //   messageObject.type = "receivedError";
      // break;
    }
}

const broadcast = (messageObject) => {
    wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(messageObject));
    }
  });
}

const broadcastMessage = (messageObject) => {
  messageObject.id = uuidv4();  // Give the message a unique ID
  validateMessages(messageObject);  // Detect message type and update for rendering within the app.
  broadcast(messageObject);
}

// Builds a message containing connection event type and current number of connected clients.
const connectionEventNotification = (direction) => {
  const messageObject = {
    type: "incomingConnectionEvent",
    population: wss.clients.size
  }
  if (direction === "arrival") {
    const announcement = `A new user has connected.  There is/are now ${wss.clients.size} of us!`;
    messageObject.content = announcement;
  } else if (direction === "departure") {
    const announcement = `A user has departed.  And then there was/were ${wss.clients.size}.`;
    messageObject.direction = announcement;
  } else { return null; }

  return messageObject;
}

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('A client has connected!  Current number of connected clients:', wss.clients.size);
  broadcastMessage(connectionEventNotification("arrival"));

  ws.on('message', (data) => {

    const dataObject = JSON.parse(data);
    broadcastMessage(dataObject);

  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('A client has connected!  Current number of connected clients:', wss.clients.size);
    broadcastMessage(connectionEventNotification("departure"));
  });
});