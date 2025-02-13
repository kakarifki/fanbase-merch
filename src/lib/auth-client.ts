// src/lib/auth-client.ts
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL; // Biar call pake env aja

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
    console.log("signIn response:", response); // Tambahkan ini
    // Simpan token di localStorage atau cookie
    localStorage.setItem('token', response.data.token);
    return { data: response.data, error: null };
  } catch (error: any) {
    console.error("signIn error:", error); // Tambahkan ini
    return { data: null, error: error.response?.data || { message: 'Failed to sign in' } };
  }
};

export const getProfile = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      return { data: null, error: { message: "Unauthorized" } };
    }

    const response = await axios.get(`${API_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { data: response.data, error: null };
  } catch (error: any) {
    return { data: null, error: error.response?.data || { message: "Failed to fetch profile" } };
  }
};

export const authClient = {
  signUp: (data: {username: string; name:string; email: string; password: string}) => signUp(data),
  signIn: (data: {email: string; password: string}) => signIn(data),
  getProfile: () => getProfile()
}
