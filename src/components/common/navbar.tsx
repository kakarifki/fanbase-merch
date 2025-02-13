import { Link, useNavigate } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useProfile  from '@/hooks/use-profile';
import useCart from '@/hooks/use-cart.ts';
import useAuthStore from '@/store/auth'; // ✅ Zustand untuk global state
import { useState, useEffect } from 'react';

const Navbar = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // ✅ Gunakan Zustand untuk ambil token
  const { token } = useAuthStore();

  // ✅ Panggil hooks di luar kondisi
  const { profileData, refetch } = useProfile();
  const { cartItems } = useCart();

// ✅ Gunakan useEffect untuk update profile setelah login
useEffect(() => {
  if (token) {
    refetch(); // Panggil ulang data profil setelah login
  }
}, [token, refetch]);

  // ✅ Pastikan data tidak error jika belum login
  const userName = token ? profileData?.name ?? 'Loading...' : '';
  const totalItems = token ? cartItems?.length ?? 0 : 0;

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    navigate(searchTerm.trim() ? `/product?search=${searchTerm}` : '/product');
  };

  return (
    <nav className="bg-gray-900 p-4 text-white flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">Fanbase Merch</Link>

      {/* Navigasi Tengah */}
      <div className="flex space-x-6">
        <Link to="/" className="text-gray-300 hover:text-white">Home</Link>
        <Link to="/product" className="text-gray-300 hover:text-white">Product</Link>
        <Link to="/about" className="text-gray-300 hover:text-white">About</Link>
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

      {/* Login/Register atau Profile & Cart */}
      <div className="flex items-center space-x-4">
        {!token ? (
          <Button asChild>
            <Link to="/login">Login/Register</Link>
          </Button>
        ) : (
          <>
            <Link to="/profile" className="text-lg font-bold">Welcome, {userName}!</Link>
            <Link to="/cart" className="relative">
              🛒 <span className="text-sm bg-red-500 text-white px-2 rounded-full">{totalItems}</span>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
