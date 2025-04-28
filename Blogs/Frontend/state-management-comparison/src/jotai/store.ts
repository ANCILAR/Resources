import { atom } from 'jotai';
import { Product } from '../types/product';
import { fetchProducts as fetchProductsAPI } from '../api/products';

export const productsAtom = atom<Product[]>([]);
export const loadingAtom = atom<boolean>(false);

export const fetchProductsAtom = atom(
  null,
  async (get, set) => {
    set(loadingAtom, true);
    const products = await fetchProductsAPI();
    set(productsAtom, products);
    set(loadingAtom, false);
  }
);

export const addProductAtom = atom(
  null,
  (get, set, newProduct: Product) => {
    set(productsAtom, [...get(productsAtom), newProduct]);
  }
);

export const toggleFeaturedAtom = atom(
  null,
  (get, set, id: number) => {
    set(productsAtom, get(productsAtom).map(product =>
      product.id === id ? { ...product, featured: !product.featured } : product
    ));
  }
);
