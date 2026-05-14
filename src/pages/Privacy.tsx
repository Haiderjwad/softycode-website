import React from 'react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Shield, Lock, Eye, Database, User, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Privacy = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-20 transition-colors duration-300">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-display font-bold text-slate-900 dark:text-white mb-4 transition-colors duration-300"
          >
            {t('pages.privacy.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl transition-colors duration-300"
          >
            {t('pages.privacy.intro')}
          </motion.p>
        </div>
      </div>

      <Helmet>
        <title>{t('seo.privacy_title')}</title>
        <meta name="description" content={t('seo.privacy_desc')} />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 p-8 lg:p-12 space-y-8 transition-colors duration-300"
        >
          {/* Introduction */}
          <div className="flex items-start gap-4">
            <Shield size={32} className="text-primary-green flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                {t('privacy.sections.s1_title')}
              </h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {t('privacy.sections.s1_body')}
              </p>
            </div>
          </div>

          {/* Section 1 */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
              <Lock size={24} className="text-primary-green" />
              1. {t('privacy.sections.s2_title')}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              {t('privacy.sections.s2_body')}
            </p>
          </div>

          {/* Section 2 */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
              <Database size={24} className="text-primary-green" />
              2. {t('privacy.sections.s3_title')}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              {t('privacy.sections.s3_body')}
            </p>
          </div>

          {/* Section 3 */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
              <ShieldCheck size={24} className="text-primary-green" />
              3. {t('privacy.sections.s4_title')}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              {t('privacy.sections.s4_body')}
            </p>
          </div>

          {/* Section 4 */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
              <Eye size={24} className="text-primary-green" />
              4. {t('privacy.sections.s5_title')}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              {t('privacy.sections.s5_body')}
            </p>
          </div>

          {/* Section 5 */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
              <User size={24} className="text-primary-green" />
              5. {t('privacy.sections.s6_title')}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              {t('privacy.sections.s6_body')}
            </p>
          </div>

          {/* Section 6 */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
              <Shield size={24} className="text-primary-green" />
              6. {t('privacy.sections.s6_title')}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              {t('privacy.sections.s6_body')}
            </p>
          </div>

          {/* Footer */}
          <div className="pt-8 border-t border-slate-200 dark:border-slate-800 transition-colors duration-300">
            <p className="text-slate-500 dark:text-slate-500 text-sm">
              {t('common.last_update')}: 29 April 2026
            </p>
          </div>
        </motion.div>

        {/* Back Link */}
        <div className="mt-8 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-primary-green font-bold hover:underline"
          >
            <ArrowLeft size={20} />
            {t('common.back_to_home')}
          </Link>
        </div>
      </div>
    </div>
  );
};