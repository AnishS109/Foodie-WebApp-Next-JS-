'use client';

import { LogoImage } from '@/assets';
import { Facebook, Instagram, Twitter, LinkedIn } from '@mui/icons-material';
import Image from 'next/image';

const Footer_Client = () => {
  return (
    <footer className="bg-black text-white py-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Logo and Brand */}
        <div className="flex items-center gap-3">
          <Image src={LogoImage} alt="Foodie Logo" width={60} height={60} className="object-contain" />
          <span className="text-3xl font-extrabold tracking-tight">Foodie</span>
        </div>

        {/* Navigation Links */}
        <nav className="flex gap-6 text-sm sm:text-base font-medium">
          <a href="/" className="hover:text-primary transition-colors">Home</a>
          <a href="/about" className="hover:text-primary transition-colors">About</a>
          <a href="/contact" className="hover:text-primary transition-colors">Contact</a>
        </nav>

        {/* Social Media Icons */}
        <div className="flex gap-4">
          <a target="_blank" rel="noopener noreferrer" className="hover:text-primary cursor-pointer transition-colors">
            <Facebook sx={{ fontSize: 28 }} />
          </a>
          <a target="_blank" rel="noopener noreferrer" className="hover:text-primary cursor-pointer transition-colors">
            <Instagram sx={{ fontSize: 28 }} />
          </a>
          <a target="_blank" rel="noopener noreferrer" className="hover:text-primary cursor-pointer transition-colors">
            <Twitter sx={{ fontSize: 28 }} />
          </a>
          <a target="_blank" rel="noopener noreferrer" className="hover:text-primary cursor-pointer transition-colors">
            <LinkedIn sx={{ fontSize: 28 }} />
          </a>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} <span className="font-semibold text-white">Foodie</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer_Client;
