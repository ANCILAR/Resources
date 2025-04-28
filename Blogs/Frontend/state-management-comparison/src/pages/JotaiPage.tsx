import React from 'react';
import { useAtom } from 'jotai';
import { productsAtom, loadingAtom, fetchProductsAtom, addProductAtom, toggleFeaturedAtom } from '../jotai/store';
import { ProductList } from '../components/Productlist';
import { NewProductForm } from '../components/NewProductForm';
import { FeaturedStats } from '../components/FeaturedStats';

export const JotaiPage: React.FC = () => {
  const [products] = useAtom(productsAtom);
  const [loading] = useAtom(loadingAtom);
  const [, fetchProducts] = useAtom(fetchProductsAtom);
  const [, addProduct] = useAtom(addProductAtom);
  const [, toggleFeatured] = useAtom(toggleFeaturedAtom);

  const featuredCount = products.filter(p => p.featured).length;

  return (
    <div>
      <h1 className="text-2xl mb-4 font-bold">Jotai</h1>
      <FeaturedStats count={featuredCount} />
      <NewProductForm addProduct={addProduct} />
      <ProductList 
        products={products}
        loading={loading}
        fetchProducts={fetchProducts}
        toggleFeatured={toggleFeatured}
      />
    </div>
  );
};
