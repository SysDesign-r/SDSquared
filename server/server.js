const app = require('express')();
const socket = require('socket.io');
const server = app.listen(port);
const port = 8080;
const io = socket(server);

io.on('connection', onConnection);

function onConnection(socket){
  socket.on('drawing', (data) => socket.broadcast.emit('drawing', data));
}

server.listen(port, () => console.log(`server is running on port ${port}`));