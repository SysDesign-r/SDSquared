const express = require('express');
const app = express();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer);
const port = 4040;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

io.on('connection', (socket) => {
  console.log('A client connected');

  socket.on('dragUpdate', (data) => {
    console.log('Received updatePosition event:', data);
    io.emit('dragUpdate', data);
  });

  socket.on('div', (data) => {
    console.log('Received div event:', data);
    io.emit('div', data);
  });

});


httpServer.listen(port, () => console.log('listening on port ' + port));