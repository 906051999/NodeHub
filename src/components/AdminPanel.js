'use client';

import { useState, useEffect } from 'react';
import SubscriptionList from './SubscriptionList';
import AddSubscriptionForm from './AddSubscriptionForm';

export default function AdminPanel() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/subscriptions');
      if (!response.ok) {
        throw new Error('Failed to fetch subscriptions');
      }
      const data = await response.json();
      setSubscriptions(data);
    } catch (err) {
      setError('获取订阅链接失败，请稍后重试。');
      console.error('Error fetching subscriptions:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">管理员面板</h1>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">添加新订阅</h2>
        <AddSubscriptionForm onAdd={fetchSubscriptions} />
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-4">订阅列表</h2>
        <SubscriptionList 
          subscriptions={subscriptions} 
          isPublic={false} 
          isLoading={isLoading}
          error={error}
        />
      </div>
      {/* 这里可以添加更多管理功能，如节点管理、自定义分发等 */}
    </div>
  );
}
