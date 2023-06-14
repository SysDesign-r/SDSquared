const express = require('express');
const app = express();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer);
const port = 4040;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

io.on('connection', (socket) => {
  console.log('A client connected');

  socket.on('test', (data) => {
    console.log('Received test event:', data);
    io.emit('test', 'Server says: Test event received');
  });

  socket.on('dragUpdate', (data) => {
    console.log('Received dragUpdate event:', data);
    io.emit('dragUpdate', data);
  });

  socket.on('disconnect', () => {
    console.log('A client disconnected');
  });
});


httpServer.listen(port, () => console.log('listening on port ' + port));