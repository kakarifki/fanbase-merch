import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addToCart, fetchCartItems, removeFromCart } from '@/services/api';
import { useToast } from './use-toast';
import { CartItem } from '@/services/api';

const useCart = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Fetch cart items
  const { data: cartItems, isLoading, isError } = useQuery<CartItem[], Error>({
    queryKey: ['cart'],
    queryFn: fetchCartItems,
  });

  // Add to cart mutation
  const addToCartMutation = useMutation<void, Error, { code: string; quantity: number }>({
    mutationFn: ({ code, quantity }) => addToCart(code, quantity),
    onSuccess: () => {
      // Invalidate and refetch cart items
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast({
        title: "Added to Cart",
        description: "Item successfully added to your cart"
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add item to cart",
        variant: "destructive"
      });
    }
  });

  // Remove from cart mutation
  const removeFromCartMutation = useMutation<void, Error, string>({
    mutationFn: (productId) => removeFromCart(productId),
    onSuccess: () => {
      // Invalidate and refetch cart items
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast({
        title: "Removed from Cart",
        description: "Item successfully removed from your cart"
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to remove item from cart",
        variant: "destructive"
      });
    }
  });

  return {
    cartItems: cartItems ?? [],
    isLoading,
    isError,
    addToCart: (code: string, quantity: number = 1) => 
      addToCartMutation.mutate({ code, quantity }),
    removeFromCart: (productId: string) => 
      removeFromCartMutation.mutate(productId)
  };
};

export default useCart;
