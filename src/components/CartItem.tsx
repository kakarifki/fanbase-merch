// components/CartItemComponent.tsx
import { CartItem } from '@/services/api';

interface CartItemComponentProps {
  item: CartItem;
  onDelete: (productId: string) => void;
}

const CartItemComponent: React.FC<CartItemComponentProps> = ({ item, onDelete }) => {
  return (
    <div className="flex items-center border-b py-2">
      <img
        src={item.product.imageUrl}
        alt={item.product.name}
        className="w-20 h-20 object-cover mr-4"
      />
      <div>
        <h2 className="text-lg font-semibold">{item.product.name}</h2>
        <p>Price: ${item.product.price}</p>
        <p>Quantity: {item.quantity}</p>
        <button
          onClick={() => onDelete(item.product.id)}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded mt-2"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default CartItemComponent;
