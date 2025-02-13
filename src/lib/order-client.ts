import axios from 'axios'
import { Order } from '@/types/order'

const API_BASE_URL = import.meta.env.VITE_API_URL;
const getToken = () => localStorage.getItem('token');

// Function to get a list of orders
export const listOrder = async () => {
  try {
    const token = getToken();
    const response = await axios.get(`${API_BASE_URL}/order`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error: any) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

// Function to get an order by ID
export const getOrderById = async (orderId: string) => {
  try {
    const token = getToken();
    const response = await axios.get(`${API_BASE_URL}/order/${orderId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error: any) {
    console.error(`Error fetching order with ID ${orderId}:`, error);
    throw error;
  }
};


export const checkoutOrder = async (): Promise<Order> => {
    const token = localStorage.getItem('token')
  
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/order/checkout`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    })
  
    return res.data
  }

