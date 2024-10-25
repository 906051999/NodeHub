"use client";

import { useState, useEffect } from 'react';

export default function SubscriptionList({ subscriptions, isPublic, isLoading, error }) {
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
    // 实现更新逻辑
  };

  const handleDelete = async (id) => {
    // 实现删除逻辑
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
                <p className="mt-1 text-sm text-gray-500">{sub.url}</p>
              </div>
              <div className="ml-2 flex-shrink-0 flex">
                <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  剩余流量: {sub.remaining_traffic}
                </p>
                <p className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                   有效期: {new Date(sub.expiration_date).toLocaleDateString()}
                </p>
              </div>
            </div>
            {!isPublic && (
              <div className="mt-2">
                <button onClick={() => handleUpdate(sub.id)} className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-xs">更新</button>
                <button onClick={() => handleDelete(sub.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-xs">删除</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
