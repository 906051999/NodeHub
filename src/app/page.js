"use client";

import { useEffect, Suspense } from 'react';
import { supabase } from '@/lib/supabase';
import SubscriptionList from '@/components/SubscriptionList';
import Layout from '@/components/Layout';
import { useState } from 'react';

export default function Home() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchSubscriptions() {
      const { data, error } = await supabase.from('subscriptions').select('*');
      if (error) {
        console.log('Error fetching subscriptions:', error);
        setError('Error loading subscriptions');
      } else {
        setSubscriptions(data);
      }
    }
    fetchSubscriptions();
  }, []);

  if (error) {
    return (
      <Layout>
        <div className="text-red-500">{error}</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="bg-white shadow-sm rounded-lg p-6">
          <SubscriptionList subscriptions={subscriptions} isPublic={true} />
        </div>
      </div>
    </Layout>
  );
}
