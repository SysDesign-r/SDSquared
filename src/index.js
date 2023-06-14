import React from 'react';
import { createRoot } from 'react-dom/client';
import { render } from 'react-dom';
import './style.css';
import { App } from './App';

// render(<App />, document.getElementById('app'));

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App />);