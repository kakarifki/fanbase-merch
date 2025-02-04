import { useEffect, useState } from 'react';
import axios from 'axios';
import { Product } from '../types/product';

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<Product>(`${import.meta.env.VITE_API_URL}/products/jerseylia`);
        setProducts([response.data]);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Product List</h1>
      <ul className="space-y-4">
        {products.map((product) => (
          <li
            key={product.code}
            className="border border-gray-300 p-4 rounded-lg shadow-sm"
          >
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-auto rounded-lg mb-4"
            />
            <p className="text-gray-600">{product.description}</p>
            <p className="mt-2 text-lg font-medium">Price: {product.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;