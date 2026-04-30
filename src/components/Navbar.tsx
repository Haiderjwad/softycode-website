import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Menu, X, LogIn, UserPlus, LogOut, User, ChevronDown,
  LayoutDashboard, Settings,
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Logo } from './Logo';
import { useAuth } from '@/hooks/useAuth';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Close user dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = async () => {
    await logout();
    setIsUserMenuOpen(false);
    navigate('/');
  };

  const navLinks = [
    { name: 'الرئيسية', path: '/' },
    { name: 'خدماتنا', path: '/services' },
    { name: 'منتجاتنا', path: '/products' },
    { name: 'المدونة', path: '/blog' },
    { name: 'الوظائف', path: '/careers' },
    { name: 'من نحن', path: '/about' },
    { name: 'الأسئلة الشائعة', path: '/faq' },
    { name: 'اتصل بنا', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  // Avatar initials
  const getInitials = () => {
    const name = user?.displayName || user?.email || 'U';
    return name
      .split(' ')
      .slice(0, 2)
      .map((n) => n[0]?.toUpperCase())
      .join('');
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
        ? 'bg-white/95 backdrop-blur-2xl shadow-xl shadow-slate-950/10 border-b border-slate-100/50'
        : 'bg-gradient-to-b from-white/20 to-transparent backdrop-blur-sm'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24 lg:h-28">

          {/* Logo */}
          <motion.div className="flex-shrink-0" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/"><Logo size="xl" /></Link>
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center flex-nowrap gap-0.5">
            {navLinks.map((link, idx) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="flex-shrink-0"
              >
                <Link
                  to={link.path}
                  className={`relative inline-flex items-center whitespace-nowrap px-3 py-2 rounded-xl text-[13px] font-semibold transition-colors duration-200 ${isActive(link.path)
                      ? 'text-primary-green'
                      : 'text-slate-700 hover:text-primary-green'
                    }`}
                >
                  {isActive(link.path) && (
                    <motion.span
                      layoutId="navActiveIndicator"
                      className="absolute inset-0 bg-primary-green/10 rounded-xl"
                      transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              /* ── Logged-in User Menu ── */
              <div className="relative" ref={userMenuRef}>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 pl-4 pr-2 py-2 rounded-2xl border-2 border-slate-200 hover:border-primary-green/40 hover:bg-slate-50 transition-all"
                >
                  {/* Avatar */}
                  <div className="w-9 h-9 rounded-xl bg-brand-gradient flex items-center justify-center text-white font-bold text-sm shadow-sm">
                    {getInitials()}
                  </div>
                  <span className="text-sm font-bold text-slate-700 max-w-[100px] truncate">
                    {user.displayName || user.email?.split('@')[0]}
                  </span>
                  <motion.div animate={{ rotate: isUserMenuOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown size={16} className="text-slate-500" />
                  </motion.div>
                </motion.button>

                {/* Dropdown */}
                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-2xl shadow-slate-950/10 border border-slate-100 overflow-hidden z-50"
                    >
                      {/* User Info */}
                      <div className="px-4 py-3 bg-slate-50 border-b border-slate-100">
                        <p className="text-xs text-slate-500 font-medium">مسجل بالبريد</p>
                        <p className="text-sm font-bold text-slate-800 truncate">{user.email}</p>
                      </div>
                      <div className="py-1">
                        <Link
                          to="/admin"
                          className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-primary-green/5 hover:text-primary-green transition-colors"
                        >
                          <LayoutDashboard size={16} />
                          لوحة الإدارة
                        </Link>
                        <Link
                          to="/profile"
                          className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-primary-green/5 hover:text-primary-green transition-colors"
                        >
                          <Settings size={16} />
                          إعدادات الحساب
                        </Link>
                        <div className="h-px bg-slate-100 my-1" />
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <LogOut size={16} />
                          تسجيل الخروج
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              /* ── Guest Buttons ── */
              <>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/login"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 border-2 border-slate-300 hover:border-primary-green/60 hover:bg-primary-green/5 text-slate-700 hover:text-primary-green rounded-xl font-bold text-sm transition-all duration-300"
                  >
                    <LogIn size={16} />
                    تسجيل الدخول
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/register"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-brand-gradient text-white rounded-xl font-bold text-sm hover-scale-up hover-glow shadow-lg shadow-primary-green/20 transition-all duration-300"
                  >
                    <UserPlus size={16} />
                    إنشاء حساب
                  </Link>
                </motion.div>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden inline-flex items-center justify-center w-12 h-12 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            <motion.div animate={{ rotate: isMobileMenuOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.div>
          </motion.button>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white/98 backdrop-blur-xl border-b border-slate-100/50 overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-4">
              {/* Nav Links */}
              <div className="space-y-1">
                {navLinks.map((link, idx) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04 }}
                  >
                    <Link
                      to={link.path}
                      className={`block px-4 py-3 rounded-xl font-semibold transition-all ${isActive(link.path)
                        ? 'bg-primary-green/10 text-primary-green'
                        : 'text-slate-700 hover:bg-slate-50'
                        }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

              {/* Mobile Auth */}
              <div className="space-y-3 pb-2">
                {user ? (
                  <>
                    <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-2xl">
                      <div className="w-10 h-10 rounded-xl bg-brand-gradient flex items-center justify-center text-white font-bold text-sm">
                        {getInitials()}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 text-sm">{user.displayName || 'المستخدم'}</p>
                        <p className="text-xs text-slate-500 truncate">{user.email}</p>
                      </div>
                    </div>
                    <Link to="/admin" className="flex items-center gap-2 w-full px-5 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-colors text-sm">
                      <LayoutDashboard size={16} />
                      لوحة الإدارة
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-red-50 text-red-600 rounded-xl font-bold hover:bg-red-100 transition-colors text-sm"
                    >
                      <LogOut size={16} />
                      تسجيل الخروج
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="flex items-center justify-center gap-2 w-full px-6 py-3.5 border-2 border-slate-200 text-slate-700 rounded-xl font-bold hover:border-primary-green/50 hover:bg-primary-green/5 hover:text-primary-green transition-all text-sm"
                    >
                      <LogIn size={18} />
                      تسجيل الدخول
                    </Link>
                    <Link
                      to="/register"
                      className="flex items-center justify-center gap-2 w-full px-6 py-3.5 bg-brand-gradient text-white rounded-xl font-bold shadow-lg shadow-primary-green/20 transition-all text-sm"
                    >
                      <UserPlus size={18} />
                      إنشاء حساب مجاني
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
