"use client";

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function SubscriptionList({ subscriptions, isPublic, isLoading, error }) {
  const [updatingId, setUpdatingId] = useState(null);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">错误！</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    );
  }

  if (!subscriptions || subscriptions.length === 0) {
    return (
      <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">提示：</strong>
        <span className="block sm:inline"> 暂无订阅链接数据。</span>
      </div>
    );
  }

  const handleUpdate = async (id) => {
    setUpdatingId(id);
    try {
      const response = await fetch(`/api/update-subscription/${id}`, { method: 'POST' });
      if (!response.ok) {
        throw new Error('更新失败');
      }
      const result = await response.json();
      alert(result.message);
      // 这里可以添加更新成功后的逻辑，比如刷新列表
    } catch (error) {
      console.error('更新订阅时出错:', error);
      alert('更新失败，请稍后重试');
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h2 className="text-lg leading-6 font-medium text-gray-900">订阅链接列表</h2>
      </div>
      <ul className="divide-y divide-gray-200">
        {subscriptions.map(sub => (
          <li key={sub.id} className="px-4 py-4 sm:px-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-indigo-600 truncate">{sub.provider}</p>
                {!isPublic && (
                  <p className="mt-1 text-sm text-gray-500">{sub.url}</p>
                )}
              </div>
              <div className="ml-2 flex-shrink-0 flex items-center">
                <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  剩余流量: {formatTraffic(sub.remaining_traffic)}
                </p>
                <p className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                   有效期: {formatDate(sub.expiration_date)}
                </p>
                <p className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                   节点数量: {sub.node_count}
                </p>
                {!isPublic && (
                  <button
                    onClick={() => handleUpdate(sub.id)}
                    disabled={updatingId === sub.id}
                    className="ml-2 px-3 py-1 bg-blue-500 text-white text-xs font-semibold rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50"
                  >
                    {updatingId === sub.id ? '更新中...' : '更新'}
                  </button>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function formatTraffic(bytes) {
  if (bytes < 1024) return bytes + ' B';
  else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
  else if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  else return (bytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString();
}
