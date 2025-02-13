// src/pages/ProductDetailPage.tsx
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchProductDetail, addToCart } from '@/services/api'; // Import addToCart
import { useToast } from '@/hooks/use-toast';

const ProductDetailPage = () => {
  const { id: code } = useParams<{ id: string }>();
  const { toast } = useToast()

  const { data: product, isLoading, isError, error } = useQuery({
    queryKey: ['product', code],
    queryFn: () => fetchProductDetail(code!),
    enabled: !!code,
  });

  const [quantity, setQuantity] = useState<number>(1);

  const handleAddToCart = async () => {
    try {
      await addToCart(code!, quantity); // Panggil addToCart

      // Berhasil ditambahkan ke cart
      console.log('Product added to cart!');
      toast({
        title: "Product added to cart!",
      });
      // Mungkin tampilkan pesan sukses ke user
    } catch (error: any) {
      console.error('Error adding to cart:', error.message);
      // Tampilkan pesan error ke user
    }
  };

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

      <div>
        <label htmlFor="quantity">Quantity:</label>
        <input
          type="number"
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          min="1"
        />
      </div>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default ProductDetailPage;
