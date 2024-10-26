import React from 'react';
import Image from 'next/image';

const DefaultAvatar = () => (
  <svg className="w-full h-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

export default function UserInfoModal({ user, onClose, onLogout }) {
  const handleLogout = () => {
    onLogout();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">用户信息</h2>
        <div className="flex items-center mb-4">
          <div className="w-20 h-20 relative mr-4 bg-gray-100 rounded-full overflow-hidden">
            {user.user_metadata?.avatar_url ? (
              <Image
                src={user.user_metadata.avatar_url}
                alt="User avatar"
                layout="fill"
                objectFit="cover"
              />
            ) : (
              <DefaultAvatar />
            )}
          </div>
          <div>
            <p className="text-lg font-medium">{user.email}</p>
            <p className="text-gray-600">{user.role || '管理员'}</p>
          </div>
        </div>
        <div className="mt-6 flex justify-between">
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out"
          >
            退出登录
          </button>
          <button
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  );
}
