// ###################
// Import dependencies
// ###################

const express = require('express');
const WebSocket = require('ws');
const uuidv4 = require('uuid/v4');



// ##################
// Initialize Server:
// ##################

const PORT = 3001;
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new WebSocket.Server({ server });



// ############################
// Message-Processing Functions
// ############################

// Fully processes a message: takes the initial object, applies a unique identifier, validates its type, and sends it out for broadcasts to all connected users, or all users excepting the provided socket (in the argument, othersOnly).
const broadcastMessage = (messageObject, othersOnly = false) => {
  messageObject.id = uuidv4();
  validateMessage(messageObject);

  (othersOnly) ? broadcastOthers(messageObject, othersOnly) : broadcast(messageObject);
}

// Processes incoming messages by type.  If recognized, re-types the message in preparation for broadcast.  (If a message is not re-typed in this way, it will be caught by the client and log an error message.)
const validateMessage = (messageObject) => {
      switch (messageObject.type) {

      case "postUserUpdate":
        messageObject.type = "incomingSystemMessage";
      break;

      case "postMessage":
        messageObject.type = "incomingMessage";
      break;

    }
}

// Delivers the message object to all connected users.
const broadcast = (messageObject) => {
    wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(messageObject));
    }
  });
}

// Delivers the message object to all connected users except the triggering user.
const broadcastOthers = (messageObject, ws) => {
    wss.clients.forEach(function each(client) {
    if (client !== ws && client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(messageObject));
    }
  });
}


// #############################
// System Announcement Functions
// #############################

// Manufactures a population number update.
const populationUpdate = () => {
  const messageObject = {
    type: "incomingPopulationUpdate",
    population: wss.clients.size
  }
  return messageObject;
}

// Manufactures a user arrival/departure system message depending on the argument ("arrival" / "departure") for broadcast.
const connectionEventDescription = (direction) => {
  const messageObject = {
    type: "incomingSystemMessage"
  }

  if (direction === "arrival") {
    const announcement = `Someone has joined us!`;
    messageObject.content = announcement;

  } else if (direction === "departure") {
    const announcement = `Someone has departed, alas.`;
    messageObject.content = announcement;

  } else { return null; }

  return messageObject;

}

// Manufactures a colour assignment package for new users.
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




// ##########################
// ##########################
// Server-Client Interactions
// ##########################
// ##########################


// ######################
// A new client connects:
// ######################

// Set up a callback that will run when a client connects to the server: When a client connects they are assigned a socket, represented by the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('A client has connected!  Current number of connected clients:', wss.clients.size);
  ws.send(JSON.stringify({
    type: "incomingSystemMessage",
    content: "Welcome to the conversation!",
    id: uuidv4()
  }));
  ws.send(JSON.stringify(assignColour()));
  broadcastMessage(populationUpdate());
  broadcastMessage(connectionEventDescription("arrival"), ws);



  // ######################################################
  // A message package is received from a connected client.
  // ######################################################

  ws.on('message', (data) => {
    const dataObject = JSON.parse(data);
    broadcastMessage(dataObject);
  });



  // #####################
  // A client disconnects:
  // #####################

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('A client has departed!  Current number of connected clients:', wss.clients.size);
    broadcastMessage(populationUpdate());
    broadcastMessage(connectionEventDescription("departure"));
  });

});