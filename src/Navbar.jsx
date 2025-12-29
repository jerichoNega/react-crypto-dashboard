import { Link } from 'react-router-dom';
import { CryptoState } from '../context/CryptoContext';

function Navbar() {
  const { currency, setCurrency } = CryptoState(); 

  return (
    <nav>
      <div className="navbar-content"> 
        <Link to="/" className="brand-logo">
          <span className="logo-emoji">💎</span> CryptoTracker
        </Link>
        
        <div className="nav-links">
         
          <select 
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            style={{
              padding: '8px',
              borderRadius: '8px',
              backgroundColor: '#1f2937',
              color: 'white',
              border: '1px solid #374151',
              marginRight: '15px',
              cursor: 'pointer'
            }}
          >
            <option value="usd">USD</option>
            <option value="eur">EUR</option>
          </select>

          <Link to="/" className="nav-link">Market</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;