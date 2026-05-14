import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Briefcase, MapPin, Calendar, DollarSign, Users, Award, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

// Job positions by language
const positionsData = {
  ar: [
    {
      id: 1,
      title: 'مطور Front-End (React)',
      department: 'قسم تطوير الويب',
      location: 'الرياض، المملكة العربية السعودية',
      type: 'دوام كامل',
      salary: '8,000 - 12,000 ريال',
      description: 'نبحث عن مطور Front-End مبدع للإنضمام إلى فريقنا. يجب أن تكون لديك خبرة في React، TypeScript، و Tailwind CSS.',
      requirements: [
        'خبرة 3+ سنوات في تطوير React',
        'معرفة قوية بـ TypeScript',
        'فهم عميق لـ CSS و Tailwind CSS',
        'القدرة على العمل بشكل مستقل',
      ],
      benefits: [
        'راتب تنافسي',
        'تأمين صحي',
        'إجازة سنوية',
        'دورات تدريبية',
      ],
    },
    {
      id: 2,
      title: 'مطور Backend (Node.js)',
      department: 'قسم تطوير الويب',
      location: 'الرياض، المملكة العربية السعودية',
      type: 'دوام كامل',
      salary: '10,000 - 15,000 ريال',
      description: 'نبحث عن مطور Node.js مبدع للإنضمام إلى فريقنا. يجب أن يكون لديك خبرة في Node.js، Express، و MongoDB.',
      requirements: [
        'خبرة 3+ سنوات في تطوير Node.js',
        'معرفة قوية بـ Express و MongoDB',
        'فهم عميق لـ REST APIs',
        'القدرة على العمل بشكل مستقل',
      ],
      benefits: [
        'راتب تنافسي',
        'تأمين صحي',
        'إجازة سنوية',
        'دورات تدريبية',
      ],
    },
    {
      id: 3,
      title: 'مصمم UI/UX',
      department: 'قسم التصميم',
      location: 'الرياض، المملكة العربية السعودية',
      type: 'دوام كامل',
      salary: '6,000 - 10,000 ريال',
      description: 'نبحث عن مصمم UI/UX مبدع للإنضمام إلى فريقنا. يجب أن يكون لديك خبرة في تصميم الواجهات وتجربة المستخدم.',
      requirements: [
        'خبرة 2+ سنوات في تصميم UI/UX',
        'معرفة قوية بـ Figma و Adobe XD',
        'فهم عميق لمبادئ UX',
        'القدرة على العمل بشكل مستقل',
      ],
      benefits: [
        'راتب تنافسي',
        'تأمين صحي',
        'إجازة سنوية',
        'دورات تدريبية',
      ],
    },
    {
      id: 4,
      title: 'مطور Flutter',
      department: 'قسم تطوير التطبيقات',
      location: 'الرياض، المملكة العربية السعودية',
      type: 'دوام كامل',
      salary: '9,000 - 14,000 ريال',
      description: 'نبحث عن مطور Flutter مبدع للإنضمام إلى فريقنا. يجب أن يكون لديك خبرة في تطوير تطبيقات الجوال.',
      requirements: [
        'خبرة 2+ سنوات في تطوير Flutter',
        'معرفة قوية بـ Dart',
        'فهم عميق لـ iOS و Android',
        'القدرة على العمل بشكل مستقل',
      ],
      benefits: [
        'راتب تنافسي',
        'تأمين صحي',
        'إجازة سنوية',
        'دورات تدريبية',
      ],
    },
  ],
  en: [
    {
      id: 1,
      title: 'Front-End Developer (React)',
      department: 'Web Development',
      location: 'Riyadh, Saudi Arabia',
      type: 'Full-time',
      salary: '$3,000 - $4,500',
      description: 'We are looking for a creative Front-End developer to join our team. You must have experience with React, TypeScript, and Tailwind CSS.',
      requirements: [
        '3+ years of React development experience',
        'Strong knowledge of TypeScript',
        'Deep understanding of CSS and Tailwind CSS',
        'Ability to work independently',
      ],
      benefits: [
        'Competitive salary',
        'Health insurance',
        'Annual leave',
        'Training courses',
      ],
    },
    {
      id: 2,
      title: 'Backend Developer (Node.js)',
      department: 'Web Development',
      location: 'Riyadh, Saudi Arabia',
      type: 'Full-time',
      salary: '$4,000 - $6,000',
      description: 'We are looking for a creative Node.js developer to join our team. You must have experience with Node.js, Express, and MongoDB.',
      requirements: [
        '3+ years of Node.js development experience',
        'Strong knowledge of Express and MongoDB',
        'Deep understanding of REST APIs',
        'Ability to work independently',
      ],
      benefits: [
        'Competitive salary',
        'Health insurance',
        'Annual leave',
        'Training courses',
      ],
    },
    {
      id: 3,
      title: 'UI/UX Designer',
      department: 'Design',
      location: 'Riyadh, Saudi Arabia',
      type: 'Full-time',
      salary: '$2,500 - $4,000',
      description: 'We are looking for a creative UI/UX Designer to join our team. You should have experience in designing interfaces and user experience.',
      requirements: [
        '2+ years of UI/UX design experience',
        'Strong knowledge of Figma and Adobe XD',
        'Deep understanding of UX principles',
        'Ability to work independently',
      ],
      benefits: [
        'Competitive salary',
        'Health insurance',
        'Annual leave',
        'Training courses',
      ],
    },
    {
      id: 4,
      title: 'Flutter Developer',
      department: 'Mobile Development',
      location: 'Riyadh, Saudi Arabia',
      type: 'Full-time',
      salary: '$3,500 - $5,500',
      description: 'We are looking for a creative Flutter developer to join our team. You must have experience in developing mobile apps.',
      requirements: [
        '2+ years of Flutter development experience',
        'Strong knowledge of Dart',
        'Deep understanding of iOS and Android',
        'Ability to work independently',
      ],
      benefits: [
        'Competitive salary',
        'Health insurance',
        'Annual leave',
        'Training courses',
      ],
    },
  ],
};

