import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchCartItems, CartItem, checkoutOrder } from '@/services/api'; // Pastikan fungsi checkoutOrder diimport
// import { Link } from 'react-router-dom';

const CartPage = () => {
    const navigate = useNavigate();

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
                            <div key={item.id} className="flex items-center border-b py-2">
                                <img
                                    src={item.product.imageUrl}
                                    alt={item.product.name}
                                    className="w-20 h-20 object-cover mr-4"
                                />
                                <div>
                                    <h2 className="text-lg font-semibold">{item.product.name}</h2>
                                    <p>Price: ${item.product.price}</p>
                                    <p>Quantity: {item.quantity}</p>
                                </div>
                            </div>
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
