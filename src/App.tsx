import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ErrorBoundary } from './components/ErrorBoundary';
import { SkeletonGrid } from './components/Skeletons';
import { Home } from './pages/Home';
import { Services } from './pages/Services';
import { Products } from './pages/Products';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { AdminPanel } from './components/AdminPanel';
import { ProductDetail } from './pages/ProductDetail';
import { FreeTrialOffer } from './components/FreeTrialOffer';
import { ThemeProvider } from './hooks/useTheme';
import { FloatingSupport } from './components/FloatingSupport';
import { CookieConsent } from './components/CookieConsent';

import { OrderSuccess } from './pages/OrderSuccess';
import { Blog } from './pages/Blog';
import { FAQ } from './pages/FAQ';
import { Terms } from './pages/Terms';
import { Privacy } from './pages/Privacy';
import { Careers } from './pages/Careers';

const NotFound = () => {
  const { t } = useTranslation();
  const isRTL = document.documentElement.dir === 'rtl';
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 pt-32">
      <div className="text-center px-4">
        <div className="text-8xl mb-6 font-bold text-slate-200 dark:text-slate-800">404</div>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
          {isRTL ? 'الصفحة غير موجودة' : 'Page Not Found'}
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md mx-auto">
          {isRTL ? 'عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها.' : 'Sorry, the page you are looking for does not exist or has been moved.'}
        </p>
        <Link to="/" className="inline-flex items-center gap-2 px-8 py-4 bg-brand-gradient text-white rounded-2xl font-bold text-lg hover:shadow-xl transition-all">
          {isRTL ? 'العودة للرئيسية' : 'Back to Home'}
        </Link>
      </div>
    </div>
  );
};

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const { i18n } = useTranslation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${location.pathname}-${i18n.language}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const { i18n, t } = useTranslation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  useEffect(() => {
    const dir = i18n.dir();
    document.documentElement.lang = i18n.language;
    document.documentElement.dir = dir;
    document.documentElement.style.direction = dir;
  }, [i18n, i18n.language]);

  const metaTitle = t('seo.home_title', 'SoftyCode | حلول برمجية وأنظمة ويب احترافية');
  const metaDesc = t('footer.description', 'شريكك التقني الأمثل لبناء حلول سحابية ذكية بلمسة ناعمة.');

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300 ease-in-out">
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDesc} />
      </Helmet>
      {!isAuthPage && <Navbar />}
      <main className="transition-all duration-300 ease-in-out">
        {children}
      </main>
      {!isAuthPage && <FreeTrialOffer />}
      {!isAuthPage && <Footer />}
      {!isAuthPage && <FloatingSupport />}
      <CookieConsent />
    </div>
  );
};

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <Router>
          <MainLayout>
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><SkeletonGrid /></div>}>
              <Routes>
                <Route path="/" element={<PageTransition><Home /></PageTransition>} />
                <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
                <Route path="/products" element={<PageTransition><Products /></PageTransition>} />
                <Route path="/product/:id" element={<PageTransition><ProductDetail /></PageTransition>} />

                <Route path="/order-success" element={<PageTransition><OrderSuccess /></PageTransition>} />
                <Route path="/about" element={<PageTransition><About /></PageTransition>} />
                <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
                <Route path="/blog" element={<PageTransition><Blog /></PageTransition>} />
                <Route path="/faq" element={<PageTransition><FAQ /></PageTransition>} />
                <Route path="/terms" element={<PageTransition><Terms /></PageTransition>} />
                <Route path="/privacy" element={<PageTransition><Privacy /></PageTransition>} />
                <Route path="/careers" element={<PageTransition><Careers /></PageTransition>} />
                <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
                <Route path="/register" element={<PageTransition><Register /></PageTransition>} />
                <Route path="/admin" element={<PageTransition><AdminPanel /></PageTransition>} />
                <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
              </Routes>
            </Suspense>
          </MainLayout>
        </Router>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
