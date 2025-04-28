import React, { useState } from 'react';
import { Product } from '../types/product';

interface NewProductFormProps {
  addProduct: (product: Product) => void;
}

export const NewProductForm: React.FC<NewProductFormProps> = ({ addProduct }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name.trim()) {
      addProduct({ id: Date.now(), name, featured: false });
      setName('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-4 mb-6">
      <input 
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter product name"
        className="flex-1 p-2 border rounded"
      />
      <button 
        type="submit"
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Add
      </button>
    </form>
  );
};
