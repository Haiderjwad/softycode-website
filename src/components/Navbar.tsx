import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
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
    { name: 'عن الشركة', path: '/about' },
    { name: 'اتصل بنا', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-white/80 backdrop-blur-xl shadow-xl shadow-slate-950/5 border-b border-slate-100' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-32">
          <div className="flex-shrink-0">
            <Link to="/">
              <Logo size="xl" />
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-reverse space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`font-bold transition-all px-4 py-2 rounded-xl text-lg ${isActive(link.path)
                  ? 'text-primary-green bg-primary-green/5'
                  : 'text-slate-600 hover:text-primary-green hover:bg-slate-50'
                  }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/contact"
              className="bg-brand-gradient text-white px-8 py-3 rounded-2xl font-bold text-lg hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary-green/20"
            >
              ابدأ مشروعك
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-700 bg-slate-50 p-3 rounded-2xl border border-slate-100"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white border-b border-slate-100 shadow-2xl overflow-hidden"
          >
            <div className="px-6 py-10 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`block px-6 py-4 text-xl font-bold rounded-2xl ${isActive(link.path)
                    ? 'bg-primary-purple/10 text-primary-purple'
                    : 'text-slate-700 active:bg-slate-50'
                    }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-6">
                <Link
                  to="/contact"
                  className="w-full bg-brand-gradient text-white px-6 py-6 rounded-2xl font-bold text-xl shadow-xl flex items-center justify-center text-center"
                >
                  ابدأ مشروعك الآن
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
