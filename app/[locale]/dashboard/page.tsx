// src/app/dashboard/page.tsx

"use client";

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  
  const primaryColor = `rgb(var(--color-primary))`;
  const foregroundColor = `rgb(var(--color-foreground))`;
  const backgroundColor = `rgb(var(--color-background))`;

  // Redirect logic
  useEffect(() => {
    if (!user) {
      // If user is null, redirect to login page
      router.push('/login');
    }
  }, [user, router]);
  
  // Show loading or nothing while redirecting
  if (!user) {
    return (
        <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor }}>
            <h2 style={{ color: foregroundColor }}>Redirecting to Login...</h2>
        </div>
    );
  }

  // Content for logged-in user
  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-8" 
      style={{ backgroundColor }}
    >
      <div className="w-full max-w-lg bg-white p-10 rounded-xl shadow-2xl space-y-6">
        <h1 
          className="text-4xl font-extrabold"
          style={{ color: primaryColor }}
        >
          Welcome to the Dashboard, {user.name || user.email}!
        </h1>
        <p className="text-lg" style={{ color: foregroundColor }}>
          This page is protected and accessible only because your token is valid.
        </p>
        
        <p className="text-sm text-gray-600">
          Your User ID: {user.id}
        </p>

        <button
          onClick={logout}
          className="py-2 px-6 border border-transparent rounded-md shadow-sm text-base font-semibold text-white transition duration-150 ease-in-out hover:shadow-lg"
          style={{ 
            backgroundColor: primaryColor,
          }}
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default DashboardPage;