export const Careers = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const isArabic = currentLanguage === 'ar';
  const positions = positionsData[isArabic ? 'ar' : 'en'];

  return (
    <>
      <Helmet>
        <title>{t('seo.careers_title')}</title>
        <meta name="description" content={t('seo.careers_desc')} />
        <meta property="og:title" content={t('seo.careers_title')} />
        <meta property="og:description" content={t('seo.careers_desc')} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <div className="min-h-screen bg-slate-50 dark:bg-gray-900 pt-32 pb-20 transition-colors duration-300">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-slate-100 dark:border-gray-700 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-display font-bold text-slate-900 dark:text-white mb-4"
          >
            {t('pages.careers.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl"
          >
            {t('pages.careers.subtitle')}
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-gray-700 text-center transition-colors duration-300">
            <Users size={32} className="text-primary-green mx-auto mb-3" />
            <p className="text-3xl font-bold text-slate-900 dark:text-white">50+</p>
            <p className="text-slate-600 dark:text-slate-300">{t('pages.careers.stats_employees')}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-gray-700 text-center transition-colors duration-300">
            <Award size={32} className="text-primary-green mx-auto mb-3" />
            <p className="text-3xl font-bold text-slate-900 dark:text-white">10+</p>
            <p className="text-slate-600 dark:text-slate-300">{t('pages.careers.stats_experience')}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-gray-700 text-center transition-colors duration-300">
            <Briefcase size={32} className="text-primary-green mx-auto mb-3" />
            <p className="text-3xl font-bold text-slate-900 dark:text-white">100+</p>
            <p className="text-slate-600 dark:text-slate-300">{t('pages.careers.stats_projects')}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-gray-700 text-center transition-colors duration-300">
            <CheckCircle size={32} className="text-primary-green mx-auto mb-3" />
            <p className="text-3xl font-bold text-slate-900 dark:text-white">100%</p>
            <p className="text-slate-600 dark:text-slate-300">{t('pages.careers.stats_satisfaction')}</p>
          </div>
        </motion.div>

        {/* Positions */}
        <div className="space-y-8">
          {positions.map((position, index) => (
            <motion.div
              key={position.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-slate-100 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="p-8">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-4 py-2 bg-primary-green/10 text-primary-green rounded-full text-sm font-bold">
                        {position.department}
                      </span>
                      <span className="px-4 py-2 bg-slate-100 dark:bg-gray-700 text-slate-600 dark:text-slate-300 rounded-full text-sm font-bold">
                        {position.type}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                      {position.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 mb-6">
                      {position.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                        <MapPin size={20} className="text-primary-green flex-shrink-0" />
                        <span>{position.location}</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                        <DollarSign size={20} className="text-primary-green flex-shrink-0" />
                        <span>{position.salary}</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                        <Calendar size={20} className="text-primary-green flex-shrink-0" />
                        <span>{t('common.available_now')}</span>
                      </div>
                    </div>
                  </div>

                  <button className="px-8 py-4 bg-brand-gradient text-white rounded-2xl font-bold hover:shadow-xl transition-all whitespace-nowrap">
                    {t('pages.careers.apply_now')}
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mt-8 pt-8 border-t border-slate-100 dark:border-gray-700">
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                      <CheckCircle size={20} className="text-primary-green" />
                      {t('pages.careers.req_title')}
                    </h4>
                    <ul className="space-y-2">
                      {position.requirements.map((req, i) => (
                        <li key={i} className="flex items-start gap-2 text-slate-600 dark:text-slate-300">
                          <span className="text-primary-green mt-1">•</span>
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                      <CheckCircle size={20} className="text-primary-green" />
                      {t('pages.careers.ben_title')}
                    </h4>
                    <ul className="space-y-2">
                      {position.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-2 text-slate-600 dark:text-slate-300">
                          <span className="text-primary-green mt-1">•</span>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 bg-gradient-to-r from-primary-green to-primary-teal rounded-[3rem] p-12 text-center text-white"
        >
          <Briefcase size={48} className="mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">
            {t('pages.careers.no_job_title')}
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            {t('pages.careers.no_job_desc')}
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white dark:bg-gray-900 text-primary-green rounded-2xl font-bold text-lg hover:scale-105 transition-transform"
          >
            {t('pages.careers.send_cv')}
            <ArrowLeft size={20} />
          </Link>
        </motion.div>
      </div>
    </div>
    </>
  );
};