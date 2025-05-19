'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useProductContext } from '@/contexts/ProductContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user } = useProductContext();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [user, router]);

  if (!user) {
    return null; 
  }

  return <>{children}</>;
}
