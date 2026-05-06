import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Menu, X, LogIn, UserPlus, LogOut, User, ChevronDown,
  LayoutDashboard, Settings, Globe, Moon, Sun
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Logo, LogoIcon, LogoText } from './Logo';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/useTheme';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const langMenuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);
    setIsLangMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setIsUserMenuOpen(false);
      }
      if (langMenuRef.current && !langMenuRef.current.contains(e.target as Node)) {
        setIsLangMenuOpen(false);
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

  const toggleLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsLangMenuOpen(false);
  };

  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.services'), path: '/services' },
    { name: t('nav.products'), path: '/products' },
    { name: t('nav.blog'), path: '/blog' },
    { name: t('nav.careers'), path: '/careers' },
    { name: t('nav.about'), path: '/about' },
    { name: t('nav.faq'), path: '/faq' },
    { name: t('nav.contact'), path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

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
        ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl shadow-xl shadow-slate-950/10 border-b border-slate-100/50 dark:border-slate-800/50'
        : 'bg-gradient-to-b from-white/20 dark:from-slate-900/20 to-transparent backdrop-blur-sm'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24 lg:h-28">

      {/* Logo */}
      <motion.div className="flex-shrink-0 flex items-center gap-2" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Link to="/" className="inline-flex items-center gap-2">
          {/* Cloud Icon */}
          <LogoIcon size="xl" />
          {/* Brand Name with white card in dark mode */}
          <div className="bg-white/95 dark:bg-white rounded-lg px-2.5 py-1 shadow-sm border border-primary-green/20 dark:border-primary-green/40 transition-all duration-300 hover:border-primary-green/40 dark:hover:border-primary-green/60">
            <LogoText size="xl" />
          </div>
        </Link>
      </motion.div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center flex-nowrap gap-0.5">
            {navLinks.map((link, idx) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="flex-shrink-0"
              >
                <Link
                  to={link.path}
                  className={`relative inline-flex items-center whitespace-nowrap px-3 py-2 rounded-xl text-[13px] font-semibold transition-colors duration-200 ${isActive(link.path)
                      ? 'text-primary-green'
                      : 'text-slate-700 dark:text-slate-300 hover:text-primary-green'
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

          {/* Desktop CTA & Tools */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              aria-label="Toggle Theme"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </motion.button>

            {/* Language Switcher */}
            <div className="relative" ref={langMenuRef}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center gap-2"
              >
                <Globe size={20} />
                <span className="text-xs font-bold uppercase">{i18n.language}</span>
              </motion.button>
              <AnimatePresence>
                {isLangMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.97 }}
                    className="absolute left-0 top-full mt-2 w-32 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-700 overflow-hidden z-50"
                  >
                    <button onClick={() => toggleLanguage('ar')} className={`w-full px-4 py-2.5 text-sm font-bold text-right hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors ${i18n.language === 'ar' ? 'text-primary-green' : 'text-slate-700 dark:text-slate-300'}`}>العربية</button>
                    <button onClick={() => toggleLanguage('en')} className={`w-full px-4 py-2.5 text-sm font-bold text-left hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors ${i18n.language === 'en' ? 'text-primary-green' : 'text-slate-700 dark:text-slate-300'}`}>English</button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="w-px h-8 bg-slate-200 dark:bg-slate-700 mx-1" />

            {user ? (
              <div className="relative" ref={userMenuRef}>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 pl-4 pr-2 py-2 rounded-2xl border-2 border-slate-200 dark:border-slate-700 hover:border-primary-green/40 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                >
                  <div className="w-9 h-9 rounded-xl bg-brand-gradient flex items-center justify-center text-white font-bold text-sm shadow-sm">
                    {getInitials()}
                  </div>
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-300 max-w-[100px] truncate">
                    {user.displayName || user.email?.split('@')[0]}
                  </span>
                  <motion.div animate={{ rotate: isUserMenuOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown size={16} className="text-slate-500" />
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.97 }}
                      className="absolute left-0 top-full mt-2 w-56 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-700 overflow-hidden z-50"
                    >
                      <div className="px-4 py-3 bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-700">
                        <p className="text-xs text-slate-500 font-medium">مسجل بالبريد</p>
                        <p className="text-sm font-bold text-slate-800 dark:text-slate-100 truncate">{user.email}</p>
                      </div>
                      <div className="py-1">
                        <Link to="/admin" className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 dark:text-slate-300 hover:bg-primary-green/5 hover:text-primary-green transition-colors"><LayoutDashboard size={16} />{t('nav.admin', 'لوحة الإدارة')}</Link>
                        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"><LogOut size={16} />{t('nav.logout', 'تسجيل الخروج')}</button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link to="/login" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 border-2 border-slate-300 dark:border-slate-700 hover:border-primary-green/60 hover:bg-primary-green/5 text-slate-700 dark:text-slate-300 hover:text-primary-green rounded-xl font-bold text-sm transition-all duration-300">
                    <LogIn size={16} />{t('nav.login')}
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link to="/register" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-brand-gradient text-white rounded-xl font-bold text-sm hover-scale-up shadow-lg shadow-primary-green/20 transition-all duration-300">
                    <UserPlus size={16} />{t('nav.register')}
                  </Link>
                </motion.div>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              <div className="space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`block px-4 py-3 rounded-xl font-semibold transition-all ${isActive(link.path)
                      ? 'bg-primary-green/10 text-primary-green'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
              <div className="flex gap-2 px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                <button onClick={() => toggleLanguage('ar')} className={`flex-1 py-2 rounded-xl font-bold ${i18n.language === 'ar' ? 'bg-primary-green text-white shadow-md' : 'text-slate-600 dark:text-slate-400'}`}>العربية</button>
                <button onClick={() => toggleLanguage('en')} className={`flex-1 py-2 rounded-xl font-bold ${i18n.language === 'en' ? 'bg-primary-green text-white shadow-md' : 'text-slate-600 dark:text-slate-400'}`}>English</button>
              </div>
              <div className="h-px bg-slate-200 dark:bg-slate-700" />
              <div className="space-y-3">
                {user ? (
                   <button onClick={handleLogout} className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-xl font-bold text-sm">
                    <LogOut size={16} />{t('nav.logout', 'تسجيل الخروج')}
                  </button>
                ) : (
                  <>
                    <Link to="/login" className="flex items-center justify-center gap-2 w-full px-6 py-3.5 border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-bold text-sm">{t('nav.login')}</Link>
                    <Link to="/register" className="flex items-center justify-center gap-2 w-full px-6 py-3.5 bg-brand-gradient text-white rounded-xl font-bold text-sm">{t('nav.register')}</Link>
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
