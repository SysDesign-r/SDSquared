
import React from 'react';
import { createRoot } from 'react-dom/client';
import { render } from 'react-dom';
import './style.css';
import Board from './Board.js';

render(
  <Board />, 
document.getElementById('app')
);

// const container = document.getElementById('app');
// const root = createRoot(container);
// root.render(<>Hello</>);
