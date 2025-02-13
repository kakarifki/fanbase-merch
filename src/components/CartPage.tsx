import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchCartItems, CartItem, checkoutOrder, removeFromCart } from '@/services/api'; // Pastikan fungsi checkoutOrder diimport
import CartItemComponent from '@/components/CartItem';

const CartPage = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient(); // Initialize QueryClient utk invalidate query

    // Mengambil data cart
    const { data: cartItems, isLoading, isError, error } = useQuery({
        queryKey: ['cart'],
        queryFn: fetchCartItems,
    });

    // Mutasi untuk checkout
    const mutation = useMutation({
        mutationFn: checkoutOrder,
        onSuccess: (order) => {
            navigate(`/checkout-success?orderId=${order.id}`);
        },
    });

    // Fungsi untuk menghitung total harga
    const calculateTotalPrice = () => {
        if (!cartItems) return 0;
        return cartItems.reduce((total: number, item: CartItem) => total + item.product.price * item.quantity, 0);
    };

// Mutasi untuk delete cart item
const deleteCartItemMutation = useMutation({
    mutationFn: async (productId: string) => {
      await removeFromCart(productId); // Panggil fungsi removeFromCart
    },
    onSuccess: () => {
      // Invalidate query cart setelah delete berhasil
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

    // Fungsi untuk menghapus item dari cart
  const handleDeleteCartItem = (productId: string) => {
    deleteCartItemMutation.mutate(productId);
  };

    const totalPrice = calculateTotalPrice();

    if (isLoading) {
        return <p>Loading cart...</p>;
    }

    if (isError) {
        return <p>Error: {(error as Error).message}</p>;
    }

    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
            {cartItems?.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
          {/* Product List */}
          <div className="mb-4">
            {cartItems?.map((item) => (
              <CartItemComponent
                key={item.id}
                item={item}
                onDelete={handleDeleteCartItem} // kirim fungsi delete ke CartItemComponent
              />
            ))}
          </div>

                    {/* Total Price */}
                    <div className="mb-4">
                        <p className="text-xl font-semibold">Total: ${totalPrice}</p>
                    </div>

                    {/* Checkout Button */}
                    <div>
                        <button
                            onClick={() => mutation.mutate()}
                            disabled={mutation.isPending}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            {mutation.isPending ? 'Processing...' : 'Checkout'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;
