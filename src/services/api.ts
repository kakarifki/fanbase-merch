import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL; // Ambil base URL dari environment variable

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