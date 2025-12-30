// 1. Add CryptoState to your imports
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CryptoState } from '../context/CryptoContext'; 

function Home() {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // 2. Grab the global currency and symbol
    const { currency, symbol } = CryptoState(); 

    useEffect(() => {
        const fetchCoins = async () => {
            setLoading(true); // Show loader when currency changes
            try {
                // 3. Update the URL to use the dynamic ${currency}
                const response = await fetch(
                    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=10&page=1&sparkline=false`
                );
                const data = await response.json();
                setCoins(data);
                setLoading(false);
            } catch(error) {
                console.error("Error fetching the data:", error);
                setLoading(false);
            }
        }
        fetchCoins();
    }, [currency]); // 4. IMPORTANT: Add currency to dependency array!

    if(loading) return <h2>🌀 Loading Market Data ({currency.toUpperCase()})...</h2>

    return (
        <div className="home-container">
            <h2>📈 Live {currency.toUpperCase()} Market</h2>
            <div className="coin-grid">
                {coins.map((coin) => (
                    <Link to={`/coins/${coin.id}`} key={coin.id} className="coin-card">
                        <img src={coin.image} alt={coin.name} className="coin-logo" />
                        <div className="coin-info">
                            <h3>{coin.name}</h3>
                            {/* 5. Use the dynamic symbol */}
                            <p className="price">{symbol}{coin.current_price.toLocaleString()}</p>
                            {/* ... rest of code */}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
export default Home;