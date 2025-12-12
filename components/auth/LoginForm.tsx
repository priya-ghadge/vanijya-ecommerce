// src/components/auth/LoginForm.tsx

'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

const LoginForm: React.FC = () => {
  const { login, isLoading } = useAuth();
  const router = useRouter();

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
      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-base font-semibold text-white transition duration-150 ease-in-out hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        style={{
          backgroundColor: primaryColor,
        }}
      >
        {isLoading ? 'Logging In...' : 'Log In'}
      </button>
    </form>
  );
};

export default LoginForm;