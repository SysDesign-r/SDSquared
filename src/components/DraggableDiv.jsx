import React, { useState } from 'react';

const DraggableDiv = (props) => {
  console.log("this is from drag div:", props.tech)
  let name = props.tech
  const [pos1, setPos1] = useState(50);
  const [pos2, setPos2] = useState(50);
  // const [pos3, setPos3] = useState(0);
  // const [pos4, setPos4] = useState(0);
  const draggableID = String(Date.now())
  console.log(draggableID)

  const dragMouseDown = (e) => {
    e = e || window.event;
    e.preventDefault();
    // console.log("client x: ", e.clientX)
    // console.log("client y: ", e.clientY)
    // console.log('POS1: ', pos1)
    // console.log('POS2: ', pos2)

    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  };
/// DEBUG HERE
  const elementDrag = (e) => {
    
    e.preventDefault();
    setPos1(e.clientX); // could add offsets to keep the element under the mouse click
    setPos2(e.clientY);
    // setPos1(pos3 + e.clientX);
    // setPos2(pos4 + e.clientY);
    // setPos3(e.clientX);
    // setPos4(e.clientY);
    const elmnt = document.getElementById(draggableID);

  
    // console.log("==========================")
    // console.log("client x: ", e.clientX)
    // console.log("client y: ", e.clientY)
    // console.log('POS1: ', pos1)
    // console.log('POS2: ', pos2)

  };

  const closeDragElement = (e) => {
    document.onmouseup = null;
    document.onmousemove = null;
    // console.log("CLOSES")
    // console.log("client x: ", e.clientX)
    // console.log("client y: ", e.clientY)
    // console.log('POS1: ', pos1)
    // console.log('POS2: ', pos2)
  };

  return (
    <>
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
    </>
  );
};

export default DraggableDiv;
