import { supabase } from '@/lib/supabase';
import SubscriptionList from '@/components/SubscriptionList';
import Layout from '@/components/Layout';

export default async function Home() {
  const { data: subscriptions, error } = await supabase
    .from('subscriptions')
    .select('*');

  if (error) {
    // 使用 console.log 代替 console.error
    console.log('Error fetching subscriptions:', error);
    return (
      <Layout>
        <div className="text-red-500">Error loading subscriptions</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">NodeHub</h1>
      <SubscriptionList subscriptions={subscriptions} isPublic={true} />
    </Layout>
  );
}
