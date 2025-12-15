// src/app/products/page.tsx

"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useLocale } from '@/context/LocaleContext';
import ProductCard from '@/components/products/ProductCard';
import LocaleSelector from '../../components/common/LocalSelector';

// Define the shape of the data we expect from the API
interface Product {
  id: string;
  sku: string;
  price: number;
  stock: number;
  isAvailable: boolean;
  name: string; 
  description: string;
}

const ProductListingPage: React.FC = () => {
  const { locale } = useLocale();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const primaryColor = `rgb(var(--color-primary))`;
  const backgroundColor = `rgb(var(--color-background))`;

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      // 💡 Fetch data, passing the current locale as a query parameter
      const response = await fetch(`/api/products?locale=${locale}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.statusText}`);
      }
      
      const data = await response.json();
      setProducts(data);
      
    } catch (err: any) {
      console.error(err);
      setError('Could not load products. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [locale]); // Rerun fetch whenever the locale changes

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div 
      className="min-h-screen p-8"
      style={{ backgroundColor: backgroundColor }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header and Selector */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-extrabold" style={{ color: primaryColor }}>
            Product Catalog
          </h1>
          <LocaleSelector />
        </div>
        
        {/* State Displays */}
        {loading && (
          <div className="text-center py-20 text-xl" style={{ color: primaryColor }}>
            Loading products in {locale.toUpperCase()}...
          </div>
        )}
        
        {error && (
          <div className="text-center py-20 text-red-600 border border-red-400 p-4 rounded-lg bg-red-50">
            Error: {error}
          </div>
        )}

        {/* Product Grid */}
        {!loading && products.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
        
        {!loading && products.length === 0 && !error && (
          <div className="text-center py-20 text-gray-500 text-xl">
            No products found for this language.
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductListingPage;