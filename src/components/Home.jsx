import copy1 from '../assets/copy1.jpeg';
import { useSpring, animated } from 'react-spring';


function Home() {
  
  const slideIn = useSpring({
    from: { transform: 'translateX(-100%)', opacity: 0 },
    to: { transform: 'translateX(0)', opacity: 1 },
    config: { duration: 1000 }, 
  });

  const continuousMoveUpDown = useSpring({
    from: { transform: 'translateY(0)', opacity: 1 },
    to: async next => {
      // eslint-disable-next-line no-constant-condition
      while (true) {
        await next({ transform: 'translateY(-6px)' });
        await next({ transform: 'translateY(6px)' });
      }
    },
    config: { duration: 1000 },
  });

  return (
    <div className="bg-white p-4 h-screen grid grid-cols-1 md:grid-cols-2">
    <div className="md:flex md:flex-col justify-center items-center text-center md:ml-16 ml-10 mt-5">
      <animated.div style={slideIn}>
        <h1 className="text-3xl  md:text-4xl text-black font-bold md:leading-10 text-justify">
          New era most <br /> popular with
        </h1>
        <h2 className="text-3xl mb-1 md:text-4xl  md:mb-3 font-bold text-black md:leading-10 mt-2 text-justify">
          digital <span className="text-transparent bg-gradient-to-r from-black to-blue-900 font-extrabold bg-clip-text font-5xl text-justify">
          CURRENCY
        </span>
        </h2>
        <h3 className="text-gray-800 md:leading-loose text-justify text-sm mt-5"> A digital currency exchange, is a business that allows customers to trade cryptocurrencies, or digital currencies for other assets, such as conventional fiat money or other digital currencies.</h3>
        <button
        className='rounded-md bg-gradient-to-r from-blue-500 to-blue-400 hover:text-white p-1 w-20 font-semi-bold md:mt-5 mt-4 '
       
>
  Explore
</button>
      </animated.div>
    </div>
    <div className="flex justify-center items-center">
      <animated.img src={copy1} alt="Home" className="max-h-full rounded-3xl  " style={continuousMoveUpDown} />
    </div>
  </div>
  
  );
}

export default Home;