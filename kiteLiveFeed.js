// kiteLiveFeed.js
const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const PORT = process.env.PORT || 10000;
const app = express();

// Test route
app.get('/', (req, res) => {
  res.send('2PC Kite Backend is running!');
});

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws) {
  console.log('✅ WebSocket client connected');

  const interval = setInterval(() => {
    const fakePrice = (Math.random() * 100 + 100).toFixed(2);
    ws.send(JSON.stringify({
      price: fakePrice,
      time: new Date().toLocaleTimeString(),
    }));
  }, 3000);

  ws.on('close', () => {
    clearInterval(interval);
    console.log('❌ Client disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`🟢 Backend listening on port ${PORT}`);
});
