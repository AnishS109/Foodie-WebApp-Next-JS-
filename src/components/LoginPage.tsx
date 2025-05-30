'use client';

import { LogoImage } from '@/assets';
import Image from 'next/image';
import GoogleIcon from '@mui/icons-material/Google';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useRouter } from 'next/navigation';
import { signIn } from "next-auth/react";


const LoginPage = () => {
  // ---------------- FOR NAVIGATION ---------------------

  const router = useRouter();

  // ------------------ GOOGLE LOGIN BUTTON --------------------

  const handleGoogleLogin = async () => {
    await signIn('google',{ callbackUrl: '/' })
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
        <button onClick={handleGoogleLogin} className='w-full flex items-center justify-center gap-2 bg-white text-gray-700 border border-gray-300 rounded-lg py-2 hover:shadow-md transition'>
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
          placeholder='Email'
          className='w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
        />

        {/* Password Input */}
        <input
          type='password'
          placeholder='Password'
          className='w-full mb-6 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
        />

        {/* Login Button */}
        <button className='w-full bg-gray-700 hover:bg-black cursor-pointer text-white font-semibold py-2 rounded-lg transition'>
          Login
        </button>

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
    </div>
  );
};

export default LoginPage;
