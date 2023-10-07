import { useSpring, animated } from 'react-spring';
import { Link } from 'react-router-dom';

const CoinCard = ({ id, name, img, symbol, price, currencySymbol = "₹"  }) => {
  const slideIn = useSpring({
    from: { transform: 'translateX(100px)', opacity: 0 },
    to: { transform: 'translateX(0)', opacity: 1 },
    config: { duration: 500 },
  });
  return (
    <Link to={`/coin/${id}`}>
      <animated.div className="w-52 shadow-lg p-8 rounded-md m-4 hover:scale-105 flex flex-col justify-center items-center leading-10 hover:bg-blue-50 bg-white"style={slideIn}>
        <img src={img} className="w-10 h-10 object-contain" alt="Exchange" />
        <h2 className="text-md truncate font-bold">{symbol}</h2>
        <p className="truncate text-[#1e1b4b] font-semi-bold">{name}</p>
        <p className="truncate text-green-600 font-semi-bold">{price ? `${currencySymbol}${price}` : "NA"}</p>
        

      </animated.div>
    </Link>
  );
};

export default CoinCard
