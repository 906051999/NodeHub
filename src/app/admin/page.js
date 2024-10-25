import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import AdminPanel from '@/components/AdminPanel';
import Layout from '@/components/Layout';

export default async function AdminPage() {
  const cookieStore = await cookies();
  const adminToken = cookieStore.get('admin_token');

  if (!adminToken || adminToken.value !== 'true') {
    redirect('/login');
  }

  return (
    <Layout>
      <AdminPanel />
    </Layout>
  );
}
