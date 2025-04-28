import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchProducts, addProduct, toggleFeatured } from '../redux/store';
import { ProductList } from '../components/Productlist';
import { NewProductForm } from '../components/NewProductForm';
import { FeaturedStats } from '../components/FeaturedStats';

export const ReduxPage: React.FC = () => {
  const products = useSelector((state: RootState) => state.products.items);
  const loading = useSelector((state: RootState) => state.products.loading);
  const dispatch: AppDispatch = useDispatch();

  const featuredCount = products.filter(p => p.featured).length;

  return (
    <div>
      <h1 className="text-2xl mb-4 font-bold">Redux</h1>
      <FeaturedStats count={featuredCount} />
      <NewProductForm addProduct={(product) => dispatch(addProduct(product))} />
      <ProductList 
        products={products} 
        loading={loading} 
        fetchProducts={() => dispatch(fetchProducts())}
        toggleFeatured={(id) => dispatch(toggleFeatured(id))}
      />
    </div>
  );
};
