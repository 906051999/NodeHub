"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminPanel from '@/components/AdminPanel';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';

export default function AdminPage() {
  const { user, isAdmin, setShowLoginModal, isLoggedOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user || !isAdmin) {
      if (!isLoggedOut) {
        setShowLoginModal(true);
      }
      router.push('/');
    }
  }, [user, isAdmin, router, setShowLoginModal, isLoggedOut]);

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <Layout>
      <AdminPanel />
    </Layout>
  );
}
