// src/pages/ProductDetailPage.tsx
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchProductDetail, addToCart } from '@/services/api';
import { useToast } from '@/hooks/use-toast';
import { Heart, ShoppingCart, Minus, Plus } from 'lucide-react';

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
      await addToCart(code!, quantity);

      console.log('Product added to cart!');
      toast({
        title: "Product added to cart!",
      });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      
      toast({
        variant: "destructive",
        title: "Sorry",
        description: "Please Login First",
      })

      console.error('Error adding to cart:', errorMessage);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-xl shadow-md">
          <p className="text-2xl font-bold text-red-500">Error: {(error as Error).message}</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-xl shadow-md">
          <p className="text-2xl font-bold text-gray-700">Product not found.</p>
        </div>
      </div>
    );
  }

  // Format price in IDR
  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(product.price);

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
        <div className="md:w-1/2 relative">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
          <button className="absolute top-4 right-4 bg-white/70 p-2 rounded-full hover:bg-white/90 transition">
            <Heart className="w-6 h-6 text-red-500" />
          </button>
        </div>

        <div className="md:w-1/2 p-6 space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <p className="text-2xl font-semibold text-primary">{formattedPrice}</p>
          </div>

          <p className="text-gray-600 leading-relaxed">{product.description}</p>

          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex items-center border rounded-full">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2 hover:bg-gray-100 rounded-l-full"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="px-4 font-semibold">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-2 hover:bg-gray-100 rounded-r-full"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <button 
              onClick={handleAddToCart}
              className="w-full sm:flex-grow bg-primary text-white px-4 py-2 rounded-full hover:bg-primary/90 transition flex items-center justify-center"
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </button>

            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Heart className="h-5 w-5 text-red-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;