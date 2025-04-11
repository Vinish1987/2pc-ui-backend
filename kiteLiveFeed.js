
require('dotenv').config();
const express = require('express');
const http = require('http');
const { KiteConnect } = require('kiteconnect');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const kc = new KiteConnect({ api_key: process.env.KITE_API_KEY });

io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('disconnect', () => console.log('Client disconnected'));
});

app.get('/', (req, res) => {
  res.send('2PC Kite Backend is running!');
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
