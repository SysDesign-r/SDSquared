import React, { useState } from 'react';
import { Box } from './Box';
import DraggableDiv from './DraggableDiv';

export const Canvas = () => {
  let [divs, setDivs] = useState([]); // possible redux?
  function createDiv() {
    console.log('hello');
    // divs.push(<Box />);
    setDivs([...divs, <DraggableDiv />]);
    console.log(divs);
  }

  // make elements draggable
  
  return (
    <div>
      <button
        className='text text-lg bg-red-600'
        onClick={(e) => {
          createDiv();
        }}
      >
        Hello
      </button>
        {divs}
    </div>
  );
};
