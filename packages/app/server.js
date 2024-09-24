import { createServer } from 'node:http';
import express from 'express';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173"
  }
});

const users = {};

io.on('connection', (socket) => {
  socket.on('join', (username) => {
    const existingUser = Object.values(users).find(user => user === username);
    if (!existingUser) {
      users[socket.id] = username;
      io.emit('userJoined', username);
    } else {
      users[socket.id] = username;
    }
  });

  socket.on('sendMessage', (message) => {
    io.emit('receiveMessage', message);
  });

  socket.on('disconnection', () => {
    const username = users[socket.id];
    if (username) {
      io.emit('userLeft', username);
      delete users[socket.id];
    }
  });
});

server.listen(5174);