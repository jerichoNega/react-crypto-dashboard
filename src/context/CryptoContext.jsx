import { createContext, useContext, useState, useEffect } from "react";

const Crypto = createContext();

const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState("usd");
  const [watchlist, setWatchlist] = useState(() => {
    try {
      const savedWatchlist = localStorage.getItem("watchlist");
      return savedWatchlist ? JSON.parse(savedWatchlist) : [];
    } catch (e) {
      console.error("Failed to parse watchlist", e);
      return [];
    }
  });

  const [portfolioHoldings, setPortfolioHoldings] = useState(() => {
    try {
      const savedHoldings = localStorage.getItem("portfolioHoldings");
      return savedHoldings ? JSON.parse(savedHoldings) : {};
    } catch (e) {
      console.error("Failed to parse portfolio holdings", e);
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  useEffect(() => {
    localStorage.setItem("portfolioHoldings", JSON.stringify(portfolioHoldings));
  }, [portfolioHoldings]);

  const symbol = currency === "usd" ? "$" : "€";

  const addToWatchlist = (coinId) => {
    if (!watchlist.includes(coinId)) {
      setWatchlist([...watchlist, coinId]);
    }
  };

  const removeFromWatchlist = (coinId) => {
    setWatchlist(watchlist.filter((id) => id !== coinId));
  };

  const isInWatchlist = (coinId) => watchlist.includes(coinId);

  const updateHolding = (coinId, amount) => {
    setPortfolioHoldings({
      ...portfolioHoldings,
      [coinId]: parseFloat(amount) || 0
    });
  };

  return (
    <Crypto.Provider value={{ 
      currency, 
      setCurrency, 
      symbol, 
      watchlist, 
      addToWatchlist, 
      removeFromWatchlist, 
      isInWatchlist,
      portfolioHoldings,
      updateHolding
    }}>
      {children}
    </Crypto.Provider>
  );
};

export default CryptoContext;

export const CryptoState = () => {
  return useContext(Crypto);
};
