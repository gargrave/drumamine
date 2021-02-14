import React from 'react';
import ReactDOM from 'react-dom';

import App from './app/App';

window.ac = new AudioContext();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
