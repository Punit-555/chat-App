const express = require("express");
const { chats } = require("./data/data.js");
const dotenv = require("dotenv");
const PORT = process.env.PORT || 5000;
const connectDB = require("./config/db");
const app = express();
const cors = require("cors");
const chatRoutes = require("./Routes/chatRoutes");

const messageRoutes = require("./Routes/messageRoutes.js");

const { errorHandler } = require("./middlewares/errorMiddleware");

const userRoutes = require("./Routes/userRoutes");
const socketIO = require("socket.io");

dotenv.config();
app.use(cors());

connectDB();

app.use(express.json());

app.get("/", (req, res) => {
  // console.log(chats);
  res.send(chats);
});

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

// app.use(notFound);
app.use(errorHandler);

const server = app.listen(
  PORT,
  console.log(`Server running on PORT ${PORT}...`)
);


const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");

// user Data Selected ID
  socket.on('setup',  (userData)=>{
      socket.join(userData._id);
      console.log("User Data ---->", userData._id);
      socket.emit('connected');
  })

  // join chat while selecting the chats
  socket.on('join chat', (room)=>{
      socket.join(room);

      console.log("User Joined Room : "+ room);
  })

  // typing featuere

  socket.on('typing', (room)=>socket.in(room).emit('typing'));
  socket.on('stop typing', (room)=>socket.in(room).emit('stop typing'));
  
  // latest Message
  socket.on('new message', (newMessageRecieved)=>{
      var chat =  newMessageRecieved.chat;

      if(!chat.users) return console.log('chat.users not defined');


   chat.users.forEach(user =>{
    if(user._id == newMessageRecieved.sender._id) return;
 
    socket.in(user._id).emit("message recieved", newMessageRecieved);
     
   })
  })

  // To Clen the sockt after user loguot
  socket.off('setup', ()=>{
    console.log('USER DISCONNECTED');
    socket.leave(userData._id);
  })



});
