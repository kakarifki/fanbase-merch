import { useEffect, useState } from 'react';
import axios from 'axios';
import { Product } from '../types/product';
import ProductCard from '@/components/productcard'

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<Product[]>(`${import.meta.env.VITE_API_URL}/products`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Product List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard
            key={product.code}
            name={product.name}
            imageUrl={product.imageUrl || ''}
            price={product.price}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;