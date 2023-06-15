const express = require ('express')
const app = express();
const socket = require('socket.io');
const path = require('path');

const port = 3000;
const controller = require('./controller');
app.use(express.static(path.join(__dirname, '../src')));
app.use(express.json());
// const server = app.listen(port);

// const io = socket(server);

// io.on('connection', onConnection);

// function onConnection(socket){
//   socket.on('drawing', (data) => socket.broadcast.emit('drawing', data));
// }

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


app.listen(port, () => console.log(`server is running on port ${port}`));