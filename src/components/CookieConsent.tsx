import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Cookie, X } from 'lucide-react';

export const CookieConsent = () => {
  const { t, i18n } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };

  const rejectAll = () => {
    localStorage.setItem('cookie-consent', 'rejected');
    setIsVisible(false);
  };

  const isRTL = i18n.language === 'ar';

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-0 inset-x-0 z-[100] p-4"
        >
          <div className="max-w-7xl mx-auto">
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              <div className="flex items-start gap-4 flex-1">
                <div className="w-12 h-12 rounded-xl bg-primary-green/10 flex items-center justify-center flex-shrink-0">
                  <Cookie size={24} className="text-primary-green" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white mb-1">
                    {isRTL ? 'نستخدم ملفات تعريف الارتباط 🍪' : 'We use cookies 🍪'}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {isRTL
                      ? 'نستخدم ملفات تعريف الارتباط لتحسين تجربتك. باستمرارك في التصفح، فإنك توافق على سياسة الخصوصية الخاصة بنا.'
                      : 'We use cookies to enhance your experience. By continuing to browse, you agree to our privacy policy.'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0 w-full sm:w-auto">
                <button
                  onClick={rejectAll}
                  className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                >
                  {isRTL ? 'رفض' : 'Reject'}
                </button>
                <button
                  onClick={acceptAll}
                  className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-brand-gradient text-white font-bold text-sm hover:shadow-lg transition-all"
                >
                  {isRTL ? 'قبول الكل' : 'Accept All'}
                </button>
                <button
                  onClick={rejectAll}
                  className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-all"
                  aria-label={isRTL ? 'إغلاق' : 'Close'}
                >
                  <X size={20} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
