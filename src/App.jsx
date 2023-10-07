import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Header from "./components/Header";
import Home from "./components/Home";
import Coins from "./components/Coins";
import Exchanges from "./components/Exchanges";
import CoinDetails from "./components/CoinDetails";

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coins" element={<Coins />} />
        <Route path="/exchanges" element={<Exchanges />} />
        <Route path="/coin/:id" element={<CoinDetails />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
