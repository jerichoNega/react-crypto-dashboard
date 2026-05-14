import { useEffect, useState } from "react";
import { CryptoState } from "../context/CryptoContext";
import { Link } from "react-router-dom";

function Portfolio() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currency, symbol, watchlist, portfolioHoldings, updateHolding, removeFromWatchlist } = CryptoState();

  useEffect(() => {
    const fetchWatchlistCoins = async () => {
      if (watchlist.length === 0) {
        setCoins([]);
        setLoading(false);
        setError(null);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const ids = watchlist.join(",");
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${ids}&order=market_cap_desc&sparkline=false`
        );
        
        if (!response.ok) {
          if (response.status === 429) {
            throw new Error("Rate limit exceeded. Please wait a minute.");
          }
          throw new Error("Failed to fetch portfolio prices.");
        }

        const data = await response.json();
        if (Array.isArray(data)) {
            setCoins(data);
        } else {
            throw new Error("Invalid response from API.");
        }
      } catch (error) {
        console.error("Error fetching portfolio data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchWatchlistCoins();
  }, [currency, watchlist]);

  const safeCoins = Array.isArray(coins) ? coins : [];

  const totalValue = safeCoins.reduce((acc, coin) => {
    const holding = portfolioHoldings[coin.id] || 0;
    return acc + (holding * (coin?.current_price || 0));
  }, 0);

  if (loading) return <div className="loader">🌀 Calculating Portfolio...</div>;

  if (error) return (
    <div className="portfolio-container" style={{ textAlign: 'center', padding: '4rem' }}>
      <h2 className="red-text">❌ Error</h2>
      <p>{error}</p>
      <button onClick={() => window.location.reload()} className="filter-btn" style={{ marginTop: '1rem' }}>Retry</button>
    </div>
  );

  return (
    <div className="portfolio-container">
      <div className="portfolio-summary">
        <h3>Total Portfolio Value</h3>
        <h2>{symbol}{totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2>
      </div>

      <h2>💼 Your Holdings</h2>
      {watchlist.length === 0 ? (
        <div className="no-results">
          <p>Your watchlist is empty. Add coins from the market to start tracking your portfolio.</p>
          <Link to="/" className="back-btn" style={{ marginTop: '1rem' }}>Go to Market</Link>
        </div>
      ) : (
        <div className="coin-grid">
          {safeCoins.map((coin) => {
            const holding = portfolioHoldings[coin.id] || 0;
            const value = holding * (coin?.current_price || 0);

            return (
              <div key={coin.id} className="coin-card">
                <div className="coin-card-header">
                  <img src={coin?.image} alt={coin?.name} className="coin-logo" />
                  <button 
                    className="watchlist-btn active"
                    onClick={() => removeFromWatchlist(coin.id)}
                    title="Remove from Watchlist"
                  >
                    ★
                  </button>
                </div>
                <div className="coin-info">
                  <h3>{coin?.name}</h3>
                  <p className="price">Price: {symbol}{(coin?.current_price || 0).toLocaleString()}</p>
                  
                  <div style={{ marginTop: '1rem', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Your Holdings:</p>
                    <input 
                      type="number" 
                      className="holding-input"
                      value={holding}
                      onChange={(e) => updateHolding(coin.id, e.target.value)}
                      placeholder="Amount"
                    />
                    <p className="green-text" style={{ marginTop: '0.5rem' }}>
                      Value: {symbol}{value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Portfolio;