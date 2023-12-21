import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  // It is expected that Hooks updaters will run twice in 'strict' mode in development. This helps ensure the code doesn't rely on them running a single time (which wouldn't be the case if an async render was aborted and later restarted). If your Hooks updaters are pure functions (as they should be) then this shouldn't affect the logic of your application.

  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
