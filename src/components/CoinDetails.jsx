
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { server } from "../main";
import Chart from "./Chart";
import ErrorComponent from "./ErrorComponent";
import Loader from "./Loader";

const CoinDetails = () => {
  const params = useParams();
  const [coin, setCoin] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState("inr");
  const [days, setDays] = useState("24h");
  const [chartArray, setChartArray] = useState([]);

  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const btns = ["24h", "7d", "14d", "30d", "60d", "200d", "1y", "max"];

  const switchChartStats = (key) => {
    switch (key) {
      case "24h":
        setDays("24h");
        setLoading(true);
        break;
      case "7d":
        setDays("7d");
        setLoading(true);
        break;
      case "14d":
        setDays("14d");
        setLoading(true);
        break;
      case "30d":
        setDays("30d");
        setLoading(true);
        break;
      case "60d":
        setDays("60d");
        setLoading(true);
        break;
      case "200d":
        setDays("200d");
        setLoading(true);
        break;
      case "1y":
        setDays("365d");
        setLoading(true);
        break;
      case "max":
        setDays("max");
        setLoading(true);
        break;

      default:
        setDays("24h");
        setLoading(true);
        break;
    }
  };

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${params.id}`);

        const { data: chartData } = await axios.get(
          `${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`
        );
        setCoin(data);
        setChartArray(chartData.prices);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchCoin();
  }, [params.id, currency, days]);

  if (error) return <ErrorComponent message={"Error While Fetching Coin"} />;

  return (
    <div className="container mx-auto max-w-screen-xl">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="border border-gray-300 p-4 rounded">
            <Chart arr={chartArray} currency={currencySymbol} days={days} />
          </div>

          <div className="flex space-x-4 p-4 overflow-x-auto">
            {btns.map((i) => (
              <button
                key={i}
                onClick={() => switchChartStats(i)}
                className={`${
                  days === i ? "bg-blue-500 text-white" : "bg-gray-300"
                } px-4 py-2 rounded focus:outline-none`}
              >
                {i}
              </button>
            ))}
          </div>

          <div className="p-8">
            <label className="block font-semibold text-gray-700">Currency:</label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="form-select mt-2"
            >
              <option value="inr">INR</option>
              <option value="usd">USD</option>
              <option value="eur">EUR</option>
            </select>
          </div>

          <div className="space-y-4 p-16">
            <p className="text-sm text-gray-600 flex justify-center items-center">
              Last Updated On{" "}
              {Date(coin.market_data.last_updated).split("G")[0]}
            </p>

            <img
              src={coin.image.large}
              alt="Coin Logo"
              className="w-16 h-16 object-contain"
            />

            <div className="p-3">
              <h1 className="text-xl font-semi-bold">{coin.name}</h1>
              <p className="text-2xl font-bold">
                {currencySymbol}
                {coin.market_data.current_price[currency]}
              </p>
              <p className="mb-8 ">
                <span className={coin.market_data.price_change_percentage_24h > 0 ? "text-green-500 text-2xl" : "text-red-500 text-2xl"}>
                  {coin.market_data.price_change_percentage_24h > 0 ? (
                    <span>&#8593;</span>
                  ) : (
                    <span>&#8595;</span>
                  )}
                </span>{" "}
                {coin.market_data.price_change_percentage_24h}%
              </p>
            </div>

            <span className="text-xl bg-black bg-opacity-80 text-white px-4 py-2 rounded ml-5 mt-8 ">
              #{coin.market_cap_rank}
            </span>
                        
              <div className="flex flex-col items-center ">
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-300">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "50%" }}></div>
              </div>
              <div className="flex justify-between w-full mt-1 mb-5">
                <span className="text-base font-bold text-red-600">{currencySymbol}{coin.market_data.high_24h[currency]}</span>
                <span className="text-base font-semi-bold text-black">24H Range</span>
                <span className="text-sm font-bold text-green-600">{currencySymbol}{coin.market_data.low_24h[currency]}</span>
              </div>
            </div>

            <div className=" text-light bg-blue-50 rounded-md p-3 leading-8">
              <Item title={"Max Supply"} value={coin.market_data.max_supply} />
              <Item
                title={"Circulating Supply"}
                value={coin.market_data.circulating_supply}
              />
              <Item
                title={"Market Cap"}
                value={`${currencySymbol}${coin.market_data.market_cap[currency]}`}
              />
              <Item
                title={"All Time Low"}
                value={`${currencySymbol}${coin.market_data.atl[currency]}`}
              />
              <Item
                title={"All Time High"}
                value={`${currencySymbol}${coin.market_data.ath[currency]}`}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const Item = ({ title, value }) => (
  <div className="flex justify-between">
    <p className="font-semibold">{title}</p>
    <p>{value}</p>
  </div>
);

export default CoinDetails;