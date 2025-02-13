import { useQuery } from '@tanstack/react-query';
import { listOrder,getOrderById } from '@/lib/order-client';
// import type { Order } from '@/types/order';

//interface list orrder

export const useOrdersList = () => {
    return useQuery({
      queryKey: ['orders'],
      queryFn: listOrder,
    });
  };

  export const useOrder = (orderId?: string) => {
    return useQuery({
      queryKey: ['order', orderId],
      queryFn: async () => {
        if (!orderId) return null;
        return await getOrderById(orderId);
      },
      enabled: !!orderId,  // Hanya jalankan query jika orderId ada
    });
  };