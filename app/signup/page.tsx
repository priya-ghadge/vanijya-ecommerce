// src/app/signup/page.tsx

import SignupForm from '../../components/auth/SignupForm'
import Link from 'next/link';

export default function SignupPage() {
  return (
    <div 
      className="flex min-h-screen items-center justify-center p-4"
      // Apply the background color using the fixed style attribute
      style={{ backgroundColor: `rgb(var(--color-background))` }}
    >
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-xl">
        <h1 
          className="text-3xl font-bold mb-6 text-center"
          // Apply the foreground text color
          style={{ color: `rgb(var(--color-foreground))` }}
        >
          Create Your Account
        </h1>
        
        {/* The actual form component */}
        <SignupForm />

        <p className="mt-4 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link href="/login" 
            className="font-medium hover:underline"
            // Apply the primary (Forest Green) color to the link
            style={{ color: `rgb(var(--color-primary))` }}
          >
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
}