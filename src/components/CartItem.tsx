// components/CartItemComponent.tsx
import React from 'react';
import { CartItem } from '@/services/api';
import { Trash2 } from 'lucide-react';

interface CartItemComponentProps {
  item: CartItem;
  onDelete: (productId: string) => void;
}

const CartItemComponent: React.FC<CartItemComponentProps> = ({ item, onDelete }) => {
  // Format price in IDR
  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(item.product.price * item.quantity);

  return (
    <div className="flex items-center border-b border-gray-200 py-4 hover:bg-gray-50 transition-colors duration-300">
      <div className="flex-shrink-0 mr-4">
        <img
          src={item.product.imageUrl}
          alt={item.product.name}
          className="w-24 h-24 object-cover rounded-md shadow-sm"
        />
      </div>
      <div className="flex-grow">
        <h2 className="text-lg font-semibold text-gray-800 mb-1">{item.product.name}</h2>
        <p className="text-gray-600 mb-1">Quantity: {item.quantity}</p>
        <p className="text-primary font-bold">{formattedPrice}</p>
      </div>
      <div>
        <button
          onClick={() => onDelete(item.product.id)}
          className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default CartItemComponent;