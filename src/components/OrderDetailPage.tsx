import { useParams, Link } from 'react-router-dom';
import { useOrder } from '@/hooks/use-order';
import { Button } from './ui/button';
import { OrderItem } from '@/types/order';

const OrderDetailPage = () => {
    const { orderId } = useParams();
    const formatToRupiah = (amount: number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);
    };
    const { data: order, isLoading, isError, error } = useOrder(orderId);

    if (isLoading) {
        return <p className="text-center text-gray-600">Loading order details...</p>;
    }

    if (isError) {
        return <p className="text-center text-red-500">Error: {(error as Error).message}</p>;
    }

    if (!order) {
        return <p className="text-center text-gray-500">Order not found.</p>;
    }

    return (
        <div className="container mx-auto mt-8 px-4">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Order Details</h1>
            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Order Items</h2>
                <ul className="divide-y divide-gray-200">
                    {order.orderItems.map((item: OrderItem) => (
                        <li key={item.id} className="py-4">
                            <p className="font-medium text-gray-900">{item.product.name}</p>
                            <p className="text-gray-600">
                                Qty: {item.quantity} - Price: {formatToRupiah(item.price)}
                            </p>
                        </li>
                    ))}
                </ul>
                <div className="mt-6">
                    <p className="text-lg font-bold text-gray-900">
                        Total Price: {formatToRupiah(order.totalPrice)}
                    </p>
                </div>
                <div className="mt-6">
                    <Link to="/orders">
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                            Back to Orders
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default OrderDetailPage;
