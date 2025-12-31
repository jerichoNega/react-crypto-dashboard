import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CryptoState } from "../context/CryptoContext";
import {
    LineChart,
    Line,
    YAxis,
    XAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid
} from 'recharts';

function HistoryChart() {
    const { id } = useParams();
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { currency, symbol } = CryptoState();

    useEffect(() => {
        const fetchChartData = async () => {
            try {
                const response = await fetch(
                    `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=7`
                );
                const data = await response.json();

                const formattedData = data.prices.map((item) => ({
                    date: new Date(item[0]).toLocaleDateString(undefined, { weekday: 'short'}),
                    price: item[1]
                }));
                setChartData(formattedData);
                setLoading(false);
            }catch (error) {
                console.error('Chart Error:', error);
                setLoading(false);
            }
        };
        fetchChartData();
    }, [id, currency]);

    if(loading) return <div>⏳ Loading Chart... </div>

    return (
        <div className="chart-container">
            <h3>7-Day price History</h3>
            <div style={{ width: '100%', height: 300}}>
                <ResponsiveContainer>
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                        <XAxis dataKey="date" stroke="#ccc" />
                        <YAxis 
                            domain={['auto', 'auto']}
                            stroke="#ccc"
                            tickFormatter={(val) => `${symbol}${val.toLocaleString()}`}
                            width={80}
                        />
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#1e1e1e', border: 'none' }}
                            formatter={(value) => [`${symbol}${value.toFixed(2)}`, 'Price']}
                        />
                        <Line 
                            type="monotone"
                            dataKey="price"
                            stroke="#646cff"
                            strokeWidth={3}
                            dot={false}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default HistoryChart;