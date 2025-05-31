'use client';

import { LogoImage } from '@/assets';
import Image from 'next/image';
import GoogleIcon from '@mui/icons-material/Google';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { FormEvent, useState } from 'react';
import { Alert, CircularProgress, Snackbar } from '@mui/material';

interface LoginType {
  email: string;
  password: string;
}

interface modalType {
  open: boolean;
  message: string;
  severity: any;
}

const LoginPage = () => {
  // ---------------- FOR NAVIGATION ---------------------

  const router = useRouter();

  // ------------------ GOOGLE LOGIN BUTTON --------------------

  const handleGoogleLogin = async () => {
    await signIn('google', { callbackUrl: '/' });
  };

  // ------------------------ USE STATES -----------------------

  const [datas, setDatas] = useState<LoginType>({
    email: '',
    password: '',
  });
  const [messageModal, setMessageModal] = useState<modalType>({
    open: false,
    message: '',
    severity: 'success',
  });
  const [load, setLoad] = useState<boolean>(false);

  // ------------------- HANDLE CHANGE -------------------------

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setDatas({ ...datas, [name]: value });
  };

  // -------------------- HANDLE SUBMIT ------------------------

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!datas.email.trim().includes('@gmail.com')) {
      setMessageModal({
        open: true,
        message: 'Enter valid email',
        severity: 'error',
      });
      return;
    }

    if (!datas.email.trim() || !datas.password.trim()) {
      setMessageModal({
        open: true,
        message: 'All fields are required',
        severity: 'error',
      });
      return;
    }

    try {
      setLoad(true);
      const response = await signIn('credentials', {
        redirect: false,
        email: datas.email,
        password: datas.password,
      });

      if (response?.ok) {
        router.push('/');
        router.refresh();
      } else {
        setMessageModal({
          open: true,
          message: 'Invalid username or password!',
          severity: 'error',
        });
      }
    } catch (error) {
      setMessageModal({
        open: true,
        message: 'Server Error! Try again later.',
        severity: 'error',
      });
    } finally {
      setLoad(false);
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-100 to-black px-4 relative'>
      {/* Back Button */}
      <button
        onClick={() => router.push('/')}
        className='absolute top-6 left-6 flex items-center text-black hover:text-gray-700 transition'
      >
        <ArrowBackIosNewIcon fontSize='small' />
        <span className='ml-1 font-medium'>Home</span>
      </button>

      <div className='bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md'>
        {/* Title and Logo */}
        <div className='flex flex-col items-center mb-6'>
          <Image src={LogoImage} alt='Foodie Logo' className='w-28 h-24 mb-2' />
          <h1 className='text-3xl font-bold text-black'>Foodie</h1>
        </div>

        {/* Google Login Button */}
        <button
          onClick={handleGoogleLogin}
          className='w-full flex items-center justify-center gap-2 bg-white text-gray-700 border border-gray-300 rounded-lg py-2 hover:shadow-md transition'
        >
          <GoogleIcon />
          <span>Continue with Google</span>
        </button>

        <div className='flex items-center my-4'>
          <hr className='flex-grow border-t border-gray-300' />
          <span className='mx-3 text-gray-400 text-sm'>or</span>
          <hr className='flex-grow border-t border-gray-300' />
        </div>

        {/* Email Input */}
        <input
          type='email'
          value={datas.email}
          onChange={handleChange}
          name='email'
          placeholder='Email'
          className='w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
        />

        {/* Password Input */}
        <input
          type='password'
          value={datas.password}
          onChange={handleChange}
          name='password'
          placeholder='Password'
          className='w-full mb-6 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
        />

        {/* Login Button */}
        {load ? (
          <div className='flex justify-center'>
            <CircularProgress size={35} sx={{ color: 'black' }} />
          </div>
        ) : (
          <button
            onClick={handleSubmit}
            className='w-full bg-gray-700 hover:bg-black cursor-pointer text-white font-semibold py-2 rounded-lg transition'
          >
            Login
          </button>
        )}

        <p className='text-center mt-3'>
          Don't have an account?{' '}
          <span
            onClick={() => router.push('/signup')}
            className='underline cursor-pointer'
          >
            signup
          </span>
        </p>
      </div>

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

export default LoginPage;
