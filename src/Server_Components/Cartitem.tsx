'use client';

import { Alert, Snackbar } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';

interface CartItemProps {
  title: string;
  price: number;
  image: string;
  quantity: number;
}

interface modalType {
  open: boolean;
  message: string;
  severity: any;
}

const CartItem: React.FC<CartItemProps> = ({
  title,
  price,
  image,
  quantity,
}) => {
  // --------------------- FOR NAVIGATION -------------------
  
  const router = useRouter();

  // ------------------ USE STATES -------------------

  const [qty, setQty] = useState(quantity);
  const [messageModal, setMessageModal] = useState<modalType>({
    open: false,
    message: '',
    severity: 'success',
  });

  // ------------------- HANDLING CART ITEM QUANTITY --------------------

  const handleQtyChange = async (newQty: number) => {
    if (newQty < 1) return;
    setQty(newQty);

    const datas = {
      qty: newQty,
      Itemname: title,
    };

    try {
      const response = await axios.post('/api/increase_qty', datas);
      if (response.status === 200) {
        router.refresh();
      }
    } catch (error) {
      setMessageModal({
        open: true,
        message: 'Server Error! Try again later.',
        severity: 'error',
      });
    }
  };

  // ------------------- HANDLING ITEM REMOVE ----------------------
  const handleItemRemove = async () => {
    try {
      const response = await axios.delete('/api/cart', {
        data: { Itemname: title },
      });

      if (response.status === 200) {
        router.refresh();
      }
    } catch (error) {
      setMessageModal({
        open: true,
        message: 'Server Error! Try again later.',
        severity: 'error',
      });
    }
  };

  return (
    <div className='relative flex flex-col sm:flex-row items-center gap-4 sm:gap-6 bg-gradient-to-r from-white via-gray-50 to-white rounded-2xl shadow-lg p-4 sm:p-6 transition-all w-full'>
      {/* Close button */}
      <button
        onClick={handleItemRemove}
        aria-label='Remove item'
        className='absolute top-3 right-3 rounded-full text-gray-500 hover:text-red-600'
      >
        <span className='text-xl cursor-pointer'>
          <DeleteIcon />
        </span>
      </button>

      {/* Product Image */}
      <img
        src={image}
        alt={title}
        className='w-24 h-24 sm:w-28 sm:h-28 rounded-xl object-cover border border-gray-300 shadow-sm'
      />

      {/* Product Details */}
      <div className='flex-1 text-center sm:text-left'>
        <h3 className='text-lg sm:text-xl font-semibold text-gray-900'>
          {title}
        </h3>
        <p className='mt-1 text-yellow-600 font-bold text-xl sm:text-2xl'>
          {price}/-
        </p>
      </div>

      {/* Quantity Controls */}
      <div className='flex items-center space-x-3'>
        <button
          onClick={() => handleQtyChange(qty - 1)}
          disabled={qty <= 1}
          className='w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-800 font-bold text-lg disabled:opacity-40 disabled:cursor-not-allowed'
          aria-label='Decrease quantity'
        >
          −
        </button>
        <span className='w-8 sm:w-10 text-center font-medium text-base sm:text-lg text-gray-900'>
          {qty}
        </span>
        <button
          onClick={() => handleQtyChange(qty + 1)}
          className='w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-800 font-bold text-lg'
          aria-label='Increase quantity'
        >
          +
        </button>
      </div>

      {/* Snackbar (unchanged) */}
      <Snackbar
        open={messageModal.open}
        autoHideDuration={3000}
        onClose={() => setMessageModal({ ...messageModal, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setMessageModal({ ...messageModal, open: false })}
          severity={messageModal.severity}
          sx={{ width: '100%' }}
        >
          <b>{messageModal.message}</b>
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CartItem;
