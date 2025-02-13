import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { getOrderById } from '@/lib/order-client'
import { Order } from '@/types/order' 
import { Link } from 'react-router-dom'

const CheckoutSuccess = () => {
  const [order, setOrder] = useState<Order | null>(null)
  const [searchParams] = useSearchParams()
  const orderId = searchParams.get('orderId')
  const formatToRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);
};

  const { data, isLoading, isError } = useQuery<Order | null>({
    queryKey: ['order', orderId],
    queryFn: async () => {
      if (!orderId) return null
      return await getOrderById(orderId)
    },
    enabled: !!orderId, // Hanya jalankan query jika ada orderId
  })

  useEffect(() => {
    if (data) setOrder(data)
  }, [data])

  if (isLoading) return <p>Loading...</p>
  if (isError || !order) return <p>Error fetching order data.</p>

  return (
    <div className="max-w-lg mx-auto text-center py-10">
      <h1 className="text-2xl font-bold text-green-600">Checkout Berhasil!</h1>
      <p className="text-gray-600 mt-2">Terima kasih telah berbelanja di Fanbase Merch.</p>

      <div className="mt-6 bg-white shadow-md rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-3">Detail Pesanan</h2>
        <ul className="text-left">
          {order.orderItems.map((item) => (
            <li key={item.id} className="border-b py-2">
              <p className="font-medium">{item.product.name}</p>
              <p>Qty: {item.quantity} - Total: {formatToRupiah(item.price)}</p>
            </li>
          ))}
        </ul>

        <div className="mt-4">
          <p className="font-bold">Total Harga: {formatToRupiah(order.totalPrice)}</p>
          <p>Status Pembayaran: <span className="text-blue-600">{order.status}</span></p>
        </div>
      </div>

      <Link to="/product">
        <Button className="mt-6 bg-blue-600 hover:bg-blue-700">Back to Products</Button>
      </Link>
    </div>
  )
}

export default CheckoutSuccess
