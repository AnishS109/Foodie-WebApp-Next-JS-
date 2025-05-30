'use client';

import { LogoImage } from '@/assets';
import Image from 'next/image';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { Alert, CircularProgress, Snackbar } from '@mui/material';
import axios from 'axios';

interface SignupData {
  email: string;
  password: string;
  confirmPassword: string;
}

interface modalType {
  open: boolean;
  message: string;
  severity: any;
}

const SignupPage = () => {
  // ------------------ FOR NAVIGATION ----------------------

  const router = useRouter();

  // ------------------- USE STATES -------------------------

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [datas, setDatas] = useState<SignupData>({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [messageModal, setMessageModal] = useState<modalType>({
    open: false,
    message: '',
    severity: 'success',
  });
  const [load, setLoad] = useState<boolean>(false)

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

    if (
      !datas.email.trim() ||
      !datas.password.trim() ||
      !datas.confirmPassword.trim()
    ) {
      setMessageModal({
        open: true,
        message: 'All fields are required',
        severity: 'error',
      });
      return;
    }

    if (datas.password !== datas.confirmPassword) {
      setMessageModal({
        open: true,
        message: 'Confirm password is not same',
        severity: 'error',
      });
      return;
    }

    const serverData = {
      email: datas.email.trim(),
      password: datas.password.trim(),
    };

    try {
      setLoad(true)
      const response = await axios.post('/api/auth/signup', serverData);
      if (response.status === 201) {
        setMessageModal({
          open: true,
          message: response.data.msg,
          severity: 'success',
        });
        setTimeout(() => {
          router.push('/login');
        }, 200);
      }
    } catch (error: any) {
      setMessageModal({
        open: true,
        message: error?.response?.data?.msg || 'Something went wrong',
        severity: 'error',
      });
    } finally {
      setLoad(false)
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
          <h1 className='text-3xl font-bold text-black'>Create Account</h1>
        </div>

        {/* Email Input */}
        <input
          type='email'
          value={datas.email}
          name='email'
          onChange={handleChange}
          placeholder='Email'
          className='w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
        />

        {/* Password Input */}
        <div className='relative mb-4'>
          <input
            type={showPassword ? 'text' : 'password'}
            value={datas.password}
            name='password'
            onChange={handleChange}
            placeholder='Password'
            className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
          />
          <button
            type='button'
            onClick={() => setShowPassword(!showPassword)}
            className='absolute right-3 top-2.5 text-gray-500 hover:text-black'
          >
            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </button>
        </div>

        {/* Confirm Password Input */}
        <div className='relative mb-6'>
          <input
            type={showConfirm ? 'text' : 'password'}
            value={datas.confirmPassword}
            name='confirmPassword'
            onChange={handleChange}
            placeholder='Confirm Password'
            className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
          />
          <button
            type='button'
            onClick={() => setShowConfirm(!showConfirm)}
            className='absolute right-3 top-2.5 text-gray-500 hover:text-black'
          >
            {showConfirm ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </button>
        </div>

        {/* Signup Button */}
        {load ? (
          <div className='flex justify-center'>
          <CircularProgress sx={{color:"black"}} size={35}/>
          </div>
        ) : (
        <button onClick={handleSubmit} className='w-full bg-gray-700 hover:bg-black cursor-pointer text-white font-semibold py-2 rounded-lg transition'>
          Sign Up
        </button>
        )}


        <p className='text-center mt-3'>
          Already have an account?{' '}
          <span
            onClick={() => router.push('/login')}
            className='underline cursor-pointer'
          >
            Login
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

export default SignupPage;
