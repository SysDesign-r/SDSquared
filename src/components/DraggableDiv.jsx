import React, { useState } from 'react';

const DraggableDiv = () => {

  const [pos1, setPos1] = useState(0);
  const [pos2, setPos2] = useState(0);
  const [pos3, setPos3] = useState(0);
  const [pos4, setPos4] = useState(0);

  const dragMouseDown = (e) => {
    e = e || window.event;
    e.preventDefault();
    console.log("client x: ", e.clientX)
    console.log("client y: ", e.clientY)
    console.log('POS1: ', pos1)
    console.log('POS2: ', pos2)
    console.log('POS3: ', pos3)
    console.log('POS4: ', pos4)
    setPos3(e.clientX);
    setPos4(e.clientY);
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  };
/// DEBUG HERE
  const elementDrag = (e) => {
    
    e.preventDefault();
    setPos1(pos3 + e.clientX);
    setPos2(pos4 + e.clientY);
    setPos3(e.clientX);
    setPos4(e.clientY);
    const elmnt = document.getElementById('mydiv');
    elmnt.style.top = `${elmnt.offsetTop - pos2}px`;
    elmnt.style.left = `${elmnt.offsetLeft - pos1}px`;
    console.log("==========================")
    console.log("client x: ", e.clientX)
    console.log("client y: ", e.clientY)
    console.log('POS1: ', pos1)
    console.log('POS2: ', pos2)
    console.log('POS3: ', pos3)
    console.log('POS4: ', pos4)
  };

  const closeDragElement = (e) => {
    document.onmouseup = null;
    document.onmousemove = null;
    console.log("CLOSES")
    console.log("client x: ", e.clientX)
    console.log("client y: ", e.clientY)
    console.log('POS1: ', pos1)
    console.log('POS2: ', pos2)
    console.log('POS3: ', pos3)
    console.log('POS4: ', pos4)
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
