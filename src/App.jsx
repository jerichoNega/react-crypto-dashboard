import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CoinDetails from './pages/CoinDetails';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        {/* THE NAVBAR MUST BE HERE */}
        <Navbar /> 
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/coins/:id" element={<CoinDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;