const app = require("express")();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  socket.on("msg", (data) => {
    console.log(data);
    io.emit("receive_msg", data);
  });

  socket.on("vid", (data) => {
    console.log(data);
    io.emit("receive_vid", data);
  });
});

server.listen(3001, () => {
  console.log("Server is on");
});
