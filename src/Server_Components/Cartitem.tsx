"use client"

import React, { useState } from 'react';

interface CartItemProps {
  title: string;
  price: number;
  image: string;
  quantity: number;
}

const CartItem: React.FC<CartItemProps> = ({
  title,
  price,
  image,
  quantity,
}) => {
  const [qty, setQty] = useState(quantity);

  const handleQtyChange = (newQty: number) => {
    if (newQty < 1) return;
    setQty(newQty);
    // optionally: call an API to update quantity in backend here
  };

  return (
    <div className="flex items-center gap-6 bg-white rounded-lg shadow-md p-4 hover:shadow-xl transition-shadow duration-300 transform hover:scale-[1.02]">
      {/* Product Image */}
      <img
        src={image}
        alt={title}
        className="w-28 h-28 rounded-lg object-cover border border-gray-200"
      />

      {/* Details */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="mt-1 text-yellow-600 font-bold text-xl">${price.toFixed(2)}</p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center space-x-3">
        <button
          onClick={() => handleQtyChange(qty - 1)}
          disabled={qty <= 1}
          className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition"
          aria-label="Decrease quantity"
        >
          −
        </button>
        <span className="w-8 text-center font-medium text-gray-800">{qty}</span>
        <button
          onClick={() => handleQtyChange(qty + 1)}
          className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 text-gray-700 hover:bg-gray-200 transition"
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default CartItem;
