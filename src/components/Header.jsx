
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className="bg-blue-100 mt-4 rounded-r-2xl  flex justify-between items-center max-w-5xl p-1 ">
    <div className="flex items-center">
      <img src={logo} alt="Logo" className="w-12 h-10 md:w-22 md:h-22 ml-10" /> 
    </div>
    <div className="flex space-x-9 font-bold mr-14"> 
      <Link to="/" className="text-gray-700 hover:text-blue-900 ">Home</Link>
      <Link to="/exchanges" className="text-gray-700 hover:text-blue-900">Exchanges</Link>
      <Link to="/coins" className="text-gray-700 hover:text-blue-900">Coins</Link>
    </div>
  </div>
  );
}

export default Header;


