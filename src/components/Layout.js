"use client";

import { useRouter } from 'next/navigation';
import LoginModal from '@/components/LoginModal';
import StatusBar from '@/components/StatusBar';
import UserInfoModal from '@/components/UserInfoModal';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';

const DefaultAvatar = () => (
  <svg className="w-full h-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

export default function Layout({ children }) {
  const [showUserInfoModal, setShowUserInfoModal] = useState(false);
  const { user, login, logout, showLoginModal, setShowLoginModal } = useAuth();
  const router = useRouter();

  const handleLogin = (userData) => {
    login(userData);
    setShowLoginModal(false);
    router.push('/admin');
  };

  const handleLogout = () => {
    logout();
    setShowUserInfoModal(false);
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <StatusBar />
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800">NodeHub</h1>
          {user ? (
            <button
              onClick={() => setShowUserInfoModal(true)}
              className="w-10 h-10 relative rounded-full overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {user.user_metadata?.avatar_url ? (
                <Image
                  src={user.user_metadata.avatar_url}
                  alt="User avatar"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              ) : (
                <DefaultAvatar />
              )}
            </button>
          ) : (
            <button
              onClick={() => setShowLoginModal(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out"
            >
              登录
            </button>
          )}
        </div>
      </header>
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} onLogin={handleLogin} />}
      {showUserInfoModal && (
        <UserInfoModal 
          user={user} 
          onClose={() => setShowUserInfoModal(false)} 
          onLogout={handleLogout} 
        />
      )}
    </div>
  );
}
