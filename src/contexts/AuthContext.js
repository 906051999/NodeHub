"use client";

import React, { createContext, useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkUser = () => {
      const adminToken = Cookies.get('admin_token');
      if (adminToken === 'true') {
        setUser({ email: process.env.NEXT_PUBLIC_ADMIN_USERNAME });
        setIsAdmin(true);
      } else {
        setUser(null);
        setIsAdmin(false);
      }
    };
    checkUser();
  }, []);

  const login = (userData) => {
    setUser(userData);
    setIsAdmin(true);
    Cookies.set('admin_token', 'true', { expires: 7 });
    setShowLoginModal(false);
    setIsLoggedOut(false);
    router.push('/admin');
  };

  const logout = () => {
    Cookies.remove('admin_token');
    setUser(null);
    setIsAdmin(false);
    setIsLoggedOut(true);
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, login, logout, showLoginModal, setShowLoginModal, isLoggedOut, setIsLoggedOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
