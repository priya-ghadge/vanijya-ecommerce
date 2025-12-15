// src/components/products/ProductCard.tsx

"use client";

import React from 'react';

interface Product {
  id: string;
  sku: string;
  price: number;
  stock: number;
  isAvailable: boolean;
  name: string; // The translated name
  description: string; // The translated description
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const primaryColor = `rgb(var(--color-primary))`;
  const foregroundColor = `rgb(var(--color-foreground))`;

  // Simple formatting for price in Indian Rupees (₹)
  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
  }).format(product.price * 83); // Simple placeholder conversion (e.g., $1 * 83 = ₹83)

  return (
    <div className="
      bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 
      flex flex-col border border-gray-100
    ">
      {/* Placeholder Image */}
      <div 
        className="h-48 w-full bg-gray-200 rounded-md mb-4 flex items-center justify-center text-gray-500"
        style={{ backgroundColor: `rgb(var(--color-background))` }}
      >
        [Image Placeholder: {product.sku}]
      </div>

      <h3 
        className="text-xl font-semibold mb-2"
        style={{ color: foregroundColor }}
      >
        {product.name}
      </h3>

      <p 
        className="text-2xl font-bold mb-4"
        style={{ color: primaryColor }}
      >
        {formattedPrice}
      </p>

      <p className="text-gray-600 mb-4 flex-grow text-sm">
        {product.description}
      </p>

      <button
        disabled={!product.isAvailable || product.stock === 0}
        className="
          mt-auto py-2 px-4 rounded-md text-white font-medium transition duration-150 ease-in-out 
          disabled:bg-gray-400 disabled:cursor-not-allowed
        "
        style={{ 
          backgroundColor: primaryColor,
          opacity: product.isAvailable && product.stock > 0 ? 1 : 0.6
        }}
      >
        {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
      </button>
    </div>
  );
};

export default ProductCard;