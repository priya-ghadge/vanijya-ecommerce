"use client";

import React from 'react';
import LoginForm from '@/components/auth/LoginForm';
import Link from 'next/link';
import Image from 'next/image';
import {useTranslations} from 'next-intl'

const LoginPage: React.FC = () => {
  const primaryColor = `rgb(var(--color-primary))`;
  const t = useTranslations('Login')
  console.log(t('createAccount'))

  // Only using the 4 images that are confirmed working
  const images = [
    { src: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80", alt: "Spices" },
    { src: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80", alt: "Grains" },
    { src: "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?q=80", alt: "Farmer" },
    { src: "https://images.unsplash.com/photo-1581600140682-d4e68c8cde32?q=80", alt: "Pottery" },
  ];

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      
      {/* --- LAYER 1: ANIMATED PRODUCT COLLAGE (Optimized for 4 items) --- */}
      <div className="absolute inset-0 z-0 animate-ken-burns opacity-60">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 h-full w-full">
          
          {/* Spices - Large Vertical */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl col-span-1 md:col-span-1 row-span-2">
            <Image src={images[0].src} alt={images[0].alt} fill className="object-cover" priority />
          </div>
          
          {/* Grains - Top Wide */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl col-span-1 md:col-span-2">
            <Image src={images[1].src} alt={images[1].alt} fill className="object-cover" priority />
          </div>
          
          {/* Farmer - Large Square/Vertical */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl col-span-1 md:col-span-1 row-span-2">
            <Image src={images[2].src} alt={images[2].alt} fill className="object-cover" />
          </div>

          {/* Pottery - Bottom Wide */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl col-span-1 md:col-span-2">
            <Image src={images[3].src} alt={images[3].alt} fill className="object-cover" />
          </div>

        </div>
      </div>

      {/* --- LAYER 2: DEPTH OVERLAY --- */}
      <div 
        className="absolute inset-0 z-10 backdrop-blur-[2px]"
        style={{ background: `radial-gradient(circle at center, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.8) 100%)` }}
      ></div>

      {/* --- LAYER 3: THE LOGIN CARD --- */}
      <main className="relative z-20 w-full max-w-md px-6">
        <div className="bg-white/95 backdrop-blur-xl rounded-[2.5rem] shadow-[0_32px_64px_-15px_rgba(0,0,0,0.6)] p-10 lg:p-14 border border-white/20">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2">Vanijya</h1>
            <p className="text-gray-500 font-medium">Your local marketplace awaits</p>
          </div>

          <LoginForm />

          <div className="mt-8 pt-6 border-t border-gray-100">
            {/* Flex ensures these stay on one line unless the screen is tiny */}
            <div className="flex items-center justify-center gap-2 text-sm">
              <span className="text-gray-500 whitespace-nowrap">{t('newUser')}</span>
              <Link href="/signup" className="font-bold hover:underline" style={{ color: primaryColor }}>
                {t('createAccount')}
              </Link>
            </div>

            {/* SECONDARY LINKS (About, Help, Terms) */}
            <div className="mt-6 flex justify-center items-center gap-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              <Link href="/about" className="hover:text-gray-600">About</Link>
              <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
              <Link href="/help" className="hover:text-gray-600">Help</Link>
              <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
              <Link href="/terms" className="hover:text-gray-600">Terms</Link>
            </div>
          </div>
        </div>
        
        {/* Subtle Bottom Page Footer */}
        <p className="mt-8 text-center text-white/40 text-[10px] uppercase tracking-[0.3em]">
          © 2025 Vanijya Marketplace • Secure Encrypted Login
        </p>
      </main>

      <style jsx global>{`
        @keyframes kenburns {
          0% { transform: scale(1); }
          50% { transform: scale(1.12); }
          100% { transform: scale(1); }
        }
        .animate-ken-burns {
          animation: kenburns 45s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default LoginPage;