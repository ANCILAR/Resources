import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValueLoadable } from 'recoil';
import { productsAtom, loadingAtom, fetchProductsSelector } from '../recoil/store';
import { ProductList } from '../components/Productlist';
import { NewProductForm } from '../components/NewProductForm';
import { FeaturedStats } from '../components/FeaturedStats';
import { Product } from '../types/product';

export const RecoilPage: React.FC = () => {
  const [products, setProducts] = useRecoilState(productsAtom);
  const [loading, setLoading] = useRecoilState(loadingAtom);
  const fetchedProducts = useRecoilValueLoadable(fetchProductsSelector);

  const featuredCount = products.filter(p => p.featured).length;

  useEffect(() => {
    if (products.length === 0 && fetchedProducts.state === 'hasValue') {
      setProducts(fetchedProducts.contents as Product[]);
      setLoading(false);
    }
  }, [fetchedProducts.state]);

  return (
    <div>
      <h1 className="text-2xl mb-4 font-bold">Recoil</h1>
      <FeaturedStats count={featuredCount} />
      <NewProductForm addProduct={(product) => setProducts([...products, product])} />
      <ProductList 
        products={products}
        loading={loading}
        toggleFeatured={(id) => 
          setProducts(products.map(p => 
            p.id === id ? { ...p, featured: !p.featured } : p
          ))
        }
      />
    </div>
  );
};
