// 1. Add CryptoState to your imports
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CryptoState } from '../context/CryptoContext'; 

function Home() {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [showWatchlistOnly, setShowWatchlistOnly] = useState(false);
    
    const [error, setError] = useState(null);
    
    const { currency, symbol, addToWatchlist, removeFromWatchlist, isInWatchlist } = CryptoState(); 

    useEffect(() => {
        const fetchCoins = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(
                    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
                );
                
                if (!response.ok) {
                    if (response.status === 429) {
                        throw new Error("Rate limit exceeded. Please wait a minute and refresh.");
                    }
                    throw new Error(`Failed to fetch market data (${response.status})`);
                }

                const data = await response.json();
                setCoins(data);
            } catch(error) {
                console.error("Error fetching the data:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
        fetchCoins();
    }, [currency]);

    const filteredCoins = coins.filter(coin => 
        (coin.name.toLowerCase().includes(search.toLowerCase()) || 
         coin.symbol.toLowerCase().includes(search.toLowerCase())) &&
        (!showWatchlistOnly || isInWatchlist(coin.id))
    );

    const handleWatchlistToggle = (e, coinId) => {
        e.preventDefault();
        e.stopPropagation();
        if (isInWatchlist(coinId)) {
            removeFromWatchlist(coinId);
        } else {
            addToWatchlist(coinId);
        }
    };

    if(loading) return <div className="loader">🌀 Loading Market Data ({currency.toUpperCase()})...</div>

    if (error) return (
        <div className="home-container" style={{ textAlign: 'center', padding: '4rem' }}>
            <h2 className="red-text">❌ Error</h2>
            <p>{error}</p>
            <button 
                onClick={() => window.location.reload()} 
                className="filter-btn" 
                style={{ marginTop: '1rem' }}
            >
                Retry
            </button>
        </div>
    );

    return (
        <div className="home-container">
            <div className="home-header">
                <h2>📈 Live {currency.toUpperCase()} Market</h2>
                <div className="controls">
                    <input 
                        type="text" 
                        placeholder="Search coins..." 
                        className="search-input"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button 
                        className={`filter-btn ${showWatchlistOnly ? 'active' : ''}`}
                        onClick={() => setShowWatchlistOnly(!showWatchlistOnly)}
                    >
                        {showWatchlistOnly ? "Show All" : "Watchlist Only"}
                    </button>
                </div>
            </div>

            <div className="coin-grid">
                {filteredCoins.map((coin) => (
                    <Link to={`/coins/${coin.id}`} key={coin.id} className="coin-card">
                        <div className="coin-card-header">
                            <img src={coin.image} alt={coin.name} className="coin-logo" />
                            <button 
                                className={`watchlist-btn ${isInWatchlist(coin.id) ? 'active' : 'inactive'}`}
                                onClick={(e) => handleWatchlistToggle(e, coin.id)}
                            >
                                {isInWatchlist(coin.id) ? "★" : "☆"}
                            </button>
                        </div>
                        <div className="coin-info">
                            <h3>{coin.name}</h3>
                            <p className="price">{symbol}{coin.current_price.toLocaleString()}</p>
                            <p className={coin.price_change_percentage_24h > 0 ? "green-text" : "red-text"}>
                                {coin.price_change_percentage_24h?.toFixed(2)}%
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
            {filteredCoins.length === 0 && (
                <div className="no-results">
                    <p>No coins found matching your criteria.</p>
                </div>
            )}
        </div>
    )
}
export default Home;