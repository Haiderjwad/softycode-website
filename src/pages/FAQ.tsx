import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, CheckCircle, Phone, Mail, Search } from 'lucide-react';
import { Helmet } from 'react-helmet-async';



export const FAQ = () => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = t('pages.faq.items', { returnObjects: true }) as Array<{ question: string; answer: string }>;
  const faqsArray = Array.isArray(faqs) ? faqs : [];

  const filteredFaqs = faqsArray.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Helmet>
        <title>{t('seo.faq_title')}</title>
        <meta name="description" content={t('seo.faq_desc')} />
        <meta property="og:title" content={t('seo.faq_title')} />
        <meta property="og:description" content={t('seo.faq_desc')} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <div className="min-h-screen bg-white dark:bg-slate-950 pt-32 pb-20 transition-colors duration-300">
      {/* Header */}
      <div className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-display font-bold text-slate-900 dark:text-white mb-4 transition-colors duration-300"
          >
            {t('pages.faq.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl transition-colors duration-300"
          >
            {t('pages.faq.subtitle')}
          </motion.p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('pages.faq.search_placeholder') || "Search for a question..."}
              className="w-full px-6 py-5 pr-14 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 focus:border-primary-green focus:ring-4 focus:ring-primary-green/10 transition-all outline-none text-lg text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400"
            />
            <Search size={24} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 transition-colors duration-300" />
          </div>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4 mb-16">
          {filteredFaqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left"
              >
                <span className="text-lg font-bold text-slate-900 pr-4">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown size={24} className="text-slate-400" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6">
                      <p className="text-slate-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-primary-green to-primary-teal rounded-[3rem] p-12 text-center text-white"
        >
          <CheckCircle size={48} className="mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">
            {t('pages.faq.contact_cta')}
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            {t('pages.contact.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+966500000000"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-primary-green rounded-2xl font-bold text-lg hover:scale-105 transition-transform"
            >
              <Phone size={24} />
              +966 500 000 000
            </a>
            <a
              href="mailto:info@softycode.com"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/10 text-white rounded-2xl font-bold text-lg hover:bg-white/20 transition-all"
            >
              <Mail size={24} />
              info@softycode.com
            </a>
          </div>
        </motion.div>
      </div>
    </div>
    </>
  );
};