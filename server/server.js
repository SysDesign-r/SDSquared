const express = require('express');
const path = require('path');
const app = express();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer);
const port = 4040;
const controller = require('./controller');


app.use(express.static(path.join(__dirname, '../src')));

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
// io.on('connection', onConnection);
})

//get random
app.get('/getRandom', controller.getRandom, (req, res) => {
  return res.status(200).json(res.locals.data);
});

//getOne
app.get('/getOne', controller.getOne, (req, res) => {
  return res.status(200).json(res.locals.data);
});

//save
app.post('/save', controller.save, async (req, res) => {
  return res.status(200).json(res.locals.data);
});

//createUser
app.post('/createUser', controller.createUser, async (req, res) => {
  console.log('back in server')
  return res.status(200).json(res.locals.data);
});

//Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' }
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});


httpServer.listen(port, () => console.log('listening on port ' + port));