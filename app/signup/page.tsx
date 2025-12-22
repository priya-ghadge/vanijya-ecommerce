"use client";

import React from 'react';
import SignupForm from '@/components/auth/SignupForm';
import Link from 'next/link';
import Image from 'next/image';

const SignupPage: React.FC = () => {
  const primaryColor = `rgb(var(--color-primary))`;

  // Ultra-stable IDs for Grains and Farmers
  const images = [
    { src: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80", alt: "Farmer" },
    { src: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80", alt: "Agriculture" },
    { src: "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?q=80", alt: "Farmer" },
    { src: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80", alt: "Market Harvest" }, // New stable ID
  ];

  return (
    <div className="relative min-h-screen w-full flex items-center overflow-hidden bg-gray-00">
      
      {/* --- LAYER 1: THE UNIFIED BACKGROUND COLLAGE --- */}
      <div className="absolute inset-0 z-0 animate-ken-burns">
        <div className="grid grid-cols-2 md:grid-cols-4 h-full w-full gap-1">
          {images.map((img, idx) => (
            <div key={idx} className="relative h-full w-full opacity-40">
              <Image 
                src={img.src} 
                alt={img.alt} 
                fill 
                className="object-cover" 
                sizes="25vw"
                priority={idx < 2}
              />
            </div>
          ))}
        </div>
      </div>

      {/* --- LAYER 2: UNIFIED OVERLAY --- */}
      {/* This creates a smooth transition from dark to light across the whole screen */}
      <div 
        className="absolute inset-0 z-10"
        style={{ 
          background: `linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.8) 100%)` 
        }}
      ></div>

      {/* --- LAYER 3: FLOATING SIGNUP CARD (Left Aligned) --- */}
      <main className="relative z-20 w-full flex justify-start px-6 md:px-20 lg:px-32">
        <div className="w-full max-w-md bg-white/95 backdrop-blur-xl rounded-[2.5rem] shadow-[0_32px_64px_-15px_rgba(0,0,0,0.5)] p-10 lg:p-14 border border-white/20">
          <div className="mb-10">
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">Join Vanijya</h1>
            <p className="mt-3 text-gray-500 font-medium italic">
              Empowering local craftsmanship.
            </p>
          </div>

          <SignupForm />

          <div className="mt-8 text-center text-sm border-t border-gray-100 pt-8">
            <span className="text-gray-500">Already a member?</span>{' '}
            <Link href="/login" className="font-bold hover:underline ml-1" style={{ color: primaryColor }}>
              Log In
            </Link>
          </div>
        </div>
      </main>

      {/* Optional: Right-side Branding (Now just text floating on background) */}
      <div className="hidden lg:flex absolute right-20 top-1/2 -translate-y-1/2 z-20 max-w-sm flex-col">
        <h2 className="text-5xl font-bold text-white mb-6 leading-tight">Authentic. <br/> Local. <br/> Direct.</h2>
        <div className="h-1 w-20 rounded-full mb-6" style={{ backgroundColor: primaryColor }}></div>
        <p className="text-white/70 text-lg">
          By joining, you help shorten the distance between the farm and the table.
        </p>
      </div>

      <style jsx global>{`
        @keyframes kenburns {
          0% { transform: scale(1); }
          50% { transform: scale(1.08); }
          100% { transform: scale(1); }
        }
        .animate-ken-burns {
          animation: kenburns 40s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default SignupPage;