import { create } from 'zustand';

// Tipe data untuk item di cart
interface CartItem {
  id: string;
  product: {
    name: string;
    price: number;
  };
  quantity: number;
}

interface CartState {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

const useCartStore = create<CartState>((set) => ({
  cartItems: [],

  addToCart: (item) => set((state) => {
    // Cek apakah item sudah ada di cart
    const existingItem = state.cartItems.find((i) => i.id === item.id);
    
    if (existingItem) {
      // Jika item sudah ada, update quantity
      return {
        cartItems: state.cartItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        ),
      };
    } else {
      // Jika belum ada, tambahkan item baru
      return { cartItems: [...state.cartItems, item] };
    }
  }),

  removeFromCart: (id) => set((state) => ({
    cartItems: state.cartItems.filter((item) => item.id !== id),
  })),

  clearCart: () => set({ cartItems: [] }),
}));

export default useCartStore;
