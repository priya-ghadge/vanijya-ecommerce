// src/app/login/page.tsx

import LoginForm from '../../components/auth/LoginForm';
import Link from 'next/link';

export default function LoginPage() {
  // Define foreground and background colors using the style attribute fix
  const foregroundColor = `rgb(var(--color-foreground))`;
  const backgroundColor = `rgb(var(--color-background))`;
  const primaryColor = `rgb(var(--color-primary))`;

  return (
    <div
      className="flex min-h-screen items-center justify-center p-4"
      style={{ backgroundColor: backgroundColor }}
    >
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-xl">
        <h1
          className="text-3xl font-bold mb-6 text-center"
          style={{ color: foregroundColor }}
        >
          Welcome Back
        </h1>

        {/* The actual form component */}
        <LoginForm />

        <p className="mt-4 text-center text-sm text-gray-500">
          Don&apos;t have an account?{' '}
          <Link href="/signup"
            className="font-medium hover:underline"
            style={{ color: primaryColor }}
          >
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
}