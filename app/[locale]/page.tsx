"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const LandingPage = () => {
  const primaryColor = `rgb(var(--color-primary))`;

  const categories = [
    { name: "Hand-loomed Textiles", img: "https://images.unsplash.com/photo-1590736704728-f4730bb3c3af?q=80", span: "col-span-2 row-span-2" },
    { name: "Organic Grains", img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80", span: "col-span-1 row-span-1" },
    { name: "Hand-pressed Oils", img: "https://images.unsplash.com/photo-1627916607164-7b20241db935?q=80", span: "col-span-1 row-span-1" },
    { name: "Artisanal Pottery", img: "https://images.unsplash.com/photo-1581600140682-d4e68c8cde32?q=80", span: "col-span-2 row-span-1" },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-emerald-100">
      
      {/* --- NAVBAR --- */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="text-2xl font-black tracking-tighter" style={{ color: primaryColor }}>VANIJYA.</div>
          <div className="hidden md:flex gap-8 text-sm font-bold uppercase tracking-widest text-gray-500">
            <Link href="/shop" className="hover:text-black">Shop</Link>
            <Link href="/artisans" className="hover:text-black">Artisans</Link>
            <Link href="/about" className="hover:text-black">Our Story</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-bold px-6 py-2">Login</Link>
            <Link 
              href="/signup" 
              className="text-sm font-bold px-6 py-3 rounded-full text-white shadow-lg hover:opacity-90 transition-all"
              style={{ backgroundColor: primaryColor }}
            >
              Join the Market
            </Link>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-[10px] font-bold uppercase tracking-widest mb-6">
              <span className="flex h-2 w-2 rounded-full animate-pulse" style={{ backgroundColor: primaryColor }}></span>
              Direct from Rural Bharat
            </div>
            <h1 className="text-6xl lg:text-8xl font-black leading-[0.9] tracking-tighter mb-8 text-gray-900">
              Authentic. <br/> 
              <span style={{ color: primaryColor }}>Crafted.</span> <br/>
              Direct.
            </h1>
            <p className="text-xl text-gray-500 max-w-md leading-relaxed mb-10">
              Skip the middlemen. Vanijya connects you directly to verified local producers, bringing the heritage of rural India to your doorstep.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
                <button className="group relative overflow-hidden px-8 py-4 rounded-full bg-black text-white font-bold transition-all hover:pr-12">
                    Explore Collection
                    <span className="absolute right-4 opacity-0 group-hover:opacity-100 transition-all">→</span>
                </button>
                <button className="px-8 py-4 rounded-full border-2 border-gray-200 font-bold hover:bg-gray-50 transition-all">
                    Meet the Producers
                </button>
            </div>
          </div>

          {/* Hero Image Collage (Small Version of Login Style) */}
          <div className="relative h-[500px] w-full animate-ken-burns">
             <div className="absolute inset-0 grid grid-cols-2 gap-4">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl mt-12">
                    <Image src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80" fill className="object-cover" alt="Farmer" />
                </div>
                <div className="relative rounded-3xl overflow-hidden shadow-2xl mb-12">
                    <Image src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80" fill className="object-cover" alt="Spices" />
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* --- STATS BAR --- */}
      <section className="bg-gray-50 py-12 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
                { label: "Verified Artisans", val: "2,500+" },
                { label: "Rural Districts", val: "48" },
                { label: "Direct-to-Home", val: "100%" },
                { label: "Fair Trade", val: "Guaranteed" }
            ].map((stat, i) => (
                <div key={i} className="text-center md:text-left">
                    <div className="text-2xl font-black" style={{ color: primaryColor }}>{stat.val}</div>
                    <div className="text-xs uppercase tracking-widest text-gray-400 font-bold mt-1">{stat.label}</div>
                </div>
            ))}
        </div>
      </section>

      {/* --- CATEGORY MASONRY --- */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
                <h2 className="text-4xl font-black tracking-tight">Browse by Category</h2>
                <p className="text-gray-500 mt-2">Carefully curated selections from across the country.</p>
            </div>
            <Link href="/shop" className="font-bold border-b-2 border-black pb-1">View All Categories</Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[250px]">
            {categories.map((cat, i) => (
                <div key={i} className={`group relative rounded-[2rem] overflow-hidden ${cat.span} bg-gray-100 shadow-xl transition-transform hover:scale-[1.01]`}>
                    <Image src={cat.img} fill className="object-cover transition-transform duration-700 group-hover:scale-110" alt={cat.name} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                    <div className="absolute bottom-8 left-8">
                        <h3 className="text-white text-xl font-bold">{cat.name}</h3>
                        <p className="text-white/60 text-sm mt-1">Explore →</p>
                    </div>
                </div>
            ))}
        </div>
      </section>

      {/* --- KEYFRAMES --- */}
      <style jsx global>{`
        @keyframes kenburns {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        .animate-ken-burns {
          animation: kenburns 30s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;