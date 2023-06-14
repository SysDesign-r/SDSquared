import React, { useState, useRef } from 'react';
import { Box } from './Box';
import DraggableDiv from './DraggableDiv';

export const Canvas = () => {



  let [divs, setDivs] = useState([]); // possible redux?
  const [inputText, setInputText] = useState("");

  const handleChange = (e) => {
    // =tore the input value to local state
    setInputText(e.target.value);
    console.log("this is inputText ::", inputText)
  };
  function createDiv() {
    // divs.push(<Box />);
    console.log("Final state: ", inputText)
    setDivs([...divs, <DraggableDiv tech={inputText}/>]);
    console.log(divs);
  }

  
  return (
    <div>
      <div className='border-2 border-black h-96'>
          {divs}
      </div>
      <div>
        <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' type="text" onChange={handleChange} value={inputText} placeholder='Enter Tech' />
        <button
          className='text text-lg bg-red-600'
          onClick={(e) => {
            createDiv();
          }}
          type='submit'
        >
          GET
        </button>
      </div>
    </div>
  );
};
