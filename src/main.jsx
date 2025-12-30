import React from "react";
import ReactDOM from 'react-dom/client';
import App from "./App";
import './index.css';
import CryptoContext from "./context/CryptoContext"; // Import the Provider

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <CryptoContext> 
       <App />
     </CryptoContext>
  </React.StrictMode>
);