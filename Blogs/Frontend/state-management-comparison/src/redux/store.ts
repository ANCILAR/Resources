import { configureStore, createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types/product';
import { fetchProducts as fetchProductsAPI } from '../api/products';

interface ProductState {
  items: Product[];
  loading: boolean;
}

const initialState: ProductState = {
  items: [],
  loading: false
};

export const fetchProducts = createAsyncThunk('products/fetch', async () => {
  const products = await fetchProductsAPI();
  return products;
});

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<Product>) {
      state.items.push(action.payload);
    },
    toggleFeatured(state, action: PayloadAction<number>) {
      const product = state.items.find(p => p.id === action.payload);
      if (product) {
        product.featured = !product.featured;
      }
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
      state.loading = false;
      state.items = action.payload;
    });
    builder.addCase(fetchProducts.rejected, (state) => {
      state.loading = false;
    });
  }
});

export const { addProduct, toggleFeatured } = productSlice.actions;

const store = configureStore({
  reducer: {
    products: productSlice.reducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
