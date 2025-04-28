import { Product } from '../types/product';

const mockProducts: Product[] = [
  { id: 1, name: "Laptop", featured: false },
  { id: 2, name: "Smartphone", featured: true },
  { id: 3, name: "Headphones", featured: false }
];

export async function fetchProducts(): Promise<Product[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockProducts);
    }, 1000);
  });
}
