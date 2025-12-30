import { createContext, useContext, useState } from "react";

const Crypto = createContext();

const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState("usd");

  // Logic: We don't need a separate state for symbol. 
  // We just calculate it based on what currency is.
  const symbol = currency === "usd" ? "$" : "€";

  return (
    <Crypto.Provider value={{ currency, setCurrency, symbol }}>
      {children}
    </Crypto.Provider>
  );
};

export default CryptoContext;

export const CryptoState = () => {
  return useContext(Crypto);
};
