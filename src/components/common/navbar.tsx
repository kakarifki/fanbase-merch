// src/components/Navbar.tsx
import { Link, useNavigate } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { useState } from 'react';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (searchTerm.trim() !== '') {
      navigate(`/product?search=${searchTerm}`); // Redirect ke halaman product dengan keyword pencarian
    } else {
      navigate('/product'); // Redirect ke halaman product tanpa keyword jika kosong
    }
  };

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
          {/* search bar */}
          <form onSubmit={handleSubmit}>
            <Input
              type="search"
              placeholder="Search"
              className="max-w-sm"
              value={searchTerm}
              onChange={handleSearch}
            />
          </form>
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
