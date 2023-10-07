import { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../main";
import Loader from "./Loader";
import ErrorComponent from "./ErrorComponent";
import { useSpring, animated } from 'react-spring';


const Exchanges = () => {
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const { data } = await axios.get(`${server}/exchanges`);
        setExchanges(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchExchanges();
  }, []);

  if (error) return <ErrorComponent message={"Error While Fetching Exchanges"} />;

  return (
    <div className="container mx-auto max-w-screen-xl">
      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-wrap justify-evenly">
          {exchanges.map((exchange) => (
            <ExchangeCard
              key={exchange.id}
              name={exchange.name}
              img={exchange.image}
              rank={exchange.trust_score_rank}
              url={exchange.url}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const ExchangeCard = ({ name, img, rank, url }) => {
  const slideIn = useSpring({
    from: { transform: 'translateX(100px)', opacity: 0 },
    to: { transform: 'translateX(0)', opacity: 1 },
    config: { duration: 1000 },
  });
  return (
    <a href={url} target={"blank"}>
      <animated.div className="w-52 shadow-lg p-8 rounded-md m-4 hover:scale-105 flex flex-col justify-center items-center leading-10 mt-14 hover:bg-blue-50 bg-white"style={slideIn}>
        <img src={img} className="w-10 h-10 object-contain" alt="Exchange" />
        <h2 className="text-md truncate font-bold">{rank}</h2>
        <p className="truncate text-[#1e1b4b] font-semi-bold">{name}</p>
      </animated.div>
    </a>
  );
};

export default Exchanges;