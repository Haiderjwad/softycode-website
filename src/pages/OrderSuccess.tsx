import React from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { CheckCircle, ArrowLeft, CalendarDays, Shield, CreditCard, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

export const OrderSuccess = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4 transition-colors duration-300">
      <Helmet>
        <title>{t('seo.order_success_title')}</title>
        <meta name="description" content={t('order_success.subtitle')} />
      </Helmet>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full"
      >
        {/* Success Card */}
        <div className="bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl shadow-slate-950/5 border border-slate-100 dark:border-slate-800 overflow-hidden transition-colors duration-300">
          {/* Success Header */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-12 text-center text-white">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="w-24 h-24 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 transition-colors duration-300"
            >
              <CheckCircle size={48} className="text-green-500" />
            </motion.div>
            <h1 className="text-4xl font-bold mb-4">{t('order_success.title')}</h1>
            <p className="text-white/80 text-lg">
              {t('order_success.subtitle')}
            </p>
          </div>

          {/* Order Details */}
          <div className="p-8 space-y-6">
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 transition-colors duration-300">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{t('order_success.order_details')}</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center text-green-600 dark:text-green-400 flex-shrink-0 transition-colors duration-300">
                    <Calendar size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{t('order_success.order_number')}</p>
                    <p className="font-bold text-slate-900 dark:text-white">#ORD-2024-001</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 flex-shrink-0 transition-colors duration-300">
                    <CalendarDays size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{t('order_success.order_date')}</p>
                    <p className="font-bold text-slate-900 dark:text-white">29 أبريل 2026</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-xl flex items-center justify-center text-purple-600 dark:text-purple-400 flex-shrink-0 transition-colors duration-300">
                    <CreditCard size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{t('order_success.payment_method')}</p>
                    <p className="font-bold text-slate-900 dark:text-white">{t('order_success.payment_value')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Status */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 rounded-2xl p-6 border border-green-100 dark:border-green-900/20 transition-colors duration-300">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">{t('order_success.order_status')}</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle size={20} className="text-green-600 flex-shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300">{t('order_success.status_received')}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-600 flex items-center justify-center text-white text-xs flex-shrink-0">
                    <CheckCircle size={12} />
                  </div>
                  <span className="text-slate-700 dark:text-slate-300">{t('order_success.status_processing')}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-400 dark:text-slate-500 text-xs flex-shrink-0 transition-colors duration-300">
                    <CheckCircle size={12} />
                  </div>
                  <span className="text-slate-400 dark:text-slate-500">{t('order_success.status_preparing')}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-400 dark:text-slate-500 text-xs flex-shrink-0 transition-colors duration-300">
                    <CheckCircle size={12} />
                  </div>
                  <span className="text-slate-400 dark:text-slate-500">{t('order_success.status_delivered')}</span>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl transition-colors duration-300">
                <Shield size={28} className="text-green-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{t('order_success.quality_guarantee')}</p>
              </div>
              <div className="text-center p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl transition-colors duration-300">
                <CalendarDays size={28} className="text-green-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{t('order_success.delivery_on_time')}</p>
              </div>
              <div className="text-center p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl transition-colors duration-300">
                <CreditCard size={28} className="text-green-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{t('order_success.secure_payment')}</p>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="px-8 pb-8">
            <div className="flex gap-4">
              <Link
                to="/products"
                className="flex-1 py-4 px-6 rounded-2xl border-2 border-slate-200 dark:border-slate-700 hover:border-primary-green dark:hover:border-primary-green hover:bg-slate-50 dark:hover:bg-slate-800 transition-all font-bold text-slate-700 dark:text-slate-300 text-center"
              >
                {t('order_success.browse_more')}
              </Link>
              <Link
                to="/"
                className="flex-1 py-4 px-6 rounded-2xl bg-brand-gradient text-white hover:shadow-xl transition-all font-bold text-center"
              >
                {t('order_success.back_home')}
              </Link>
            </div>
          </div>
        </div>

        {/* Support Info */}
        <div className="mt-8 text-center">
          <p className="text-slate-600 dark:text-slate-400 mb-4 transition-colors duration-300">
            {t('common.have_questions')}
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 text-primary-green font-bold hover:underline"
          >
            <ArrowLeft size={20} />
            {t('common.contact_us')}
          </Link>
        </div>
      </motion.div>
    </div>
  );
};
