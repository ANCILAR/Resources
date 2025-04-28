import React, { useEffect } from 'react';
import { Product } from '../types/product';

interface ProductListProps {
  products: Product[];
  loading: boolean;
  fetchProducts?: () => void;
  toggleFeatured?: (id: number) => void;
}

export const ProductList: React.FC<ProductListProps> = ({ products, loading, fetchProducts, toggleFeatured }) => {
  useEffect(() => {
    if (fetchProducts) {
      fetchProducts();
    }
  }, [fetchProducts]);

  if (loading) return <div className="text-center text-xl">Loading...</div>;

  return (
    <ul className="space-y-4">
      {products.map((product) => (
        <li key={product.id} className="flex justify-between items-center p-4 bg-white rounded shadow">
          <span>{product.name} {product.featured && <span className="text-yellow-500">⭐</span>}</span>
          {toggleFeatured && (
            <button 
              onClick={() => toggleFeatured(product.id)}
              className="px-4 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Toggle Featured
            </button>
          )}
        </li>
      ))}
    </ul>
  );
};
