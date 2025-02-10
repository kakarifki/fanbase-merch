import { Link } from 'react-router-dom'; // Menggunakan react-router-dom
import { Input } from "@/components/ui/input"

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md py-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo dan Judul */}
        <Link to="/" className="text-2xl font-bold text-gray-800">
          Fanbase Merch
        </Link>

        {/* Navigasi Tengah */}
        <div className="flex space-x-6">
          <Link to="/" className="text-gray-600 hover:text-gray-800">
            Home
          </Link>
          <Link to="/product" className="text-gray-600 hover:text-gray-800">
            Product
          </Link>
          <Input type="search" placeholder="Search" className="max-w-sm" />
        </div>

        {/* Login/Register */}
        <div className="flex space-x-4">
          <Link to="/login" className="text-gray-600 hover:text-gray-800">
            Login
          </Link>
          <Link to="/register" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
