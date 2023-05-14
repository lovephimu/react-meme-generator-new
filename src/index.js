import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import MemeGenerator from './MemeGenerator';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <MemeGenerator />
  </React.StrictMode>,
);
