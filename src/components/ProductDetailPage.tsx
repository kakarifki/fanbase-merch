// src/pages/ProductDetailPage.tsx
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchProductDetail } from '@/services/api'; // Import fungsi detail product

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>(); // Ambil parameter id dari URL

  const { data: product, isLoading, isError, error } = useQuery({
    queryKey: ['product', id], // Gunakan id di queryKey
    queryFn: () => fetchProductDetail(id!), 
    enabled: !!id, 
  });

  if (isLoading) {
    return <p>Loading product details...</p>;
  }

  if (isError) {
    return <p>Error: {(error as Error).message}</p>;
  }

  if (!product) {
    return <p>Product not found.</p>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <img src={product.imageUrl} alt={product.name} />
      <p>Price: {product.price}</p>
      <p>{product.description}</p>
    </div>
  );
};

export default ProductDetailPage;
