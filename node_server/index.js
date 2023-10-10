const express = require("express");
const http = require("http");
const path = require("path");
const socketio = require("socket.io"); 

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const PORT = 4000;
const users={};
io.on("connection",socket =>{
    socket.on("new-user-joined",name=>{
        console.log("New user",name);
        users[socket.id]=name;
        socket.broadcast.emit("user-joined",name);
    });
    socket.on("send",message=>{
        socket.broadcast.emit("receive",{message:message,name:users[socket.id]});
    });
    socket.on("disconnect",message=>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    });
   
});
app.use(express.static(path.join(__dirname, "public")));
console.log(path.join(__dirname, "public"));
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
app.get('/', function (req, res) {
    res.sendFile(__dirname + 'public/index.html');
});
