import { createServer } from "http";
import { Server } from "socket.io";

const uuid = () => {
  var d = Date.now();
  if (
    typeof performance !== "undefined" &&
    typeof performance.now === "function"
  ) {
    d += performance.now(); //use high-precision timer if available
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
};

const server = createServer();
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

/**
 * @type {{id: string,name: string, type: string, message: string, timestamp: number}[]}
 */
const messageData = [];

io.on("connection", (ws) => {
  // 當收到client消息時
  ws.on("message", (data) => {
    messageData.push({ ...data, id: uuid, timestamp: Date.now() });
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
