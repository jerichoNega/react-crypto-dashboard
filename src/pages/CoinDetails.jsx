import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import HistoryChart from '../components/HistoryChart';

function CoinDetails() {
    const { id } = useParams();
    const [coin, setCoin] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCoinData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);

                if (!response.ok) {
                    // CoinGecko often rate-limits (429) or returns 404 for bad ids
                    throw new Error(`Request failed: ${response.status} ${response.statusText}`);
                }

                const data = await response.json();
                setCoin(data);
            } catch (err) {
                console.error(err);
                setCoin(null);
                setError(err?.message || "Failed to load coin data");
            } finally {
                setLoading(false);
            }
        };

        fetchCoinData();
    }, [id]);

    if (loading) return <div className="loader">🌀 Loading {id}...</div>;

    if (error) return <h2>❌ {error}</h2>;

    if (!coin) return <h2>❌ Coin not found</h2>;

    return (
        <div className="coin-details-container">
            <Link to="/" className="back-btn">← Back to Market</Link>

            <div className="details-header">
                <img src={coin.image.large} alt={coin.name} className="large-logo" />
                <h1>{coin.name} ({coin.symbol.toUpperCase()})</h1>
            </div>
            <HistoryChart coinId={id} />

            <div className="stats-grid">
                <div className="stat-card">
                    <h3>Current Price</h3>
                    <p className="highlight">
                        {coin?.market_data?.current_price?.usd != null
                            ? `$${coin.market_data.current_price.usd.toLocaleString()}`
                            : "—"}
                    </p>
                </div>
                <div className="stat-card">
                    <h3>24H high</h3>
                    <p className="green-text">
                        {coin?.market_data?.high_24h?.usd != null
                            ? `$${coin.market_data.high_24h.usd.toLocaleString()}`
                            : "—"}
                    </p>
                </div>
                <div className="stat-card">
                    <h3>24H low</h3>
                    <p className="red-text">
                        {coin?.market_data?.low_24h?.usd != null
                            ? `$${coin.market_data.low_24h.usd.toLocaleString()}`
                            : "—"}
                    </p>
                </div>
                <div className="description-box">
                    <h3>About {coin.name}</h3>
                    <p>
                        {coin?.description?.en
                            ? `${coin.description.en.replace(/<[^>]*>/g, "").split(". ")[0]}.`
                            : "No description available."}
                    </p>
                </div>
            </div>

        </div>
    )

}
export default CoinDetails;