// src/context/AuthContext.tsx
"use client";
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import jwt from 'jsonwebtoken'
// Define the shape of the user data we store
interface User {
  id: string;
  email: string;
  name: string | null;
}

// Define the shape of the context object (what's provided to components)
interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
}

// Create the Context with default/initial values
const AuthContext = createContext<AuthContextType | undefined>(undefined);


// Define the props for the Provider component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // --- PERSISTENCE/HYDRATION EFFECT ---
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      try {
        // This is a simple client-side decode; in a real app, you might hit an API endpoint to validate the token
        const decodedToken = jwt.decode(storedToken) as { userId: string, email: string, name: string };
        
        // Since we don't store all user details in the client token (only ID), 
        // we'll use dummy data for name/email here, or fetch full user details if needed.
        // For simplicity, we just set the token and a minimal user object.
        if (decodedToken && decodedToken.userId) {
          setToken(storedToken);
          setUser({
            id: decodedToken.userId,
            email: decodedToken.email || 'user@email.com', // Use actual payload data if available
            name: decodedToken.name || 'User',             // Or placeholder
          });
        }
      } catch (e) {
        console.error("Failed to decode token:", e);
        localStorage.removeItem('authToken');
      }
    }
    setIsInitialized(true);
  }, []);

  // --- API HELPER FUNCTION ---
  const handleAuthResponse = (data: { token: string, user: User }) => {
    // 1. Store the token securely (in localStorage for this example)
    localStorage.setItem('authToken', data.token);
    
    // 2. Update state
    setToken(data.token);
    setUser(data.user);
    setIsLoading(false);
  };
  
  // --- AUTHENTICATION LOGIC ---

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed.');
      }
      
      handleAuthResponse(data);

    } catch (error) {
      console.error('Login Error:', error);
      setIsLoading(false);
      throw error;
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Signup failed.');
      }
      
      handleAuthResponse(data);

    } catch (error) {
      console.error('Signup Error:', error);
      setIsLoading(false);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setToken(null);
    setUser(null);
  };

  // The value exposed to consumers of the context
  const contextValue: AuthContextType = {
    user,
    token,
    isLoading,
    login,
    signup,
    logout,
  };

  // Prevent children from rendering until we've checked localStorage
  if (!isInitialized) {
    // You can return a loading spinner here
    return <div>Loading session...</div>; 
  }
  
  return (
   <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to consume the Auth context easily in any component
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};