const express = require("express");
const app = express();
const PORT = 4000;

const http = require("http").Server(app);
const cors = require("cors");

app.use(cors());

const socketIO = require('socket.io')(http, {
  cors: {
      origin: "http://localhost:3000"
  }
});

socketIO.on("connection", (socket) => {
  console.log(`${socket.id} user just connected`);

  socket.on("sendMessage", (message) => {
    socketIO.emit("message", message);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

http.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
