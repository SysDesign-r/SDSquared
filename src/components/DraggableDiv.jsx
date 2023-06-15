import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3030');

const DraggableDiv = (props) => {
  const [pos1, setPos1] = useState(50);
  const [pos2, setPos2] = useState(50);
  const draggableID = String(Date.now());
  const name = props.tech;

  useEffect(() => {
    const handleDragUpdate = (data) => {
      const { draggableID: updatedID, pos1: updatedPos1, pos2: updatedPos2 } = data;

      if (updatedID === draggableID) {
        setPos1(updatedPos1);
        setPos2(updatedPos2);
      }
    };

    socket.on('dragUpdate', handleDragUpdate);

    return () => {
      socket.off('dragUpdate', handleDragUpdate);
    };
  }, []);

  const dragMouseDown = (e) => {
    e.preventDefault();
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  };

  const elementDrag = (e) => {
    e.preventDefault();
    const newPos1 = e.clientX;
    const newPos2 = e.clientY;

    setPos1(newPos1);
    setPos2(newPos2);

    socket.emit('dragUpdate', {
      draggableID,
      pos1: newPos1,
      pos2: newPos2,
    });
  };

  const closeDragElement = () => {
    document.onmouseup = null;
    document.onmousemove = null;
  };

  return (
    <div
      id={draggableID}
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
        <p>{name}</p>
      </div>
    </div>
  );
};

export default DraggableDiv;
