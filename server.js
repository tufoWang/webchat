var http=require('http');
var express = require('express');
var sio = require('socket.io');

var app = new express();
var server = http.createServer(app);

app.use('dist',express.static('dist')); 
app.use(express.static(__dirname));

app.get('/',function(req,res){
    console.log("GET / from client");
    res.sendfile(__dirname+'/index.html');
});
server.listen(8080);
console.log("server running at http://127.0.0.1:8080/");


var  io = sio.listen(server);
var names = [];

io.sockets.on('connection',function(socket){
    socket.on('add user',function(name){
    		console.log("receive is "+name);
         names.push(name);
        io.sockets.emit('login',name);
        console.log("current names is " + names);
        io.sockets.emit('send clients',names);
    });

    socket.on('chat',function(data){
        socket.broadcast.emit('chat',data);

    });
    socket.on('logout',function(){
        for(var i=0;i<names.length;i++){
            if(names[i]==name){
                names.splice(i,1);
                break;
            }
        }
        socket.broadcast.emit('logout',name);
        socket.broadcast.emit('sendClients',names);
    });
});