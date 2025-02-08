// src/lib/auth-client.ts
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL; // Ganti dengan URL backend kamu

export const signUp = async (data: {
  username: string;
  name: string;
  email: string;
  password: string;
}) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, data);
    return { data: response.data, error: null };
  } catch (error: any) {
    return { data: null, error: error.response?.data || { message: 'Failed to sign up' } };
  }
};

export const signIn = async (data: { email: string; password: string }) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, data);
    // Simpan token di localStorage atau cookie
    localStorage.setItem('token', response.data.token);
    return { data: response.data, error: null };
  } catch (error: any) {
    return { data: null, error: error.response?.data || { message: 'Failed to sign in' } };
  }
};

export const getProfile = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { data: response.data, error: null };
  } catch (error: any) {
    return { data: null, error: error.response?.data || { message: 'Failed to fetch profile' } };
  }
};

export const authClient = {
  signUp: (data: {username: string; name:string; email: string; password: string}) => signUp(data),
  signIn: (data: {email: string; password: string}) => signIn(data),
  getProfile: () => getProfile()
}
