import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchCartItems, CartItem, checkoutOrder, removeFromCart } from '@/services/api';
import CartItemComponent from '@/components/CartItem';
// import useCartStore from '@/store/cart';

const CartPage = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    

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

    // Fungsi untuk menghitung total harga dalam Rupiah
    const calculateTotalPrice = () => {
        if (!cartItems) return 0;
        return cartItems.reduce((total: number, item: CartItem) => total + item.product.price * item.quantity, 0);
    };

    // Fungsi format ke Rupiah
    const formatToRupiah = (amount: number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);
    };

    // Mutasi untuk delete cart item
    const deleteCartItemMutation = useMutation({
        mutationFn: async (productId: string) => {
            await removeFromCart(productId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart'] });
        },
    });

    // Fungsi untuk menghapus item dari cart
    const handleDeleteCartItem = (productId: string) => {
        deleteCartItemMutation.mutate(productId);
    };

    const totalPrice = calculateTotalPrice();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="container mx-auto mt-8 text-center">
                <p className="text-red-500 text-xl">Error: {(error as Error).message}</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-10 min-h-screen bg-gray-100">
            <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-6">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-900">🛒 Shopping Cart</h1>

                {cartItems?.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-600 text-xl">Your cart is empty.</p>
                    </div>
                ) : (
                    <div>
                        {/* Daftar Item di Cart */}
                        <div className="space-y-4 mb-6">
                            {cartItems?.map((item) => (
                                <CartItemComponent
                                    key={item.id}
                                    item={item}
                                    onDelete={handleDeleteCartItem}
                                />
                            ))}
                        </div>

                        {/* Total Harga */}
                        <div className="border-t pt-6 flex justify-between items-center text-lg font-semibold">
                            <p className="text-gray-700">Total:</p>
                            <p className="text-xl font-bold text-primary">{formatToRupiah(totalPrice)}</p>
                        </div>

                        {/* Tombol Checkout */}
                        <div className="mt-6 text-center">
                            <button
                                onClick={() => mutation.mutate()}
                                disabled={mutation.isPending}
                                className="bg-primary text-white px-6 py-3 rounded-full hover:bg-primary/90 transition disabled:opacity-50 w-full font-medium shadow-md"
                            >
                                {mutation.isPending ? 'Processing...' : 'Checkout Now'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartPage;
