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
        messageObject.type = "incomingUserUpdate";
      break;

      case "postMessage":
        messageObject.type = "incomingMessage";
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
const populationUpdate = () => {
  const messageObject = {
    type: "incomingPopulationUpdate",
    population: wss.clients.size
  }
  return messageObject;
}

const connectionEventDescription = (direction) => {
  const messageObject = {
    type: "incomingUserUpdate"
  }

  if (direction === "arrival") {
    const announcement = `A new user has connected.`;
    messageObject.content = announcement;

  } else if (direction === "departure") {
    const announcement = `A user has departed.`;
    messageObject.content = announcement;

  } else { return null; }

  return messageObject;

}

const assignColour = () => {

  // Lifted from Stack Overflow: https://stackoverflow.com/questions/1484506/random-color-generator#1484514
  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const messageObject = {
    type: "incomingColourUpdate",
    colour: getRandomColor()
  }

  return messageObject;
}









// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('A client has connected!  Current number of connected clients:', wss.clients.size);
  ws.send(JSON.stringify({
    type: "incomingUserUpdate",
    content: "The server greets you, new user!",
    id: uuidv4()
  }));
  ws.send(JSON.stringify(assignColour()));
  broadcastMessage(populationUpdate());
  broadcastMessage(connectionEventDescription("arrival"));


  ws.on('message', (data) => {

    const dataObject = JSON.parse(data);
    console.log(`Server is broadcasting ${JSON.stringify(dataObject)}`);
    broadcastMessage(dataObject);

  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    // console.log('A client has departed!  Current number of connected clients:', wss.clients.size);
    broadcastMessage(populationUpdate());
    broadcastMessage(connectionEventDescription("departure"));
  });
});