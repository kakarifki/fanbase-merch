import { Link } from 'react-router-dom';
import { useOrdersList } from '@/hooks/use-order';
import { Button } from './ui/button';
import { Order } from '@/types/order';

const OrderPage = () => {

    // Fungsi format ke Rupiah
    const formatToRupiah = (amount: number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);
    };

    const { data: orders, isLoading, isError, error } = useOrdersList();

    if (isLoading) {
        return <p className="text-center text-gray-600">Loading order...</p>;
    }

    if (isError) {
        return <p className="text-center text-red-500">Error: {(error as Error).message}</p>;
    }

    return (
        <div className="container mx-auto mt-8 px-4">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Order History</h1>
            {orders && orders.length > 0 ? (
                <div className="grid gap-4">
                    {orders.map((order: Order) => (
                        <Link
                            key={order.id}
                            to={`/orders/${order.id}`}
                            className="block bg-white shadow-md rounded-lg p-4 transition-transform transform hover:scale-[1.02]"
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-lg font-semibold text-gray-700">
                                        Order at {new Date(order.createdAt).toLocaleDateString()}
                                    </p>
                                    <p className="text-sm text-gray-500">Order ID: {order.id}</p>
                                </div>
                                <p className="text-lg font-bold text-gray-900">{formatToRupiah(order.totalPrice)}</p>
                                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                                    View Details
                                </Button>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500">No orders found.</p>
            )}
        </div>
    );
};

export default OrderPage;
