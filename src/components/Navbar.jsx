import { Link } from 'react-router-dom';
import { CryptoState } from '../context/CryptoContext';

const Navbar = () => {
  const { currency, setCurrency } = CryptoState();

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: '#14161a' }}>
      <Link to="/" style={{ color: '#eebc1d', fontWeight: 'bold', textDecoration: 'none' }}>
        CRYPTO TRACKER
      </Link>

      <select 
        value={currency} 
        onChange={(e) => setCurrency(e.target.value)}
        style={{ marginLeft: '15px' }}
      >
        <option value={"USD"}>USD</option>
        <option value={"EUR"}>EUR</option>
      </select>
    </nav>
  );
};

export default Navbar;