const express = require("express")
const app = express();
const cors = require("cors")
const mongoConnect = require("./db");
const path = require("path");
require("dotenv").config();

const port = process.env.PORT || 8000
mongoConnect();
app.use(express.json())
app.use(cors());

app.use('/LetsChatApi/messages', require('./routes/messages'))
app.use('/LetsChatApi/auth', require('./routes/auth'))
app.use('/LetsChatApi/allusers', require('./routes/allusers'))
app.use('/LetsChatApi/chat', require('./routes/chat'))

const server = app.listen(port, () => {
    console.log(`Backend is listening at http://localhost:${port}`)
})
if(process.env.NODE_ENV==="production"){
    app.use(express.static("./frontend/build"));
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(_dirname,"frontend","build","index.html"));
    })
}
const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
        origin: "https://letschat-with-friends.herokuapp.com",
    },
});

io.on("connection", (socket) => {
    console.log("connected to socket.io");
    socket.on("setup", (userdata) => {
        socket.join(userdata._id);
        socket.emit("connected")
    })
    socket.on('join chat', (room) => {
        socket.join(room);
        console.log("User joined ", room);
    })

    socket.on("typing", (room) => socket.to(room._id).emit("typing",room));
    socket.on("stop typing", (room) => socket.to(room._id).emit("stop typing",room));

    socket.on("new message", (newMessageRecieved) => {
        var chat = newMessageRecieved.chat

        if (!chat.users) return console.log("Users not defined");

        chat.users.forEach((user) => {
            if (user._id === newMessageRecieved.sender._id) return;
            
            socket.in(user._id).emit("message recieved", newMessageRecieved);
        });
    })
    socket.off("setup", () => {
        socket.leave(userdata._id)
    })
})