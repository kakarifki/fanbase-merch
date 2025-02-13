import axios from 'axios';
import { Order } from '@/types/order' 

const API_BASE_URL = import.meta.env.VITE_API_URL; // Ambil base URL dari environment variable

export interface CartItem {
  id: string;
  product: {
      id: string;
      name: string;
      imageUrl: string;
      price: number;
  };
  quantity: number;
}


// Fungsi untuk mendapatkan token dari localStorage
const getToken = () => {
  return localStorage.getItem('token'); // Ganti 'token' dengan key yang kamu gunakan
};

// Fungsi untuk mengambil daftar product
export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Fungsi untuk mengambil detail product berdasarkan ID
export const fetchProductDetail = async (code: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/${code}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with ID ${code}:`, error);
    throw error;
  }
};

// Fungsi untuk menambahkan product ke cart
export const addToCart = async (code: string, quantity: number = 1) => {
  try {
      const token = getToken();
      const response = await axios.post(
          `${API_BASE_URL}/cart/items`,
          { code, quantity },
          {
              headers: {
                  Authorization: `Bearer ${token}`, // Tambahkan header Authorization
              },
          }
      );
      return response.data;
  } catch (error) {
      console.error(`Error adding product with code ${code} to cart:`, error);
      throw error;
  }
};

// Fungsi untuk mengambil cart items
export const fetchCartItems = async (): Promise<CartItem[]> => {
  try {
      const token = localStorage.getItem('token');
      const response = await axios.get<CartItem[]>(`${API_BASE_URL}/cart`, {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      });
      return response.data;
  } catch (error) {
      console.error('Error fetching cart items:', error);
      throw error;
  }
};

// FUngsi checkoout
export const checkoutOrder = async (): Promise<Order> => {
  const token = localStorage.getItem('token')

  const res = await axios.post(`${import.meta.env.VITE_API_URL}/order/checkout`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  })

  return res.data
}

// Fungsi untuk menghapus product dari cart (DELETE request)
export const removeFromCart = async (productId: string) => {
  try {
      const token = getToken();
      await axios.delete(`${API_BASE_URL}/cart/items`, {  // Ubah Ke /cart/items
          headers: {
              Authorization: `Bearer ${token}`,
          },
          data: { productId }  // Kirim productId di request body
      });
  } catch (error) {
      console.error(`Error removing product with id ${productId} from cart:`, error);
      throw error;
  }
};