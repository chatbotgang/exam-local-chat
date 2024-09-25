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

io.on("connection", (socket) => {
  socket.on("join", (username) => {
    const existingUser = users.find((user) => user.username === username);
    users.push({ id: socket.id, username });
    if (!existingUser) {
      io.emit("userJoined", username);
    }
  });

  socket.on("sendMessage", (message) => {
    io.emit("receiveMessage", message);
  });

  socket.on("disconnection", () => {
    const user = users.filter((u) => u.id === socket.id);
    users = users.filter((u) => u.id !== socket.id);
    const existingUser = users.find((u) => u.username === user[0]?.username);
    if (!existingUser) {
      io.emit("userLeft", user[0]?.username);
    }
  });
});

server.listen(5174);
