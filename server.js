import { createServer } from "node:http";
import express from "express";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

let users = [];
const messages = [];

io.on("connection", (socket) => {
  socket.on("join", (username) => {
    const existingUser = users.find((user) => user.username === username);
    users.push({ id: socket.id, username });
    if (!existingUser) {
      const userJoinedMessage = {
        timestamp: Date.now(),
        message: `${username} has joined the chat`,
        system: true,
      };
      io.emit("userJoined", userJoinedMessage);
      messages.push(userJoinedMessage);
    }
    socket.emit("syncMessages", messages);
  });

  socket.on("sendMessage", (message) => {
    io.emit("receiveMessage", message);
    messages.push(message);
  });

  socket.on("disconnection", () => {
    const user = users.find((u) => u.id === socket.id);
    users = users.filter((u) => u.id !== socket.id);
    const existingUser = users.find((u) => u.username === user?.username);
    if (user && !existingUser) {
      const userLeftMessage = {
        timestamp: Date.now(),
        message: `${user?.username} has left the chat`,
        system: true,
      };
      io.emit("userLeft", userLeftMessage);
      messages.push(userLeftMessage);
    }
  });
});

server.listen(5174);
