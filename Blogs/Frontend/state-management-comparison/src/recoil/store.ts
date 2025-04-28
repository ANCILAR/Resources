import { atom, selector } from 'recoil';
import { Product } from '../types/product';
import { fetchProducts as fetchProductsAPI } from '../api/products';

export const productsAtom = atom<Product[]>({
  key: 'productsAtom',
  default: []
});

export const loadingAtom = atom<boolean>({
  key: 'loadingAtom',
  default: false
});

export const fetchProductsSelector = selector({
  key: 'fetchProductsSelector',
  get: async () => {
    return await fetchProductsAPI();
  }
});
