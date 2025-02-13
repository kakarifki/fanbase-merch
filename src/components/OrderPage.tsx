// components/OrderPage.tsx
// import React from 'react';
import { Link } from 'react-router-dom';
import { useOrdersList } from '@/hooks/use-order';
import { Button } from './ui/button';
import { Order } from '@/types/order';

const OrderPage = () => {
    const{ data : orders, isLoading, isError, error } = useOrdersList()


    if (isLoading) {
        return <p>Loading order...</p>;
    }

    if (isError) {
        return <p>Error: {(error as Error).message}</p>;
    }

    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-2xl font-bold mb-4">Order History</h1>
            {orders && orders.length > 0 ? (
                <ul>
                    {orders.map((order:Order) => (
                        <li key={order.id} className="border-b py-2">
                            <Link to={`/orders/${order.id}`} className="flex items-center justify-between">
                                <span>Order ID: {order.id}</span>
                                <span>Total: ${order.totalPrice}</span>
                                <Button>View Details</Button>
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No orders found.</p>
            )}
        </div>
    );
};

export default OrderPage;
