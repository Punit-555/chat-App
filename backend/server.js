const express  = require('express');
const {chats} = require('./data/data.js');
const dotenv  = require('dotenv');
const PORT = process.env.PORT || 5000;
const connectDB =  require('./config/db')
const app = express();
const cors = require('cors');
const chatRoutes =  require('./Routes/chatRoutes');

const {errorHandler} = require('./middlewares/errorMiddleware'); 

const userRoutes = require('./Routes/userRoutes');

dotenv.config();
app.use(cors());

connectDB();

app.use(express.json());

app.get("/",(req,res)=>{
    // console.log(chats);
    res.send(chats)
});

app.use('/api/user', userRoutes);
app.use("/api/chat", chatRoutes);


// app.use(notFound);
app.use(errorHandler);

app.listen(PORT, ()=>{
    console.log("Server is Listening..");
});