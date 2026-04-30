import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ShoppingBag, LogIn, Home, Briefcase, BookOpen, Users, HelpCircle, MessageCircle } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from './Logo';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navLinks = [
    { name: 'الرئيسية', path: '/' },
    { name: 'خدماتنا', path: '/services' },
    { name: 'منتجاتنا', path: '/products' },
    { name: 'المدونة', path: '/blog' },
    { name: 'الوظائف', path: '/careers' },
    { name: 'عن الشركة', path: '/about' },
    { name: 'الأسئلة الشائعة', path: '/faq' },
    { name: 'اتصل بنا', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled 
      ? 'bg-white/90 backdrop-blur-2xl shadow-xl shadow-slate-950/10 border-b border-slate-100/50' 
      : 'bg-gradient-to-b from-white/20 to-transparent backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24 lg:h-28">
          {/* Logo */}
          <motion.div 
            className="flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/">
              <Logo size="xl" />
            </Link>
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-reverse space-x-1">
            {navLinks.map((link, idx) => (
              <motion.div key={link.name} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}>
                <Link
                  to={link.path}
                  className={`relative px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 group ${
                    isActive(link.path)
                      ? 'text-primary-green bg-primary-green/10'
                      : 'text-slate-700 hover:text-primary-green hover:bg-slate-50/50'
                  }`}
                >
                  <span className="relative z-10">{link.name}</span>
                  {isActive(link.path) && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute inset-0 bg-primary-green/5 rounded-lg"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-green to-primary-teal scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right" />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/cart"
                className="relative inline-flex items-center justify-center w-12 h-12 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors group"
              >
                <ShoppingBag size={20} className="text-slate-700 group-hover:text-primary-green transition-colors" />
                <span className="absolute top-0 right-0 w-5 h-5 bg-primary-green text-white text-xs font-bold rounded-full flex items-center justify-center">0</span>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-gradient text-white rounded-xl font-bold text-sm hover-scale-up hover-glow shadow-lg shadow-primary-green/20"
              >
                ابدأ الآن
              </Link>
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden inline-flex items-center justify-center w-12 h-12 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            <motion.div
              animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.div>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white/95 backdrop-blur-xl border-b border-slate-100/50 overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-4">
              {/* Nav Links */}
              <div className="space-y-2">
                {navLinks.map((link, idx) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Link
                      to={link.path}
                      className={`block px-4 py-3 rounded-lg font-semibold transition-all ${
                        isActive(link.path)
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
              <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent my-4" />

              {/* Mobile CTA */}
              <div className="space-y-3">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Link
                    to="/cart"
                    className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-slate-100 text-slate-900 rounded-xl font-bold hover:bg-slate-200 transition-colors"
                  >
                    <ShoppingBag size={20} />
                    عرض السلة
                  </Link>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                >
                  <Link
                    to="/contact"
                    className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-brand-gradient text-white rounded-xl font-bold hover-scale-up shadow-lg shadow-primary-green/20"
                  >
                    ابدأ الآن
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
