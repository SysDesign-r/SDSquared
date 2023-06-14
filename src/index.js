
import React from 'react';
import { createRoot } from 'react-dom/client';
import { render } from 'react-dom';
import './style.css';
import Board from './Board.js';

const rootElement = document.getElementById('app');

const root = createRoot(rootElement);
root.render(<Board />);

// const container = document.getElementById('app');
// const root = createRoot(container);
// root.render(<>Hello</>);
