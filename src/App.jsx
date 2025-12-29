import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CoinDetails from "./pages/CoinDetails";

function App() {
  return (
    <div className="app-container">
      <nav>
        <h1>CryptoTracker</h1>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coin/:id" element={<CoinDetails />} />
      </Routes>

    </div>
  )
}
export default App;