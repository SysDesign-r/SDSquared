import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import DraggableDiv from './DraggableDiv';
import { ReactSketchCanvas } from 'react-sketch-canvas';

const styles = {
  border: '0.0625rem solid black',
  borderRadius: '0.25rem',
};

const socket = io('http://localhost:3030');

export const Canvas = () => {
  const [divs, setDivs] = useState([]);
  const [inputText, setInputText] = useState('');
  const drawingStroke = React.createRef(); // drawing traces

  useEffect(() => {
    console.log('entered');
    socket.on('div', (data) => {
      setDivs((prevDivs) => [
        ...prevDivs,
        <DraggableDiv key={data} tech={data} />,
      ]);
    });
    return () => {
      socket.off('div');
    };
  }, [divs]);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleCreateDiv = () => {
    if (inputText.trim() !== '') {
      socket.emit('div', inputText);
      setInputText('');
    }
  };

  const handleUndoDrawingStroke = (e) => {
    console.log('this is the ref', drawingStroke);
    if (drawingStroke.current) {
      drawingStroke.current.undo();
    }
  };

  return (
    <div>
      <div className='m-10 border-2 rounded-md border-blue-400 h-96'>
        <ReactSketchCanvas
          ref={drawingStroke}
          style={styles}
          strokeWidth={4}
          strokeColor='black'
        />
        {divs}
      </div>
      <div className='m-10 flex flex-row gap-4'>
        <input
          className='border border-gray-600 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          type='text'
          value={inputText}
          onChange={handleInputChange}
          placeholder='Enter Tech'
        />
        <button
          className='p-4 rounded-md w-1/3 text text-lg bg-blue-300 hover:bg-blue-600'
          onClick={handleCreateDiv}
          type='submit'
        >
          Create
        </button>
        <button
          onClick={handleUndoDrawingStroke}
          className='p-4 rounded-md w-1/3 text text-lg bg-blue-300 hover:bg-blue-600'
        >
          undo
        </button>
      </div>
    </div>
  );
};
