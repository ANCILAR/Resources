import { create } from 'zustand';
import { Product } from '../types/product';
import { fetchProducts as fetchProductsAPI } from '../api/products';

interface ProductStore {
  items: Product[];
  loading: boolean;
  fetchProducts: () => Promise<void>;
  addProduct: (product: Product) => void;
  toggleFeatured: (id: number) => void;
}

export const useProductStore = create<ProductStore>((set) => ({
  items: [],
  loading: false,
  fetchProducts: async () => {
    set({ loading: true });
    const products = await fetchProductsAPI();
    set({ items: products, loading: false });
  },
  addProduct: (product) => set(state => ({ items: [...state.items, product] })),
  toggleFeatured: (id) => set(state => ({
    items: state.items.map(p =>
      p.id === id ? { ...p, featured: !p.featured } : p
    )
  }))
}));
