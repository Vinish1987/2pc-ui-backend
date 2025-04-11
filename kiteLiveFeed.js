// server/kiteLiveFeed.js

const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const PORT = process.env.PORT || 10000;
const app = express();

// Simple landing page to confirm server is alive
app.get('/', (req, res) => {
  res.send('2PC Kite Backend is running!');
});

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws) {
  console.log('Client connected to WebSocket');

  // Send dummy price updates every 3 seconds
  const interval = setInterval(() => {
    const price = (Math.random() * 100 + 100).toFixed(2);
    ws.send(JSON.stringify({
      price: price,
      time: new Date().toLocaleTimeString(),
    }));
  }, 3000);

  ws.on('close', () => {
    clearInterval(interval);
    console.log('Client disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`🟢 Server & WebSocket running on port ${PORT}`);
});
