// components/OrderDetailPage.tsx
// import React from 'react';
import { useParams, Link} from 'react-router-dom';
import { useOrder } from '@/hooks/use-order';
import { Button } from './ui/button';
// import { Order } from '@/types/order';

const OrderDetailPage = () => {
    const { orderId } = useParams();
    const { data: order, isLoading, isError, error } = useOrder(orderId);

    if (isLoading) {
        return <p>Loading order details...</p>;
    }

    if (isError) {
        return <p>Error: {(error as Error).message}</p>;
    }

    if (!order) {
        return <p>Order not found.</p>;
    }

    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-2xl font-bold mb-4">Order Details</h1>
            <div className="bg-white shadow-md rounded-lg p-4">
                <h2 className="text-lg font-semibold mb-3">Order Items</h2>
                <ul>
                    {order.orderItems.map((item) => (
                        <li key={item.id} className="border-b py-2">
                            <p className="font-medium">{item.product.name}</p>
                            <p>Qty: {item.quantity} - Price: ${item.price}</p>
                        </li>
                    ))}
                </ul>
                <div className="mt-4">
                    <p className="font-bold">Total Price: ${order.totalPrice}</p>
                    {/* Tampilkan informasi lainnya seperti status order, tanggal, dll. */}
                </div>
                 <Link to="/orders">
        <Button className="mt-6 bg-blue-600 hover:bg-blue-700">Back to Orders</Button>
      </Link>
            </div>
        </div>
    );
};

export default OrderDetailPage;
