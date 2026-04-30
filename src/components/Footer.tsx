import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Twitter, Linkedin, Github, Globe, ArrowUp, Mail, Phone, MapPin } from 'lucide-react';
import { Logo } from './Logo';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { name: 'الرئيسية', path: '/' },
    { name: 'خدماتنا', path: '/services' },
    { name: 'منتجاتنا', path: '/products' },
    { name: 'المدونة', path: '/blog' },
    { name: 'الوظائف', path: '/careers' },
    { name: 'عن الشركة', path: '/about' },
    { name: 'الأسئلة الشائعة', path: '/faq' },
    { name: 'اتصل بنا', path: '/contact' },
  ];

  const legalLinks = [
    { name: 'سياسة الخصوصية', path: '/privacy' },
    { name: 'الشروط والأحكام', path: '/terms' },
    { name: 'الوظائف', path: '/careers' },
  ];

  const socialLinks = [
    { icon: Twitter, label: 'Twitter', url: '#' },
    { icon: Linkedin, label: 'LinkedIn', url: '#' },
    { icon: Github, label: 'GitHub', url: '#' },
  ];

  const contactInfo = [
    { icon: Mail, label: 'info@softycode.com', value: 'البريد الإلكتروني' },
    { icon: Phone, label: '+966 500 000 000', value: 'رقم الهاتف' },
    { icon: MapPin, label: 'الرياض، السعودية', value: 'الموقع' },
  ];

  return (
    <footer className="bg-gradient-to-b from-slate-900 to-primary-navy pt-24 pb-12 overflow-hidden relative">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-green/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 blur-3xl rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-16 mb-16">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <Link to="/" className="inline-block mb-8">
              <Logo className="h-12 text-white" />
            </Link>
            <p className="text-slate-300 text-base mb-10 max-w-sm leading-relaxed">
              شريكك التقني الأمثل لبناء حلول سحابية ذكية بلمسة ناعمة. نحول تعقيدات البرمجة إلى أنظمة سهلة وفعالة تدعم رؤيتك للمستقبل.
            </p>

            {/* Social Links */}
            <div className="flex gap-4 mb-8">
              {socialLinks.map(({ icon: Icon, label, url }, i) => (
                <motion.a
                  key={i}
                  href={url}
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-green/20 to-primary-teal/20 flex items-center justify-center text-slate-300 hover:text-primary-green hover:bg-primary-green/20 transition-all"
                  title={label}
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              {contactInfo.map(({ icon: Icon, label, value }, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center gap-3 text-sm text-slate-400 hover:text-primary-green transition-colors"
                >
                  <Icon size={16} className="flex-shrink-0" />
                  <span>{label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="font-bold text-white text-lg mb-8 font-display">الروابط السريعة</h4>
            <ul className="space-y-4">
              {quickLinks.map((link, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={link.path}
                    className="text-slate-400 font-medium hover:text-primary-green transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-primary-green rounded-full scale-0 group-hover:scale-100 transition-transform" />
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Legal Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="font-bold text-white text-lg mb-8 font-display">قانوني</h4>
            <ul className="space-y-4">
              {legalLinks.map((link, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={link.path}
                    className="text-slate-400 font-medium hover:text-primary-green transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-primary-green rounded-full scale-0 group-hover:scale-100 transition-transform" />
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="font-bold text-white text-lg mb-8 font-display">النشرة البريدية</h4>
            <p className="text-slate-400 text-sm mb-6">اشترك لتتلقى آخر أخبارنا والعروض الحصرية</p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="بريدك الإلكتروني"
                className="input-primary w-full"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-2 bg-brand-gradient text-white rounded-lg font-semibold text-sm hover-glow transition-all"
              >
                اشترك الآن
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent mb-10" />

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-center gap-6"
        >
          <div className="text-sm text-slate-400 font-medium">
            © {new Date().getFullYear()} SoftyCode. جميع الحقوق محفوظة. • صُنع بـ ❤️ في الرياض
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs text-slate-500">المملكة العربية السعودية</span>
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-green/20 to-primary-teal/20 flex items-center justify-center text-primary-green hover:bg-primary-green hover:text-white transition-all"
              title="العودة للأعلى"
            >
              <ArrowUp size={20} />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
