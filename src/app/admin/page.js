"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminPanel from '@/components/AdminPanel';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';

export default function AdminPage() {
  const { user, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user || !isAdmin) {
      router.push('/?login=true');
    }
  }, [user, isAdmin, router]);

  if (!user || !isAdmin) {
    return null; // 或者返回一个加载指示器
  }

  return (
    <Layout>
      <AdminPanel />
    </Layout>
  );
}
