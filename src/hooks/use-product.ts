// hooks/use-product.ts
import { useQuery } from '@tanstack/react-query';
import { Product } from '../types/product';
import { fetchProducts } from '@/services/api';

export const useProducts = (searchTerm: string = '') => {
  return useQuery<Product[], Error>({
    queryKey: ['products', searchTerm],
    queryFn: fetchProducts,
    select: (data) => {
      if (searchTerm) {
        return data.filter(product =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      return data;
    },
  });
};
