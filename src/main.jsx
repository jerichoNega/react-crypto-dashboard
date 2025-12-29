import React from "react";
import ReactDOM from 'react-dom/client';
import App from "./App";
import './index.css';
import { BrowserRouter } from "react-router-dom";
import CryptoContext from "./context/CryptoContext";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <CryptoContext>
         <App />
      </CryptoContext>
    </BrowserRouter>
  </React.StrictMode>,
)
