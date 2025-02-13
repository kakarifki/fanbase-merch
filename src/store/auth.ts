// src/store/auth.ts
import { create } from 'zustand';

interface AuthState {
  token: string | null;
  setToken: (token: string | null) => void;
  logout: () => void; // ✅ Tambahkan logout function
}

const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem('token') || null,
  setToken: (token) => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
    set({ token });
  },
  logout: () => { // ✅ Implementasi logout
    localStorage.removeItem('token'); // Hapus token di localStorage
    set({ token: null }); // Hapus token di Zustand
  },
}));

export default useAuthStore;
