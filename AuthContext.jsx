import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const AUTH_STORAGE_KEY = 'omnidash_auth_user';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading auth state from localStorage:', e);
    }
    // Default logged in user for immediate experience, or can be logged out
    return {
      name: 'Khushi Wable',
      email: 'khushi.wable@example.com',
      role: 'Member',
      initials: 'KW'
    };
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    } catch (e) {
      console.error('Error saving auth state to localStorage:', e);
    }
  }, [user]);

  const login = (email, password) => {
    if (!email || !email.trim()) {
      return { success: false, error: 'Email address is required.' };
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return { success: false, error: 'Please enter a valid email address.' };
    }
    if (!password || password.trim().length < 4) {
      return { success: false, error: 'Password must be at least 4 characters.' };
    }

    const nameFromEmail = email.split('@')[0].replace(/[._]/g, ' ');
    const formattedName = nameFromEmail
      .split(' ')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
    
    const initials = formattedName
      .split(' ')
      .map((w) => w.charAt(0))
      .join('')
      .substring(0, 2)
      .toUpperCase() || 'US';

    const newUser = {
      name: formattedName || 'Customer',
      email: email.trim(),
      role: email.includes('admin') ? 'Administrator' : 'Member',
      initials
    };

    setUser(newUser);
    return { success: true, user: newUser };
  };

  const logout = () => {
    setUser(null);
  };

  const demoLogin = (role = 'member') => {
    if (role === 'admin') {
      const adminUser = {
        name: 'Om (Admin)',
        email: 'admin@omnidash.store',
        role: 'Administrator',
        initials: 'OM'
      };
      setUser(adminUser);
      return adminUser;
    }
    const demoUser = {
      name: 'Khushi Wable',
      email: 'khushi.wable@example.com',
      role: 'Member',
      initials: 'KW'
    };
    setUser(demoUser);
    return demoUser;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        login,
        logout,
        demoLogin,
        isAuthModalOpen,
        setIsAuthModalOpen,
        openAuthModal: () => setIsAuthModalOpen(true),
        closeAuthModal: () => setIsAuthModalOpen(false)
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
