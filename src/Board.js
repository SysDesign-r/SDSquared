import React from 'react';
import io from 'socket.io-client';

const Board = () => {
  
  const socket = io();
  
  socket.on('sayHi', (arg) => {
    alert(arg);
  })

  socket.emit("helloFromClient", "helloFromClient");

  return (<div>Hi</div>)
}

export default Board;