'use client';

import LoginPromptModal from '@/components/loginModal';
import { CardBody, CardContainer, CardItem } from '@/components/ui/3d-card';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { prisma } from '@/lib/prisma';
import { Alert, Snackbar } from '@mui/material';
import axios from 'axios';

interface CardData {
  title: string;
  image: string;
  price: string;
}

interface modalType {
  open: boolean;
  message: string;
  severity: any;
}

const Card = ({ data }: { data: CardData }) => {
  // ------------- CHECKING USER LOGGED IN --------------

  const { data: session } = useSession();

  // ---------------- USE STATES -----------------

  const [open, setOpen] = useState(false);
  const [messageModal, setMessageModal] = useState<modalType>({
    open: false,
    message: '',
    severity: 'success',
  });

  // ----------------- HANDLING ADD TO CART -----------------

  const handleCart = async () => {
    if (!session?.user?.email) {
      setOpen(true);
      return;
    }

    const datas = {
      Itemname: data.title,
      cartOwner: session.user.email,
    };

    try {
      const response = await axios.post('api/cart', datas);
      if (response.status === 200) {
        setMessageModal({
          open: true,
          message: response.data.msg,
          severity: 'success',
        });
      }
    } catch (error:any) {
      setMessageModal({
        open: true,
        message: error.response.data.msg,
        severity: 'error',
      });
    }
  };

  return (
    <>
      <CardContainer
        className='bg-white rounded-xl shadow-lg p-6'
        containerClassName='mt-[-120px]'
      >
        <CardBody className='relative h-[400px] w-[400px]'>
          {/* Image */}
          <CardItem translateZ={80} className='w-full h-[300px]'>
            <img
              src={`/${data.image}`}
              alt={data.title}
              className='w-full h-full object-cover rounded-xl shadow-md'
            />
          </CardItem>

          {/* Title */}
          <CardItem
            className='text-center text-xl font-bold mt-4'
            translateZ={50}
            rotateZ={5}
          >
            {data.title}
          </CardItem>

          {/* Add to Cart */}
          <CardItem translateZ={30} className='flex justify-center mt-6'>
            <button
              onClick={handleCart}
              className='bg-yellow-500 hover:bg-black cursor-pointer text-white font-semibold py-2 px-6 rounded-full transition duration-200'
            >
              Add to Cart <AddShoppingCartIcon className='ml-2' />
            </button>
          </CardItem>

          {/* Price - Bottom Right */}
          <CardItem
            translateZ={20}
            className='absolute bottom-4 right-4 text-lg font-semibold text-yellow-600'
          >
            ₹{data.price}
          </CardItem>
        </CardBody>
      </CardContainer>
      <LoginPromptModal open={open} onClose={() => setOpen(false)} />
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
    </>
  );
};

export default Card;
