// src/hooks/use-cart.ts
import { useQuery } from '@tanstack/react-query';
import { fetchCartItems, CartItem } from '@/services/api'; // Import fungsi fetchCartItems

const useCart = () => {
  const { data: cartItems, isLoading, isError, error } = useQuery<CartItem[], Error>({
    queryKey: ['cart'],
    queryFn: fetchCartItems, // Gunakan fetchCartItems
  });

  return { cartItems: cartItems ?? [], isLoading, isError, error };
};

export default useCart;
