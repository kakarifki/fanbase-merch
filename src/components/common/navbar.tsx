import { Link, useNavigate } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from '@/hooks/use-toast';
import useProfile  from '@/hooks/use-profile';
import useCart from '@/hooks/use-cart.ts';
import useAuthStore from '@/store/auth'; // ✅ Zustand untuk global state
import { useState, useEffect } from 'react';

const Navbar = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');

  // token zustand
  const { token, logout } = useAuthStore();

  const handleLogout = () => {
    logout(); // ✅ Hapus token
    toast({
      description: "Log Out successful!",
    });
    navigate("/login"); // ✅ Redirect ke halaman login
  };

  // Hooks
  const { profileData, refetch } = useProfile();
  const { cartItems } = useCart();

  // useEffect untuk refresh
  useEffect(() => {
    if (token) {
      refetch(); // Panggil ulang data profil setelah login
    }
  }, [token, refetch]);

  // Error handling
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
    <nav className="bg-gradient-to-r from-blue-900 to-blue-700 shadow-lg p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-wide hover:text-gray-200 transition">Fanbase Merch</Link>

        {/* Navigasi Tengah */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="hover:text-gray-300 transition">Home</Link>
          <Link to="/product" className="hover:text-gray-300 transition">Product</Link>
          <Link to="/about" className="hover:text-gray-300 transition">About</Link>
          <form onSubmit={handleSubmit} className="ml-4">
            <Input
              type="search"
              placeholder="Search..."
              className="bg-gray-100 text-black px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition w-48"
              value={searchTerm}
              onChange={handleSearch}
            />
          </form>
        </div>

        {/* Login/Register atau Profile & Cart */}
        <div className="flex items-center space-x-4">
          {!token ? (
            <Button asChild variant="secondary" className="bg-white text-blue-900 hover:bg-gray-200 transition font-medium">
              <Link to="/login">Login/Register</Link>
            </Button>
          ) : (
            <>
              <Link to="/profile" className="text-lg font-semibold hover:text-gray-300 transition">Hi, {userName}!</Link>
              
              {/* Cart */}
              <Link to="/cart" className="relative text-2xl hover:text-gray-300 transition">
                🛒
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full shadow-lg">
                    {totalItems}
                  </span>
                )}
              </Link>

              {/* Logout Button */}
              <Button variant="destructive" onClick={handleLogout} className="bg-red-500 hover:bg-red-600 transition">
                Logout
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
