import { createServer } from "http";
import { Server } from "socket.io";

const server = createServer();
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

/**
 * @type {{name: string, type: string, message: string, timestamp: number}[]}
 */
const messageData = [];

io.on("connection", (ws) => {
  // 當收到client消息時
  ws.on("message", (data) => {
    messageData.push({ ...data, timestamp: Date.now() });
    /// 發送消息給client
    io.emit("message", {
      code: 20000,
      data: messageData,
    });
  });

  ws.on("refresh", () => {
    io.emit("message", {
      code: 20000,
      data: messageData,
    });
  });

  ws.on("disconnect", () => {
    console.log("Close connected");
  });
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
