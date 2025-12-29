import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCoins = async () => {
            try {
                const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false'
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
    }, [])
    if(loading) return <div className="loader">🌀 Loading Market Data</div>
    return (
        <div className="home-container">
            <h2>📈 Live crypto Market</h2>
            <div className="coin-grid">
                {coins.map((coin) => (
                    <Link to={`/coin/${coin.id}`} key={coin.id} className="coin-card">
                            <img src={coin.image} alt={coin.name} className="coin-logo" />                        <div className="coin-info">
                            <h3>{coin.name}</h3>
                            <p className="price">${coin.current_price.toLocaleString()}</p>
                            <span className={coin.price_change_percentage_24h > 0 ? "green-text" : "red-text"}>
                                {coin.price_change_percentage_24h.toFixed(2)}%  
                            </span>
                        </div>
                    </Link>
                    

                ))
                }
            </div>
        </div>
    )
}
export default Home;
