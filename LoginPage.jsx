import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Lock, Mail, User, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const LoginPage = ({ navigate }) => {
  const { login, demoLogin } = useAuth();
  const { showToast } = useToast();

  const [tab, setTab] = useState('login'); // 'login' | 'register'
  const [email, setEmail] = useState('khushi.wable@example.com');
  const [password, setPassword] = useState('password123');
  const [name, setName] = useState('Khushi Wable');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (tab === 'register' && !name.trim()) {
      setError('Please enter your full name.');
      return;
    }

    const res = login(email, password);
    if (!res.success) {
      setError(res.error);
    } else {
      showToast(`Welcome back, ${res.user.name}!`, 'success');
      navigate('/');
    }
  };

  const handleDemoFill = (role) => {
    setError('');
    const user = demoLogin(role);
    showToast(`Signed in as ${user.name} (${user.role})`, 'success');
    navigate(role === 'admin' ? '/admin' : '/');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 sm:p-6 flex-1">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full p-6 sm:p-10 space-y-6">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div 
            onClick={() => navigate('/')} 
            className="inline-flex items-center space-x-2 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center font-extrabold text-white text-base shadow">
              O
            </div>
            <span className="font-heading font-extrabold text-2xl tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
              OMNIDASH
            </span>
          </div>
          <h2 className="font-heading font-extrabold text-2xl text-slate-900">
            {tab === 'login' ? 'Sign In to Account' : 'Create Customer Account'}
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Manage your orders, save items in cart, and generate sales receipts.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-slate-100 p-1 rounded-2xl text-xs font-bold">
          <button
            type="button"
            onClick={() => { setTab('login'); setError(''); setEmail('khushi.wable@example.com'); }}
            className={`flex-1 py-2.5 rounded-xl transition-all ${
              tab === 'login' ? 'bg-white shadow text-slate-900' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setTab('register'); setError(''); setEmail('newuser@example.com'); }}
            className={`flex-1 py-2.5 rounded-xl transition-all ${
              tab === 'register' ? 'bg-white shadow text-slate-900' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Register
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-2xl text-xs text-rose-700 font-semibold flex items-center space-x-2 animate-in fade-in">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {tab === 'register' && (
            <div>
              <label className="block font-bold text-slate-700 mb-1 uppercase tracking-wider">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Khushi Wable"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-sm font-medium focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              </div>
            </div>
          )}

          <div>
            <label className="block font-bold text-slate-700 mb-1 uppercase tracking-wider">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
                className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-sm font-medium focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="font-bold text-slate-700 uppercase tracking-wider">
                Password
              </label>
              <button
                type="button"
                onClick={() => showToast('Password reset instructions simulated sent.', 'info')}
                className="text-blue-600 hover:underline font-semibold"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-sm font-medium focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl shadow-md hover:shadow-lg text-xs sm:text-sm transition-all flex items-center justify-center space-x-2"
          >
            <span>{tab === 'login' ? 'SIGN IN' : 'CREATE ACCOUNT'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Demo Fast Login Buttons */}
        <div className="pt-3 border-t border-slate-100 text-center space-y-2.5">
          <p className="text-[11px] text-slate-400 font-medium">
            Evaluation Quick Demo Access:
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => handleDemoFill('member')}
              className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 py-2.5 rounded-xl text-xs font-bold transition-all"
            >
              👤 Customer Demo
            </button>
            <button
              type="button"
              onClick={() => handleDemoFill('admin')}
              className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-700 py-2.5 rounded-xl text-xs font-bold transition-all"
            >
              ⚙️ Admin Demo
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
