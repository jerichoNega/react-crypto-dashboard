import { Link, useLocation } from 'react-router-dom';
import { CryptoState } from '../context/CryptoContext';

const Navbar = () => {
  const { currency, setCurrency } = CryptoState();
  const location = useLocation();

  return (
    <nav>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1280px', margin: '0 auto', width: '100%' }}>
        <Link to="/" style={{ color: 'var(--accent)', fontWeight: 'bold', fontSize: '1.5rem' }}>
          CRYPTO TRACKER
        </Link>

        <div className="nav-right">
          <div className="nav-links">
            <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
              Market
            </Link>
            <Link to="/portfolio" className={`nav-link ${location.pathname === '/portfolio' ? 'active' : ''}`}>
              Portfolio
            </Link>
          </div>

          <select 
            className='currency-select'
            value={currency} 
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value={"usd"}>USD</option>
            <option value={"eur"}>EUR</option>
          </select>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;