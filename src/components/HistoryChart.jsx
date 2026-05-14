import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { CryptoState } from "../context/CryptoContext";
import { createChart, ColorType } from 'lightweight-charts';

function HistoryChart() {
    const { id } = useParams();
    const [days, setDays] = useState(7);
    const [loading, setLoading] = useState(true);
    const { currency } = CryptoState();
    const chartContainerRef = useRef();
    const chartRef = useRef();
    const seriesRef = useRef();

    useEffect(() => {
        const fetchChartData = async () => {
            setLoading(true);
            try {
                // CoinGecko OHLC endpoint
                const response = await fetch(
                    `https://api.coingecko.com/api/v3/coins/${id}/ohlc?vs_currency=${currency}&days=${days}`
                );
                
                if (!response.ok) {
                    if (response.status === 429) {
                        throw new Error("Rate limit exceeded.");
                    }
                    throw new Error("Chart data unavailable.");
                }

                const data = await response.json();
                
                // Format for lightweight-charts: { time: timestamp, open: val, high: val, low: val, close: val }
                const formattedData = data.map((item) => ({
                    time: item[0] / 1000, // seconds
                    open: item[1],
                    high: item[2],
                    low: item[3],
                    close: item[4]
                }));

                if (seriesRef.current) {
                    seriesRef.current.setData(formattedData);
                }
                setLoading(false);
            } catch (error) {
                console.error('Chart Error:', error);
                setLoading(false);
            }
        };
        fetchChartData();
    }, [id, currency, days]);

    useEffect(() => {
        const handleResize = () => {
            chartRef.current.applyOptions({ width: chartContainerRef.current.clientWidth });
        };

        chartRef.current = createChart(chartContainerRef.current, {
            layout: {
                background: { type: ColorType.Solid, color: '#1f2937' },
                textColor: '#9ca3af',
            },
            grid: {
                vertLines: { color: '#374151' },
                horzLines: { color: '#374151' },
            },
            width: chartContainerRef.current.clientWidth,
            height: 400,
            timeScale: {
                timeVisible: true,
                secondsVisible: false,
            },
        });

        seriesRef.current = chartRef.current.addCandlestickSeries({
            upColor: '#10b981',
            downColor: '#ef4444',
            borderVisible: false,
            wickUpColor: '#10b981',
            wickDownColor: '#ef4444',
        });

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            chartRef.current.remove();
        };
    }, []);

    return (
        <div className="chart-container">
            <div className="chart-header">
                <h3>Price History (OHLC)</h3>
                <div className="timeframe-selector">
                    {[1, 7, 30, 365].map((d) => (
                        <button 
                            key={d} 
                            onClick={() => setDays(d)}
                            className={days === d ? "active" : ""}
                        >
                            {d === 1 ? "1D" : d === 365 ? "1Y" : `${d}D`}
                        </button>
                    ))}
                </div>
            </div>
            <div ref={chartContainerRef} style={{ position: 'relative' }}>
                {loading && <div className="chart-loader">🌀 Loading Chart...</div>}
            </div>
        </div>
    )
}

export default HistoryChart;