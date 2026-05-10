import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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

import { OrderSuccess } from './pages/OrderSuccess';
import { Blog } from './pages/Blog';
import { FAQ } from './pages/FAQ';
import { Terms } from './pages/Terms';
import { Privacy } from './pages/Privacy';
import { Careers } from './pages/Careers';

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
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
  const { i18n } = useTranslation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  useEffect(() => {
    document.documentElement.dir = i18n.dir();
    document.documentElement.lang = i18n.language;
  }, [i18n, i18n.language]);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300 ease-in-out">
      <Helmet>
        <title>SoftyCode | حلول برمجية وأنظمة ويب احترافية</title>
        <meta name="description" content="شريكك التقني الأمثل لبناء حلول سحابية ذكية بلمسة ناعمة. نحوّل تعقيدات البرمجة إلى أنظمة سهلة وفعّالة." />
      </Helmet>
      {!isAuthPage && <Navbar />}
      <main className="transition-colors duration-300 ease-in-out">
        {children}
      </main>
      {!isAuthPage && <FreeTrialOffer />}
      {!isAuthPage && <Footer />}
      {!isAuthPage && <FloatingSupport />}
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
              </Routes>
            </Suspense>
          </MainLayout>
        </Router>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
