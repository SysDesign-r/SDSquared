import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
const socket = io();

const DraggableDiv = () => {
  const [pos1, setPos1] = useState(0);
  const [pos2, setPos2] = useState(0);
  const [pos3, setPos3] = useState(0);
  const [pos4, setPos4] = useState(0);

  useEffect(() => {
    
    socket.on('dragUpdate', (data) => {
      console.log('Received dragUpdate event:', data);
      updatePosition(data);
    });

  }, []);

  const emitDragUpdate = () => {
    const data = {
      pos1,
      pos2,
      pos3,
      pos4,
    };
    // const socket = io();
    socket.emit('dragUpdate', data);
  };

  const dragMouseDown = (e) => {
    e = e || window.event;
    e.preventDefault();
    setPos3(e.clientX);
    setPos4(e.clientY);
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  };

  const elementDrag = (e) => {
    e.preventDefault();
    setPos1(pos3 + e.clientX);
    setPos2(pos4 + e.clientY);
    const elmnt = document.getElementById('mydiv');
    elmnt.style.top = `${elmnt.offsetTop - pos2}px`;
    elmnt.style.left = `${elmnt.offsetLeft - pos1}px`;
    emitDragUpdate();
  };

  const closeDragElement = () => {
    document.onmouseup = null;
    document.onmousemove = null;
  };

  const updatePosition = (data) => {
    setPos1(data.pos1);
    setPos2(data.pos2);
    setPos3(data.pos3);
    setPos4(data.pos4);
    const elmnt = document.getElementById('mydiv');
    elmnt.style.top = `${elmnt.offsetTop - data.pos2}px`;
    elmnt.style.left = `${elmnt.offsetLeft - data.pos1}px`;
  };

  return (
    <>
      <div
        id="mydiv"
        style={{
          position: 'absolute',
          zIndex: 9,
          backgroundColor: '#f1f1f1',
          textAlign: 'center',
          border: '1px solid #d3d3d3',
          top: '0',
          left: '0',
          transform: `translate(${pos1}px, ${pos2}px)`,
        }}
      >
        <div
          id="mydivheader"
          style={{
            padding: '10px',
            cursor: 'move',
            zIndex: 10,
            backgroundColor: '#2196F3',
            color: '#fff',
          }}
          onMouseDown={dragMouseDown}
        >
          <p>Database</p>
        </div>
      </div>
      
    </>
  );
};

export default DraggableDiv;
