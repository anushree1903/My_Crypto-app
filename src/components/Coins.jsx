import { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../main";
import Loader from "./Loader";
import ErrorComponent from "./ErrorComponent";
import CoinCard from "./CoinCard";

const Coins = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("inr");

  const currencySymbol = currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";
  const changePage = (page) => {
    setPage(page);
    setLoading(true);
  };
  const btns = new Array(132).fill(1);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(
          `${server}/coins/markets?vs_currency=${currency}&page=${page}`
        );
        setCoins(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchCoins();
  }, [currency, page]);

  if (error) return <ErrorComponent message={"Error While Fetching Coins"} />;

  return (
    <div className="container mx-auto max-w-screen-xl">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="p-8">
            <div className="flex space-x-4">
              <div className="flex items-center">
                <label className="ml-2 text-blue-900 font-semibold">Currency:</label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="form-select ml-2  rounded-sm"
                >
                  <option value="inr">INR</option>
                  <option value="usd">USD</option>
                  <option value="eur">EUR</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-evenly">
            {coins.map((i) => (
              <div key={i.id} className="coin-card">
                <CoinCard
                  id={i.id}
                  name={i.name}
                  price={i.current_price}
                  img={i.image}
                  symbol={i.symbol}
                  currencySymbol={currencySymbol}
                />
              </div>
            ))}
          </div>

          <div className="w-full overflow-x-auto p-8">
            <div className="flex">
            {btns.map((item, index) => (
              <button
                key={index}
                className="bg-blue-950 hover:bg-blue-800 mt-5 ml-4 mb-5 text-white w-14 rounded-sm h-10 p-2"
                onClick={() => changePage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Coins;
