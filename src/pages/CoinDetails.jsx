import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import HistoryChart from '../components/HistoryChart';

import { CryptoState } from "../context/CryptoContext";
function CoinDetails() {
    const { id } = useParams();
    const [coin, setCoin] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    const fetchCoinData = async ()=> {
        try {
            const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`
             );
            const data = await response.json();
            setCoin(data);
            setLoading(false)
 
        } catch (error){
            console.error(error);
            setLoading(false);
        }
    }
    fetchCoinData();
    }, [id]);

    const { currency, symbol } = CryptoState();

    if (loading) return <div className="loader">🌀 Loading {id}...</div>

    if (!coin) return <h2>❌ Coin not found</h2>

    return (
        <div className="coin-details-container">
            <Link to="/" className="back-btn">← Back to Market</Link>

            <div className="details-header">
                <img src={coin.image.large} alt={coin.name} className="large-logo" />
                <h1>{coin.name} ({coin.symbol.toUpperCase()})</h1>
            </div>
            <HistoryChart />

            <div className="stats-grid">
                <div className="stat-card">
                    <h3>Current Price ({currency.toUpperCase()})</h3>
                    <p className="highlight">{symbol}{coin.market_data.current_price[currency].toLocaleString()}</p>
                </div>
                <div className="stat-card">
                    <h3>24H high ({currency.toUpperCase()})</h3>
                    <p className="green-text">{symbol}{coin.market_data.high_24h[currency].toLocaleString()}</p>
                </div>
                <div className="stat-card">
                    <h3>24H low ({currency.toUpperCase()})</h3>
                    <p className="red-text">{symbol}{coin.market_data.low_24h[currency].toLocaleString()}</p>
                </div>
                <div className="description-box">
                    <h3>About {coin.name}</h3>
                    <p>{coin.description.en.split('. ')[0]}.</p>
                </div>
            </div>

        </div>
    )

}
export default CoinDetails;