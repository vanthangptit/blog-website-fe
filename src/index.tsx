import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // This React.StrictMode renders the application twice in the development mode to check the side effects and the bad code and practices.
  // If you remove this, your app will be single-rendered.
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
