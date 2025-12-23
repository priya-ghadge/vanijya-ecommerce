// src/components/auth/SignupForm.tsx

'use client'; // This must be a Client Component to use hooks (useState, useAuth)

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

const SignupForm: React.FC = () => {
  const { signup, isLoading } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    if (!email || !password) {
      setError('Please fill in both email and password.');
      return;
    }

    try {
      // Call the signup function from AuthContext
      await signup(email, password, name);
      
      // Redirect to the home page or a success page after successful signup
      router.push('/');

    } catch (err: unknown) {
      // Display the specific error message from the backend (e.g., "User already exists.")
      let errorMessage = 'An unexpected error occurred during signup.';
      
      // Safely check if the error object has a 'message' property
      if (err instanceof Error) {
        errorMessage = err.message;
      } else if (typeof err === 'object' && err !== null && 'message' in err) {
        // Handle cases where the error might be an object that includes a message key
        errorMessage = (err as { message: string }).message;
      }
      
      setError(errorMessage);
    }
  };

  // Define the Forest Green and related colors using the style helper
  const foregroundColor = `rgb(var(--color-foreground))`;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name Field */}
      <div>
        <label 
          htmlFor="name" 
          className="block text-sm font-medium"
          style={{ color: foregroundColor }}
        >
          Name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-[rgb(var(--color-primary))] 
    focus:border-[rgb(var(--color-primary))]"
        />
      </div>

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
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-[rgb(var(--color-primary))] 
    focus:border-[rgb(var(--color-primary))]"
        />
      </div>

      {/* Password Field */}
      <div>
        <label 
          htmlFor="password" 
          className="block text-sm font-medium"
          style={{ color: foregroundColor }}
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-[rgb(var(--color-primary))] 
    focus:border-[rgb(var(--color-primary))]"
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="text-sm p-3 rounded-md bg-red-100 border border-red-400" role="alert">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* Submit Button (Forest Green) */}
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
          {isLoading ? 'Creating Account...' : 'Sign Up'}
          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </span>
      </button>
    </form>
  );
};

export default SignupForm;