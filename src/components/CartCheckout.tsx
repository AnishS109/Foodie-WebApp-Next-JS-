'use client';

import { Alert, CircularProgress, Snackbar } from '@mui/material';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

interface CartCheckoutProps {
  totalAmount: number;
}


interface modalType {
  open: boolean;
  message: string;
  severity: any;
}

const CartCheckout: React.FC<CartCheckoutProps> = ({ totalAmount }) => {
  // ------------- CHECKING USER LOGGED IN ------------------

  const { data: session, status } = useSession();

  // ---------------- FOR NAVIGATION ----------------

  const router = useRouter();

  // ------------------- USE STATES ---------------

  const [orderStage, setOrderStage] = useState<
    'none' | 'placing' | 'placed' 
  >('none');
    const [messageModal, setMessageModal] = useState<modalType>({
      open: false,
      message: '',
      severity: 'success',
    });

  // ----------- PRIVATE ROUTE LOGIC ------------------

  if (status === 'loading' || status === 'unauthenticated') {
    router.replace('/login');
    return (
      <div className='h-screen w-screen flex justify-center items-center'>
        <CircularProgress sx={{ color: 'black' }} size={35} />
      </div>
    );
  }

  // ------------------ PLACE ORDER --------------------

  const handlePlaceOrder = async () => {
    setOrderStage('placing');

    try {
      const response = await fetch('/api/increase_qty', {
        method: 'DELETE',
      });

      if (response.status === 200) {
        setOrderStage('placed');

        setTimeout(() => {
          router.push('/');
        }, 2000);
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
    <div className='bg-white rounded-2xl shadow-lg p-6 h-fit sticky top-20 mb-[30vh]'>
      {orderStage !== 'none' && (
        <div className='fixed inset-0 z-50 bg-white flex items-center justify-center flex-col transition-opacity duration-500'>
          {orderStage === 'placing' && (
            <div className='text-2xl font-semibold text-yellow-600 animate-pulse text-center'>
              ⏳ Your order is placing...
            </div>
          )}
          {orderStage === 'placed' && (
            <div className='text-2xl font-semibold text-green-600 animate-pulse text-center'>
              🎉 Your order has been placed! 
            </div>
          )}
        </div>
      )}

      <h3 className='text-xl font-semibold text-gray-800 mb-4'>
        Order Summary
      </h3>
      <div className='flex justify-between mb-2 text-gray-700'>
        <span>Subtotal</span>
        <span>{totalAmount}/-</span>
      </div>
      <div className='flex justify-between mb-4 text-gray-700'>
        <span>Shipping</span>
        <span className='text-green-600'>Free</span>
      </div>
      <hr className='my-4' />
      <div className='flex justify-between text-lg font-bold text-gray-900'>
        <span>Total</span>
        <span>{totalAmount}/-</span>
      </div>
      <button
        disabled={totalAmount === 0}
        onClick={handlePlaceOrder}
        className='mt-6 w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 rounded-xl transition'
      >
        Proceed to Checkout
      </button>

      {/* -------------------------- SNACKBAR FOR MESSAGES ------------------------- */}

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

export default CartCheckout;
