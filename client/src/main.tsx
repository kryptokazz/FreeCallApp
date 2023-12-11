// main.tsx
import React from 'react';
import { createRoot } from 'react-dom/client'; // Updated import
import App from './App';

const container = document.getElementById('root'); // Corrected function name
const root = createRoot(container); // Create a root.

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

