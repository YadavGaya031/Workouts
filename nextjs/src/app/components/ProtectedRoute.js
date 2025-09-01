'use client';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthContext from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const [isClient, setIsClient] = useState(false);
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    setIsClient(true); // Mark that we're now on the client

    const token = localStorage.getItem('token');
    if (token) {
      setHasToken(true);
    }

    if (!user && !token) {
      router.push('/login');
    }
  }, [user, router]);

  // Only render once we're sure we're on the client
  if (!isClient) return null;

  return (user || hasToken) ? children : null;
};

export default ProtectedRoute;
