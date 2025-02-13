import axios from 'axios'
import { Order } from '@/types/order'

export const getOrderById = async (orderId: string): Promise<Order | null> => {
  try {
    const token = localStorage.getItem('token') // Ambil token untuk auth
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/order/${orderId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return res.data
  } catch (error) {
    console.error('Failed to fetch order:', error)
    return null
  }
}

export const checkoutOrder = async (): Promise<Order> => {
    const token = localStorage.getItem('token')
  
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/order/checkout`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    })
  
    return res.data
  }
