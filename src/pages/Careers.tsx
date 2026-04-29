import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Briefcase, MapPin, Calendar, DollarSign, Users, Award, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const positions = [
  {
    id: 1,
    title: 'مطور React Frontend',
    department: 'تطوير الويب',
    location: 'الرياض',
    type: 'دوام كامل',
    salary: '8,000 - 12,000 ر.س',
    description: 'نبحث عن مطور React مبدع لانضمام إلى فريقنا. يجب أن يكون لديك خبرة في React, TypeScript, و Tailwind CSS.',
    requirements: [
      'خبرة 3+ سنوات في تطوير React',
      'معرفة جيدة بـ TypeScript',
      'فهم عميق لـ CSS و Tailwind CSS',
      'قدرة على العمل بشكل مستقل',
    ],
    benefits: [
      'راتب تنافسي',
      'تأمين صحي',
      'إجازات سنوية',
      'دورات تدريبية',
    ],
  },
  {
    id: 2,
    title: 'مطور Backend Node.js',
    department: 'تطوير الويب',
    location: 'الرياض',
    type: 'دوام كامل',
    salary: '10,000 - 15,000 ر.س',
    description: 'نبحث عن مطور Node.js مبدع لانضمام إلى فريقنا. يجب أن يكون لديك خبرة في Node.js, Express, و MongoDB.',
    requirements: [
      'خبرة 3+ سنوات في تطوير Node.js',
      'معرفة جيدة بـ Express و MongoDB',
      'فهم عميق لـ REST APIs',
      'قدرة على العمل بشكل مستقل',
    ],
    benefits: [
      'راتب تنافسي',
      'تأمين صحي',
      'إجازات سنوية',
      'دورات تدريبية',
    ],
  },
  {
    id: 3,
    title: 'مصمم UI/UX',
    department: 'التصميم',
    location: 'الرياض',
    type: 'دوام كامل',
    salary: '6,000 - 10,000 ر.س',
    description: 'نبحث عن مصمم UI/UX مبدع لانضمام إلى فريقنا. يجب أن يكون لديك خبرة في تصميم الواجهات وتجربة المستخدم.',
    requirements: [
      'خبرة 2+ سنوات في تصميم UI/UX',
      'معرفة جيدة بـ Figma و Adobe XD',
      'فهم عميق لـ UX principles',
      'قدرة على العمل بشكل مستقل',
    ],
    benefits: [
      'راتب تنافسي',
      'تأمين صحي',
      'إجازات سنوية',
      'دورات تدريبية',
    ],
  },
  {
    id: 4,
    title: 'مطور Flutter',
    department: 'تطوير التطبيقات',
    location: 'الرياض',
    type: 'دوام كامل',
    salary: '9,000 - 14,000 ر.س',
    description: 'نبحث عن مطور Flutter مبدع لانضمام إلى فريقنا. يجب أن يكون لديك خبرة في تطوير تطبيقات الجوال.',
    requirements: [
      'خبرة 2+ سنوات في تطوير Flutter',
      'معرفة جيدة بـ Dart',
      'فهم عميق لـ iOS و Android',
      'قدرة على العمل بشكل مستقل',
    ],
    benefits: [
      'راتب تنافسي',
      'تأمين صحي',
      'إجازات سنوية',
      'دورات تدريبية',
    ],
  },
];

export const Careers = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-display font-bold text-slate-900 mb-4"
          >
            الوظائف المتاحة
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-600 max-w-2xl"
          >
            انضم إلينا وكن جزءاً من فريقنا المبدع
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
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 text-center">
            <Users size={32} className="text-primary-green mx-auto mb-3" />
            <p className="text-3xl font-bold text-slate-900">50+</p>
            <p className="text-slate-600">موظف</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 text-center">
            <Award size={32} className="text-primary-green mx-auto mb-3" />
            <p className="text-3xl font-bold text-slate-900">10+</p>
            <p className="text-slate-600">سنوات خبرة</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 text-center">
            <Briefcase size={32} className="text-primary-green mx-auto mb-3" />
            <p className="text-3xl font-bold text-slate-900">100+</p>
            <p className="text-slate-600">مشروع ناجح</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 text-center">
            <CheckCircle size={32} className="text-primary-green mx-auto mb-3" />
            <p className="text-3xl font-bold text-slate-900">100%</p>
            <p className="text-slate-600">رضا العملاء</p>
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
              className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="p-8">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-4 py-2 bg-primary-green/10 text-primary-green rounded-full text-sm font-bold">
                        {position.department}
                      </span>
                      <span className="px-4 py-2 bg-slate-100 text-slate-600 rounded-full text-sm font-bold">
                        {position.type}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">
                      {position.title}
                    </h3>
                    <p className="text-slate-600 mb-6">
                      {position.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center gap-3 text-slate-600">
                        <MapPin size={20} className="text-primary-green flex-shrink-0" />
                        <span>{position.location}</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-600">
                        <DollarSign size={20} className="text-primary-green flex-shrink-0" />
                        <span>{position.salary}</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-600">
                        <Calendar size={20} className="text-primary-green flex-shrink-0" />
                        <span>متاح فوراً</span>
                      </div>
                    </div>
                  </div>

                  <button className="px-8 py-4 bg-brand-gradient text-white rounded-2xl font-bold hover:shadow-xl transition-all whitespace-nowrap">
                    التقديم الآن
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mt-8 pt-8 border-t border-slate-100">
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <CheckCircle size={20} className="text-primary-green" />
                      المتطلبات
                    </h4>
                    <ul className="space-y-2">
                      {position.requirements.map((req, i) => (
                        <li key={i} className="flex items-start gap-2 text-slate-600">
                          <span className="text-primary-green mt-1">•</span>
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <CheckCircle size={20} className="text-primary-green" />
                      المميزات
                    </h4>
                    <ul className="space-y-2">
                      {position.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-2 text-slate-600">
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
            لا تجد الوظيفة المناسبة؟
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            أرسل سيرتك الذاتية وسنقوم بالتواصل معك عند وجود فرصة مناسبة
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-primary-green rounded-2xl font-bold text-lg hover:scale-105 transition-transform"
          >
            أرسل سيرتك الذاتية
            <ArrowLeft size={20} />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};