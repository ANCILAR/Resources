import React from 'react';
import { useProductStore } from '../zustand/store';
import { ProductList } from '../components/Productlist';
import { NewProductForm } from '../components/NewProductForm';
import { FeaturedStats } from '../components/FeaturedStats';

export const ZustandPage: React.FC = () => {
  const { items, loading, fetchProducts, addProduct, toggleFeatured } = useProductStore();
  const featuredCount = items.filter(p => p.featured).length;

  return (
    <div>
      <h1 className="text-2xl mb-4 font-bold">Zustand</h1>
      <FeaturedStats count={featuredCount} />
      <NewProductForm addProduct={addProduct} />
      <ProductList 
        products={items}
        loading={loading}
        fetchProducts={fetchProducts}
        toggleFeatured={toggleFeatured}
      />
    </div>
  );
};
