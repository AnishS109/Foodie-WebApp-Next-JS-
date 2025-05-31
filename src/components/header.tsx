'use client';

import { LogoImage } from '@/assets';
import { AppBar, Drawer, Toolbar } from '@mui/material';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import Image from 'next/image';

import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeIcon from '@mui/icons-material/Home';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import InfoIcon from '@mui/icons-material/Info';
import LoginIcon from '@mui/icons-material/Login';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import LogoutIcon from '@mui/icons-material/Logout';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

const Header_Client = () => {
  // ------------------------- FOR FETCHING PATH URL -------------------------------

  const activePage = usePathname();

  // --------------------------- USE STATES --------------------------

  const [drawerOpen, SetDrawerOpen] = useState<boolean>(false);

  // ------------------------------- DATE --------------------------

  const today = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  // ------------------- CHEKING USER LOGGED IN ------------------------

  const { data: session, status } = useSession();
  const email = session?.user?.email;

 if (status === 'loading') {
  return (
    <AppBar sx={{ position: 'sticky', boxShadow: 1 }}>
      <Toolbar
        sx={{
          background: 'black',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: 64,
          px: 2,
        }}
      >
          {/* ------------------------ LOGO AND TITLE ----------------------- */}
          <Link href={'/'}>
            <div className='flex items-center cursor-pointer'>
              <Image height={70} src={LogoImage} alt='Foodie Logo' />

              <p className='text-xl sm:text-2xl md:text-3xl sm:inline-block text-nowrap font-bold tracking-tight'>
                <span className='text-yellow-500'>F</span>oodie
              </p>
            </div>
          </Link>

        {/* Simple placeholder for menu / buttons */}
        <div style={{ width: 500, height: 30, backgroundColor: '#444', borderRadius: 4 }} />
      </Toolbar>
    </AppBar>
  );
}


  // ----------------------- HANDLE LOGOUT ---------------------------

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
  };

  // -------------- HIDING HEADER FROM LOGIN AND SIGNUP PAGE ---------------

  if (activePage == '/login') return null;
  if (activePage == '/signup') return null;

  return (
    <>
      <AppBar sx={{ position: 'sticky', boxShadow: 1 }}>
        <Toolbar
          sx={{
            background: 'black',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: 1,
          }}
        >
          {/* ------------------------ LOGO AND TITLE ----------------------- */}
          <Link href={'/'}>
            <div className='flex items-center cursor-pointer'>
              <Image height={70} src={LogoImage} alt='Foodie Logo' />

              <p className='text-xl sm:text-2xl md:text-3xl sm:inline-block text-nowrap font-bold tracking-tight'>
                <span className='text-yellow-500'>F</span>oodie
              </p>
            </div>
          </Link>

          {/* ------------------------- MENU button FOR MOBILE VIEW --------------------- */}
          <button
            onClick={() => SetDrawerOpen(true)}
            className='text-white w-fit mr-[-15px]'
          >
            <MenuIcon
              sx={{
                display: { xs: 'block', md: 'none', xl: 'none' },
                fontSize: { xs: '30px', sm: '33px' },
                cursor: 'pointer',
              }}
            />
          </button>

          <div className='hidden md:flex justify-between gap-24'>
            {/* ----------------------------- WEB APPLICATION PAGES ----------------------- */}
            <div className='flex justify-between items-center md:gap-10'>
              <Link href={'/'}>
                <div
                  className={` text-nowrap ${
                    activePage === '/' ? 'text-yellow-500' : 'text-white'
                  } text-[17px] font-bold border-none transition-all btn-line-animation cursor-pointer`}
                >
                  Home
                </div>
              </Link>
              <Link href={'/about'}>
                <div
                  className={` ${
                    activePage === '/about' ? 'text-yellow-500' : 'text-white'
                  } text-nowrap text-[17px] font-bold border-none transition-all btn-line-animation  cursor-pointer`}
                >
                  About
                </div>
              </Link>
              <Link href={'/contact'}>
                <div
                  className={` ${
                    activePage === '/contact' ? 'text-yellow-500' : 'text-white'
                  } text-nowrap text-[17px] font-bold border-none transition-all btn-line-animation  cursor-pointer`}
                >
                  Contact
                </div>
              </Link>
            </div>
            {/* ------------------------- LOGIN SIGNUP button -------------------------- */}
            <div className={`${email ? 'hidden' : 'block'} flex gap-4`}>
              <Link href={'/login'}>
                <button
                  className={`${
                    activePage === '/login'
                      ? 'text-yellow-500 border-yellow-500 border-1'
                      : 'text-white'
                  } font-bold text-lg cursor-pointer border-white border-1 px-3 py-1 rounded-full hover:text-black hover:bg-white transition-all`}
                >
                  Login
                </button>
              </Link>

              <Link href={'/signup'}>
                <button
                  className={`${
                    activePage === '/signup'
                      ? 'text-yellow-500 border-yellow-500 border-1'
                      : 'text-white'
                  } font-bold text-lg cursor-pointer border-white border-1 px-3 py-1 rounded-full hover:text-black hover:bg-white transition-all`}
                >
                  Sing Up
                </button>
              </Link>
            </div>
            {/* -------------------------- LOGOUT AND CART button ------------------------- */}
            <div className={`${!email ? 'hidden' : 'block'} flex gap-4`}>
              <Link href={'/cart'}>
                <button className={`${activePage === "/cart" ? "border-yellow-500 text-yellow-500" : "border-white text-white"} font-bold text-lg cursor-pointer border-1 px-3 py-1 rounded-full hover:text-black hover:bg-white transition-all`}>
                  Cart{' '}
                  <span>
                    <ShoppingCartIcon />
                  </span>
                </button>
              </Link>
              <button
                onClick={handleLogout}
                className='font-bold text-lg cursor-pointer border-white border-1 px-3 py-1 rounded-full hover:text-black hover:bg-white transition-all'
              >
                Logout
              </button>
            </div>
          </div>
        </Toolbar>
      </AppBar>

      {/* ------------------------------- MOBILE VIEW ---------------------------------- */}
      {/* ------------------------------- MOBILE VIEW ---------------------------------- */}
      {/* ------------------------------- MOBILE VIEW ---------------------------------- */}

      <Drawer
        anchor='right'
        open={drawerOpen}
        onClose={() => SetDrawerOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: { xs: '240px', sm: '300px' },
            background: 'black',
            color: 'white',
          },
        }}
      >
        {/* -------------------------------- LOGO AND TITLE ------------------------------ */}
        <div className='flex items-center justify-center mr-6'>
          <Image
            className='h-[80px] w-[80px]'
            src={LogoImage}
            alt='Mock Ninja logo'
          />

          <p className='text-xl sm:text-2xl md:text-3xl sm:inline-block text-nowrap font-[roboto] font-extrabold tracking-tight'>
            Pawar Gym
          </p>
        </div>
        <div className='px-4 h-1 w-full'>
          <div className='border-b-2 border-gray-500 h-1 w-full'></div>
        </div>

        {/* --------------------------------- WEB PAGES -------------------------  */}
        <div className='flex flex-col gap-4 mt-16 mx-10'>
          <Link href={'/'}>
            <button
              className={` font-bold px-3 py-1 shadow-none w-full flex justify-center items-center gap-1 pr-[68px] text-[15px] hover:rounded-[20px] rounded-[20px] ${
                activePage === '/a' || activePage === '/a'
                  ? 'bg-white text-black'
                  : 'border-white border-1 text-white'
              }`}
            >
              <span>
                <HomeIcon />
              </span>
              <span>Home</span>
            </button>
          </Link>

          <Link href={'/about'}>
            <button
              className={` font-bold px-3 py-1 shadow-none w-full flex justify-center items-center gap-1 pr-[68px] text-[15px] hover:rounded-[20px] rounded-[20px] ${
                activePage === '/a' || activePage === '/a'
                  ? 'bg-white text-black'
                  : 'border-white border-1 text-white'
              }`}
            >
              <span>
                <InfoIcon />
              </span>
              <span>About</span>
            </button>
          </Link>

          <Link href={'/contact'}>
            <button
              className={` font-bold px-3 py-1 shadow-none w-full flex justify-center items-center gap-1 pr-[68px] text-[15px] hover:rounded-[20px] rounded-[20px] ${
                activePage === '/a' || activePage === '/a'
                  ? 'bg-white text-black'
                  : 'border-white border-1 text-white'
              }`}
            >
              <span>
                <PermContactCalendarIcon />
              </span>
              <span>Contact</span>
            </button>
          </Link>
          {/* --------------------------- LOGIN AND SIGNUP BUTTON --------------------------- */}

          <Link href={'/login'} className={`${email ? 'hidden' : 'block'}`}>
            <button
              className={`mt-10 font-bold px-3 py-1 shadow-none w-full flex justify-center items-center gap-1 pr-[68px] text-[15px] hover:rounded-[20px] rounded-[20px] ${
                activePage === '/none/anish' || activePage === '/none/anish'
                  ? 'bg-white text-black'
                  : ' text-white'
              }`}
            >
              <span>
                <LoginIcon />
              </span>
              <span>Login</span>
            </button>
          </Link>

          <Link href={'/signup'} className={`${email ? 'hidden' : 'block'}`}>
            <button
              className={` font-bold px-3 py-1 shadow-none w-full flex justify-center items-center gap-1 pr-[68px] text-[15px] hover:rounded-[20px] rounded-[20px] ${
                activePage === '/none/anish' || activePage === '/none/anish'
                  ? 'bg-white text-black'
                  : ' text-white'
              }`}
            >
              <span>
                <ExitToAppIcon />
              </span>
              <span>Sing Up</span>
            </button>
          </Link>

          {/* ------------------------------- CART AND LOGOUT BUTTON ------------------------ */}

          <Link href={'/cart'} className={`${!email ? 'hidden' : 'block'}`}>
            <button
              className={` font-bold px-3 py-1 shadow-none w-full flex justify-center items-center gap-1 pr-[68px] text-[15px] hover:rounded-[20px] rounded-[20px] ${
                activePage === '/none/anish' || activePage === '/none/anish'
                  ? 'bg-white text-black'
                  : ' text-white'
              }`}
            >
              <span>
                <ShoppingCartIcon />
              </span>
              <span>Cart</span>
            </button>
          </Link>

          <button
            onClick={handleLogout}
            className={`${
              !email ? 'hidden' : 'block'
            } font-bold px-3 py-1 shadow-none w-full flex justify-center items-center gap-1 pr-[68px] text-[15px] hover:rounded-[20px] rounded-[20px] ${
              activePage === '/none/anish' || activePage === '/none/anish'
                ? 'bg-white text-black'
                : ' text-white'
            }`}
          >
            <span>
              <LogoutIcon />
            </span>
            <span>Logout</span>
          </button>
        </div>

        {/* -------------------------------------- DATE SECTION ---------------------------- */}

        <div className='px-4 h-1 w-full mt-6 absolute bottom-0 mb-16'>
          <div className='border-b-2 border-gray-500 h-1 w-full'></div>
        </div>

        <div className='absolute bottom-0 ml-18 sm:ml-16 mb-5'>
          <p className='text-white font-bold text-[16px] sm:text-[18px]'>
            {today}
          </p>
        </div>
      </Drawer>
    </>
  );
};

export default Header_Client;
