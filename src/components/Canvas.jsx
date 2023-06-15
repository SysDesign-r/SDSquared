import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import DraggableDiv from './DraggableDiv';

const socket = io('http://localhost:3030');

export const Canvas = () => {
  const [divs, setDivs] = useState([]);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    console.log('entered')
    socket.on('div', (data) => {
      setDivs((prevDivs) => [
        ...prevDivs,
        <DraggableDiv key={data} tech={data} />,
      ]);
    });
    return () => {
      socket.off('div');
    };

    
  }, []);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleCreateDiv = () => {
    if (inputText.trim() !== '') {
      socket.emit('div', inputText);
      setInputText('');
    }
   
  };

  return (
    <div>
      <div className='border-2 border-black h-96'>{divs}</div>
      <div>
        <input
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          type='text'
          value={inputText}
          onChange={handleInputChange}
          placeholder='Enter Tech'
        />
        <button
          className='text text-lg bg-red-600'
          onClick={handleCreateDiv}
          type='submit'
        >
          GET
        </button>
      </div>
    </div>
  );
};
