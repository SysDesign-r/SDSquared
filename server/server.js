const express = require('express')
const app = express();
const http = require('http');
const server = http.createServer(app);
const port =8080;
const socket = require('socket.io');
const io = socket(server);
app.use('/socket.io', express.static(__dirname + '/node_modules/socket.io/client-dist'));

io.on('connection', onConnection);

function onConnection(socket){
  socket.on('drawing', (data) => socket.broadcast.emit('drawing', data));
}

server.listen(port, () => console.log(`server is running on port ${port}`));