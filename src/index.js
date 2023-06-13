
import React from 'react';
import { createRoot } from 'react-dom/client';
import { render } from 'react-dom';
import './style.css';

render(<><div className='text text-lg bg-red-600'>Hello</div></>, document.getElementById('app'));

// const container = document.getElementById('app');
// const root = createRoot(container);
// root.render(<>Hello</>);
