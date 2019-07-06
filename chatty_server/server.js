const express = require('express');
const SocketServer = require('ws').Server;
const uuidv1 = require('uuid/v1');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

wss.broadcast = (data) => {
  wss.clients.forEach(function each(client) {
    if (client.readyState === 1) {
      client.send(JSON.stringify(data));
    }
  })
}


// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');

  const entrance = {type:"postEntry", clients: wss.clients.size};

  // Code in here
  wss.broadcast(entrance);

  ws.on('message', (message) => {
    const parsedMessage = JSON.parse(message);
    messageID = uuidv1();
    parsedMessage.id = messageID;

    wss.broadcast(parsedMessage);
  })

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');

    const exit = {type:"postEntry", clients: wss.clients.size};
    wss.broadcast(exit);
  });

});
