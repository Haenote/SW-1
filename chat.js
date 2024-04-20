const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
  ws.send(JSON.stringify({ message: 'Welcome to the chat server!' }));

  ws.on('message', function incoming(message) {
    console.log('Received message:', message);
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});

console.log('Chat server is running on ws://localhost:8080');
