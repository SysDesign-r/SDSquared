const express = require('express');
const app = express();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer);
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


io.on('connection', socket => {
  socket.emit('sayHi','Hello');

  socket.on("helloFromClient", (arg) => {
    console.log(arg); // 
  });
})



httpServer.listen(port, () => console.log('listening on port ' + port));