import React, { useState } from 'react';
import { Box } from './Box';

export const Canvas = () => {
  let [divs, setDivs] = useState([]);
  function createDiv() {
    console.log('hello');
    // divs.push(<Box />);
    setDivs([...divs, <Box />]);
    console.log(divs);
  }
  return (
    <div
      className='text text-lg bg-red-600'
      onClick={(e) => {
        createDiv();
      }}
    >
      Hello
      {divs}
    </div>
  );
};
