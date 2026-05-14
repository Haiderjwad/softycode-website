import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Phone, Mail, MessageSquare } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useContactInfo } from '@/hooks/useFirestore';

export const FloatingSupport = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { contact } = useContactInfo();
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  const defaultContact = {
    phone: '+966500000000',
    email: 'info@softycode.com',
  };

  const phoneInfo = contact?.phone || defaultContact.phone;
  const emailInfo = contact?.email || defaultContact.email;

  const handleWhatsApp = () => {
    const cleanPhone = phoneInfo.replace(/\D/g, '');
    window.open(`https://wa.me/${cleanPhone}`, '_blank');
  };

  const handleEmail = () => {
    window.location.href = `mailto:${emailInfo}`;
  };

  const handleCall = () => {
    window.location.href = `tel:${phoneInfo}`;
  };

  // Prevent scrolling when interacting out of focus (optional, but good for mobile)
  
  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start space-y-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className={`flex flex-col space-y-3 ${isArabic ? 'items-end' : 'items-start'}`}
          >
            {/* WhatsApp */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleWhatsApp}
              className="flex items-center gap-3 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg border border-slate-100 dark:border-gray-700 hover:shadow-xl transition-shadow group"
            >
              <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 group-hover:bg-green-500 group-hover:text-white transition-colors">
                <MessageSquare size={20} />
              </div>
              <span className="font-medium text-sm text-slate-700 dark:text-slate-300 px-2 whitespace-nowrap">
                {t('floating_support.whatsapp')}
              </span>
            </motion.button>

            {/* Email */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleEmail}
              className="flex items-center gap-3 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg border border-slate-100 dark:border-gray-700 hover:shadow-xl transition-shadow group"
            >
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                <Mail size={20} />
              </div>
              <span className="font-medium text-sm text-slate-700 dark:text-slate-300 px-2 whitespace-nowrap">
                {t('floating_support.email')}
              </span>
            </motion.button>

            {/* Phone */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCall}
              className="flex items-center gap-3 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg border border-slate-100 dark:border-gray-700 hover:shadow-xl transition-shadow group"
            >
              <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                <Phone size={20} />
              </div>
              <span className="font-medium text-sm text-slate-700 dark:text-slate-300 px-2 whitespace-nowrap">
                {t('floating_support.call')}
              </span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-gradient-to-tr from-primary-green to-emerald-400 text-white rounded-full shadow-[0_0_20px_rgba(16,185,129,0.4)] flex items-center justify-center relative hover:shadow-[0_0_30px_rgba(16,185,129,0.6)] transition-shadow z-50 mt-4"
      >
        {/* Pulse effect */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-primary-green animate-ping opacity-30 duration-1000"></span>
        )}
        
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={26} />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle size={26} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};
