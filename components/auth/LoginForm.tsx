// src/components/auth/LoginForm.tsx

'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

const LoginForm: React.FC = () => {
  const { login, isLoading } = useAuth();
  const router = useRouter();
  const t = useTranslations('Login')
  const locale = useLocale()
console.log("Current active locale:", locale, t('forgotPassword'))
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter your email and password.');
      return;
    }

    try {
      // Call the login function from AuthContext
      await login(email, password);

      // Redirect to the home page or dashboard after successful login
      router.push('/');

    } catch (err: unknown) {
      // Handle strict TypeScript errors (similar to the Signup form fix)
      let errorMessage = 'Login failed. Please check your credentials.';

      if (err instanceof Error) {
        // The error message might come from the fetch response data if status was non-200
        errorMessage = err.message;
      } else if (typeof err === 'object' && err !== null && 'message' in err) {
        errorMessage = (err as { message: string }).message;
      }

      setError(errorMessage);
    }
  };

  // Define the colors using the style helper variables
  const primaryColor = `rgb(var(--color-primary))`;
  const foregroundColor = `rgb(var(--color-foreground))`;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Email Field */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium"
          style={{ color: foregroundColor }}
        >
          Email Address
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="
            mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
            focus:outline-none focus:ring-2 focus:ring-opacity-50 
            focus:ring-[rgb(var(--color-primary))] focus:border-[rgb(var(--color-primary))]
          "
        />
      </div>

      {/* Password Field */}
      <div className="space-y-2 mb-6">
  <div className="flex justify-between items-end">
    <label className="text-sm font-semibold text-gray-700">Password</label>
    {/* 1. FORGOT PASSWORD moved here for better alignment */}
    <Link 
      href="/forgot-password" 
      className="text-xs font-bold hover:underline"
      style={{ color: primaryColor }}
    >
      {t('forgotPassword')}
    </Link>
  </div>
  <input 
    type="password"
    onChange={(e) => setPassword(e.target.value)}
    required
    className="
            mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
            focus:outline-none focus:ring-2 focus:ring-opacity-50 
            focus:ring-[rgb(var(--color-primary))] focus:border-[rgb(var(--color-primary))]
          "
  />
</div>

      {/* Error Message */}
      {error && (
        <div className="text-sm p-3 rounded-md bg-red-100 border border-red-400" role="alert">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* Submit Button (Forest Green) */}
      {/* --- THE SHINE BUTTON --- */}
<button
  type="submit"
  className="group relative w-full overflow-hidden rounded-xl py-4 font-bold text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-primary/30"
  style={{ backgroundColor: `rgb(var(--color-primary))` }}
>
  {/* The Shine Layer */}
  <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-20deg)]">
    <div className="relative h-full w-10 bg-white/30 transition-all duration-700 group-hover:left-[120%] -left-[100%] shadow-[0_0_20px_rgba(255,255,255,0.5)]"></div>
  </div>

  {/* Button Text */}
  <span className="relative z-10 flex items-center justify-center gap-2">
    {isLoading ? 'Logging in...' : 'Log In'}
    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
    </svg>
  </span>
</button>
    </form>
  );
};

export default LoginForm;