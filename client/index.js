console.log('something');
import React from 'react';
import { createRoot } from 'react-dom/client';
import { render } from 'react-dom';

render(<>Hello</>, document.getElementById('app'));

// const container = document.getElementById('app');
// const root = createRoot(container);
// root.render(<>Hello</>);
