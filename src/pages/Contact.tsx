import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Mail, MessageSquare, MapPin, Phone, Send, Instagram, Twitter, Linkedin, CheckCircle, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useContactInfo } from '@/hooks/useFirestore';
import { Loader as GlobalLoader } from '@/components/Loader';

export const Contact = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const { contact, loading } = useContactInfo();
  const [formData, setFormData] = useState({ name: '', email: '', projectType: '', message: '' });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // Form labels based on current language
  const formLabels = {
    nameLabel: isArabic ? 'الاسم الكامل' : 'Full Name',
    namePlaceholder: isArabic ? 'أحمد علي' : 'Ahmed Ali',
    emailLabel: isArabic ? 'البريد الإلكتروني' : 'Email Address',
    emailPlaceholder: isArabic ? 'ahmed@example.com' : 'ahmed@example.com',
    projectLabel: isArabic ? 'نوع المشروع' : 'Project Type',
    projectPlaceholder: isArabic ? 'اختر نوع المشروع' : 'Select project type',
    projectOptions: isArabic
      ? ['نظام محاسبي', 'متجر إلكتروني', 'نظام إدارة', 'تطبيق موبايل', 'أخرى']
      : ['Accounting System', 'E-commerce Store', 'Management System', 'Mobile App', 'Other'],
    messageLabel: isArabic ? 'الرسالة' : 'Message',
    messagePlaceholder: isArabic
      ? 'أخبرنا عن فكرتك وتوقعاتك...'
      : 'Tell us about your idea and expectations...',
    buttonSend: isArabic ? 'إرسال الرسالة' : 'Send Message',
    buttonSending: isArabic ? 'جاري الإرسال...' : 'Sending...',
    successMessage: isArabic
      ? 'شكراً! تم إرسال رسالتك بنجاح'
      : 'Thank you! Your message has been sent successfully',
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-32">
        <GlobalLoader text={t('common.loading')} />
      </div>
    );
  }

  const contactInfo = contact || {
    phone: '+966 500 000 000',
    email: 'info@softycode.com',
    address: isArabic ? 'الرياض، المملكة العربية السعودية' : 'Riyadh, Saudi Arabia',
    workingHours: isArabic ? 'الأحد - الخميس, 9 ص - 5 م' : 'Sunday - Thursday, 9 AM - 5 PM',
    socialMedia: {
      twitter: '#',
      instagram: '#',
      linkedin: '#',
    },
  };

  const socialLinks = [
    { icon: Twitter, url: contactInfo.socialMedia.twitter || '#', label: 'Twitter', color: 'hover:text-blue-400' },
    { icon: Linkedin, url: contactInfo.socialMedia.linkedin || '#', label: 'LinkedIn', color: 'hover:text-blue-600' },
    { icon: Instagram, url: contactInfo.socialMedia.instagram || '#', label: 'Instagram', color: 'hover:text-pink-500' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('loading');
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', projectType: '', message: '' });
      setTimeout(() => setSubmitStatus('idle'), 3000);
    } catch {
      setSubmitStatus('error');
    }
  };

  const contactItems = [
    {
      icon: Mail,
      title: isArabic ? 'البريد الإلكتروني' : 'Email',
      value: contactInfo.email,
      link: `mailto:${contactInfo.email}`,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Phone,
      title: isArabic ? 'الهاتف' : 'Phone',
      value: contactInfo.phone,
      link: `tel:${contactInfo.phone}`,
      color: 'from-emerald-500 to-teal-500',
    },
    {
      icon: MapPin,
      title: isArabic ? 'العنوان' : 'Address',
      value: contactInfo.address || (isArabic ? 'الرياض، المملكة العربية السعودية' : 'Riyadh, Saudi Arabia'),
      link: '#',
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: MessageSquare,
      title: isArabic ? 'ساعات العمل' : 'Working Hours',
      value: contactInfo.workingHours,
      link: '#',
      color: 'from-purple-500 to-pink-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-32 pb-20 transition-colors duration-300">
      {/* Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-green/10 dark:bg-primary-green/20 text-primary-green font-semibold text-sm">
            <Zap size={16} />
            {t('pages.contact.subtitle')}
          </span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-display-lg text-slate-900 dark:text-white mb-6"
        >
          {t('pages.contact.title')}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto"
        >
          {t('pages.contact.subtitle')}
        </motion.p>
      </div>

      {/* Main Contact Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card-elevated overflow-hidden bg-white dark:bg-gray-800 border border-slate-100 dark:border-gray-700 transition-colors duration-300"
        >
          <div className="grid lg:grid-cols-5 gap-0">
            {/* Left Side - Info */}
            <div className="lg:col-span-2 bg-gradient-to-br from-slate-900 to-slate-800 p-12 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary-green/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />

              <div className="relative z-10">
                <h2 className="text-3xl font-display font-bold mb-12">{t('pages.contact.title')}</h2>

                <div className="space-y-8 mb-16">
                  {contactItems.map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + idx * 0.1 }}
                      className="flex gap-4 items-start"
                    >
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0`}>
                        <item.icon size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold text-base mb-1">{item.title}</h4>
                        <p className="text-slate-300 text-sm">{item.value}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Social Links */}
                <div>
                  <h4 className="font-bold mb-6 text-xs uppercase tracking-widest text-slate-400">
                    {isArabic ? 'تابعنا على مواقع التواصل' : 'Follow us on social media'}
                  </h4>
                  <div className="flex gap-4">
                    {socialLinks.map((social, i) => (
                      <motion.a
                        key={i}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1, y: -3 }}
                        whileTap={{ scale: 0.95 }}
                        className={`w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center ${social.color} transition-all hover:bg-white/20`}
                      >
                        <social.icon size={20} />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="lg:col-span-3 p-12 bg-white dark:bg-gray-800 transition-colors duration-300">
              <motion.form
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                onSubmit={handleSubmit}
                className="space-y-8"
              >
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3"
                  >
                    <CheckCircle size={20} className="text-emerald-600" />
                    <span className="text-emerald-700 font-semibold">{formLabels.successMessage}</span>
                  </motion.div>
                )}

                <div className="grid md:grid-cols-2 gap-6">
                  <motion.div className="space-y-2" whileHover={{ y: -2 }}>
                    <label className="font-bold text-slate-800 dark:text-slate-200 text-sm block">{formLabels.nameLabel}</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="input-primary w-full"
                      placeholder={formLabels.namePlaceholder}
                    />
                  </motion.div>
                  <motion.div className="space-y-2" whileHover={{ y: -2 }}>
                    <label className="font-bold text-slate-800 dark:text-slate-200 text-sm block">{formLabels.emailLabel}</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="input-primary w-full"
                      placeholder={formLabels.emailPlaceholder}
                    />
                  </motion.div>
                </div>

                <motion.div className="space-y-2" whileHover={{ y: -2 }}>
                  <label className="font-bold text-slate-800 dark:text-slate-200 text-sm block">{formLabels.projectLabel}</label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="input-primary w-full"
                  >
                    <option value="">{formLabels.projectPlaceholder}</option>
                    {formLabels.projectOptions.map((option, idx) => (
                      <option key={idx} value={option}>{option}</option>
                    ))}
                  </select>
                </motion.div>

                <motion.div className="space-y-2" whileHover={{ y: -2 }}>
                  <label className="font-bold text-slate-800 dark:text-slate-200 text-sm block">{formLabels.messageLabel}</label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="input-primary w-full h-40"
                    placeholder={formLabels.messagePlaceholder}
                  />
                </motion.div>

                <motion.button
                  type="submit"
                  disabled={submitStatus === 'loading'}
                  whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(16, 185, 129, 0.3)" }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-brand-gradient text-white rounded-xl font-bold text-lg shadow-xl shadow-primary-green/30 hover:shadow-2xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {submitStatus === 'loading' ? (
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }}>
                      <Mail size={20} />
                    </motion.div>
                  ) : (
                    <>
                      {formLabels.buttonSend}
                      <Send size={20} />
                    </>
                  )}
                </motion.button>
              </motion.form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};