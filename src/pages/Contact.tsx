import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, MessageSquare, MapPin, Phone, Send, Instagram, Twitter, Linkedin, CheckCircle, AlertCircle, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useContactInfo } from '@/hooks/useFirestore';
import { Loader as GlobalLoader } from '@/components/Loader';

export const Contact = () => {
  const { contact, loading } = useContactInfo();
  const [formData, setFormData] = useState({ name: '', email: '', projectType: '', message: '' });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-32">
        <GlobalLoader text="جاري تحميل معلومات الاتصال..." />
      </div>
    );
  }

  const contactInfo = contact || {
    phone: '+966 500 000 000',
    email: 'info@softycode.com',
    address: 'الرياض، المملكة العربية السعودية',
    workingHours: 'من الأحد إلى الخميس، 9 صباحاً - 5 مساءً',
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
      title: 'البريد الإلكتروني',
      value: contactInfo.email,
      link: `mailto:${contactInfo.email}`,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Phone,
      title: 'اتصل بنا',
      value: contactInfo.phone,
      link: `tel:${contactInfo.phone}`,
      color: 'from-emerald-500 to-teal-500',
    },
    {
      icon: MapPin,
      title: 'الموقع',
      value: contactInfo.address,
      link: '#',
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: MessageSquare,
      title: 'ساعات العمل',
      value: contactInfo.workingHours,
      link: '#',
      color: 'from-purple-500 to-pink-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 pt-32 pb-20">
      {/* Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-green/10 text-primary-green font-semibold text-sm">
            <Zap size={16} />
            نحن هنا لمساعدتك
          </span>
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-display-lg text-slate-900 mb-6"
        >
          تواصل <span className="text-brand-gradient">معنا الآن</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-slate-600 max-w-2xl mx-auto"
        >
          نحن هنا للإجابة على استفساراتك ومساعدتك في اختيار الحل الأنسب لمشروعك القادم.
        </motion.p>
      </div>

      {/* Contact Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactItems.map((item, idx) => (
            <motion.a
              key={idx}
              href={item.link}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="card-elevated group hover:border-primary-green/50 p-6"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <item.icon size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-slate-600 font-medium group-hover:text-primary-green transition-colors">{item.value}</p>
            </motion.a>
          ))}
        </div>
      </div>

      {/* Main Contact Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card-elevated overflow-hidden"
        >
          <div className="grid lg:grid-cols-5 gap-0">
            {/* Left Side - Info */}
            <div className="lg:col-span-2 bg-gradient-to-br from-slate-900 to-slate-800 p-12 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary-green/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
              
              <div className="relative z-10">
                <h2 className="text-3xl font-display font-bold mb-12">معلومات إضافية</h2>
                
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
                  <h4 className="font-bold mb-6 text-xs uppercase tracking-widest text-slate-400">تابعنا على وسائل التواصل</h4>
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
            <div className="lg:col-span-3 p-12">
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
                    <span className="text-emerald-700 font-semibold">شكراً! تم إرسال رسالتك بنجاح</span>
                  </motion.div>
                )}

                <div className="grid md:grid-cols-2 gap-6">
                  <motion.div className="space-y-2" whileHover={{ y: -2 }}>
                    <label className="font-bold text-slate-800 text-sm block">الاسم الكامل</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="input-primary w-full"
                      placeholder="أحمد علي محمد"
                    />
                  </motion.div>
                  <motion.div className="space-y-2" whileHover={{ y: -2 }}>
                    <label className="font-bold text-slate-800 text-sm block">البريد الإلكتروني</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="input-primary w-full"
                      placeholder="ali@example.com"
                    />
                  </motion.div>
                </div>

                <motion.div className="space-y-2" whileHover={{ y: -2 }}>
                  <label className="font-bold text-slate-800 text-sm block">نوع المشروع</label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="input-primary w-full"
                  >
                    <option value="">اختر نوع المشروع</option>
                    <option>نظام محاسبي</option>
                    <option>متجر إلكتروني</option>
                    <option>نظام إدارة</option>
                    <option>تطبيق موبايل</option>
                    <option>غير ذلك</option>
                  </select>
                </motion.div>

                <motion.div className="space-y-2" whileHover={{ y: -2 }}>
                  <label className="font-bold text-slate-800 text-sm block">الرسالة</label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="input-primary w-full h-40"
                    placeholder="أخبرنا عن فكرتك وتطلعاتك..."
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
                      إرسال الرسالة
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
