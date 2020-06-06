const express = require('express');
const cors = require('cors')
const http = require('http');
const app = express();

const socketio=require('socket.io');
const server=http.createServer(app);
const io=socketio(server);
let users=[];
io.set('origins','*:*')
app.use(cors());
const config = require('config'); //config is a module to read the the config folder's json file passed in NODE_ENV
io.on('connection',(socket)=>{
    console.log("New connection!!");
    socket.on('join',(obj)=>{

        console.log("===>>>",obj);
        users.push({
            user:obj.user,
            room:obj.room,
            id:socket.id
        })
        socket.join(obj.room)

        socket.emit("message",{
            user:'admin',
            text:`${obj.user}, Welcome to the room ${obj.room}`
        });
        socket.broadcast.to(obj.room).emit("message",{
            user:'admin',
            text:`${obj.user}, has joined the room`
        })
    })
    socket.on('sendMessage',(message)=>{
        for(let i=0;i<users.length;i++)
        {
            if(users[i].id==socket.id)
            {
                io.to(users[i].room).emit('message',{
                    user:users[i].user,
                    text:message
                })
            }
        }
    })
    socket.on('disconnect',()=>{

        console.log("Disconnected");
        
    })
    
})
require('./server/routes')(app);
server.listen(3000,()=>{
    console.log("--->>>Server is listening on 3000");
    
})
