import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Tipe data untuk auth store
interface AuthState {
  token: string | null;
  setToken: (token: string | null) => void;
  logout: () => void;
}

// Membuat store Zustand dengan middleware `persist`
const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      setToken: (newToken: string | null) => {
        set({ token: newToken });
      },
      logout: () => {
        set({ token: null });
      },
    }),
    {
      name: 'auth-storage', // Nama penyimpanan di localStorage
    }
  )
);

export default useAuthStore;
