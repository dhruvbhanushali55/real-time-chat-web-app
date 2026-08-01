const express = require("express");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");
const connectDB = require("./database/db");
const Message = require("./models/Message");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let users = [];

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

io.on("connection", async (socket) => {
  const previousMessages = await Message.find();

  socket.emit("previous-messages", previousMessages);


  console.log("A user connected!");

  socket.emit("welcome", "Welcome to the chat app!");

  socket.on("typing", (username) => {
    socket.broadcast.emit("typing", username);
  });

  socket.on("stop-typing", () => {
    socket.broadcast.emit("stop-typing");
  });

  socket.on("chat-message", async (message) => {

    message.time = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });

    try {

        const newMessage = new Message(message);

        await newMessage.save();

        io.emit("chat-message", message);

    } catch (error) {

        console.log(error);

    }

});

  socket.on("new-user", (username) => {
    socket.username = username;
    users.push(username)
    io.emit("online-users", users);
    console.log(users)

     io.emit("user-joined", `${username} joined the chat`);
  });

  socket.on("disconnect", () => {
    console.log(`${socket.username} disconnected`);

     users = users.filter(user => user !== socket.username);
     io.emit("online-users", users);


    io.emit("user-left", `${socket.username} left the chat`);
});
});

const PORT = 3000;

connectDB();

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
