import { useQuery } from '@tanstack/react-query';
import { Product } from '../types/product';
import ProductCard from '@/components/ProductCard';
import { fetchProducts } from '@/services/api';



const ProductList = () => {
  const { data: products, isLoading, isError, error } = useQuery<Product[], Error>({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  if (isLoading) {
    return <p>Loading products...</p>;
  }

  if (isError) {
    return <p>Error: {(error as Error).message}</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Product List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products?.map((product) => (
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