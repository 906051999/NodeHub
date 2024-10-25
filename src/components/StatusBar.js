"use client";

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function StatusBar() {
  const [connectionStatus, setConnectionStatus] = useState('未知');
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  const testConnection = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/test-connection');
      const data = await response.json();
      const supabaseResult = data.results;
      setConnectionStatus(
        supabaseResult.success
          ? `已连接 (${supabaseResult.responseTime}ms): ${supabaseResult.message}`
          : `未连接: ${supabaseResult.message}`
      );
    } catch (error) {
      setConnectionStatus('连接错误: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    testConnection();
  }, []);

  return (
    <div className="bg-gray-100 border-b border-gray-200 text-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between">
        <div className="text-sm">
          当前页面：<span className="font-medium">{pathname}</span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <span className="mr-2 text-sm">Supabase 连接状态：</span>
            <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
              connectionStatus.includes('已连接') ? 'bg-green-500' : 'bg-red-500'
            }`}></span>
            <span className="text-sm font-medium">{connectionStatus}</span>
          </div>
          <button
            onClick={testConnection}
            disabled={isLoading}
            className="text-sm bg-blue-500 hover:bg-blue-600 text-white font-medium py-1 px-3 rounded transition duration-150 ease-in-out disabled:opacity-50"
          >
            {isLoading ? '测试中...' : '测试连接'}
          </button>
        </div>
      </div>
    </div>
  );
}
