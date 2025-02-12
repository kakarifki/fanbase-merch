// src/components/ProductList.tsx
import { useQuery } from '@tanstack/react-query';
import { Product } from '../types/product';
import ProductCard from '@/components/ProductCard';
import { fetchProducts } from '@/services/api';
import { useSearchParams } from 'react-router-dom';

const ProductList = () => {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('search') || '';

  const { data: products, isLoading, isError, error } = useQuery<Product[], Error>({
    queryKey: ['products', searchTerm], // Tambahkan searchTerm sebagai key
    queryFn: fetchProducts,
    select: (data) => {
      // Filter products di sini
      if (searchTerm) {
        return data.filter(product =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      return data; 
    },
  });

  if (isLoading) {
    return <p>Loading products...</p>;
  }

  if (isError) {
    return <p>Error: {(error as Error).message}</p>;
  }
  
  // Cek apakah product not found
  if (products && products.length === 0) {
    return <p>No products found for "{searchTerm}"</p>;
}

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Product List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products?.map((product) => (
          <ProductCard
            key={product.code}
            code={product.code}
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
