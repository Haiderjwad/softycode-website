import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowUp, Mail, Phone, MapPin, Clock,
  X as XIcon, Linkedin, Instagram, Facebook, Github, Globe,
} from 'lucide-react';
import { Logo } from './Logo';
import { useContactInfo } from '../hooks/useFirestore';

// ========================
// نوع رابط السوشل ميديا
// ========================
interface SocialLink {
  key: string;
  label: string;
  url: string;
  icon: React.ReactNode;
  hoverColor: string;
}

// ========================
// تعريف جميع منصات السوشل ميديا المدعومة
// ========================
const SOCIAL_PLATFORM_MAP: Record<string, { label: string; icon: React.ReactNode; hoverColor: string }> = {
  twitter: {
    label: 'X (Twitter)',
    icon: <XIcon size={20} />,
    hoverColor: 'hover:text-white hover:bg-black',
  },
  x: {
    label: 'X',
    icon: <XIcon size={20} />,
    hoverColor: 'hover:text-white hover:bg-black',
  },
  linkedin: {
    label: 'LinkedIn',
    icon: <Linkedin size={20} />,
    hoverColor: 'hover:text-white hover:bg-[#0A66C2]',
  },
  instagram: {
    label: 'Instagram',
    icon: <Instagram size={20} />,
    hoverColor: 'hover:text-white hover:bg-gradient-to-br hover:from-[#f09433] hover:via-[#e6683c] hover:via-[#dc2743] hover:via-[#cc2366] hover:to-[#bc1888]',
  },
  facebook: {
    label: 'Facebook',
    icon: <Facebook size={20} />,
    hoverColor: 'hover:text-white hover:bg-[#1877F2]',
  },
  github: {
    label: 'GitHub',
    icon: <Github size={20} />,
    hoverColor: 'hover:text-white hover:bg-[#24292F]',
  },
};

// ========================
// قيم افتراضية عند عدم وجود بيانات
// ========================
const DEFAULT_SOCIAL_LINKS: SocialLink[] = [
  { key: 'twitter', label: 'X', url: '#', icon: <XIcon size={20} />, hoverColor: 'hover:text-white hover:bg-black' },
  { key: 'linkedin', label: 'LinkedIn', url: '#', icon: <Linkedin size={20} />, hoverColor: 'hover:text-white hover:bg-[#0A66C2]' },
  { key: 'instagram', label: 'Instagram', url: '#', icon: <Instagram size={20} />, hoverColor: 'hover:text-white hover:bg-pink-600' },
  { key: 'facebook', label: 'Facebook', url: '#', icon: <Facebook size={20} />, hoverColor: 'hover:text-white hover:bg-[#1877F2]' },
];

export const Footer = () => {
  const { contact, loading: contactLoading } = useContactInfo();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { name: 'الرئيسية', path: '/' },
    { name: 'خدماتنا', path: '/services' },
    { name: 'منتجاتنا', path: '/products' },
    { name: 'المدونة', path: '/blog' },
    { name: 'الوظائف', path: '/careers' },
    { name: 'من نحن', path: '/about' },
    { name: 'الأسئلة الشائعة', path: '/faq' },
    { name: 'اتصل بنا', path: '/contact' },
  ];

  const legalLinks = [
    { name: 'سياسة الخصوصية', path: '/privacy' },
    { name: 'الشروط والأحكام', path: '/terms' },
    { name: 'الوظائف', path: '/careers' },
  ];

  // ====================================================
  // بناء قائمة روابط السوشل ميديا من contact.socialMedia
  // ====================================================
  const getSocialLinks = (): SocialLink[] => {
    const sm = contact?.socialMedia;
    if (!sm || Object.keys(sm).length === 0) return DEFAULT_SOCIAL_LINKS;

    const links: SocialLink[] = [];
    // الترتيب المفضل: تويتر → انستغرام → فيسبوك → لينكدإن → جيتهاب
    const preferredOrder = ['twitter', 'x', 'instagram', 'facebook', 'linkedin', 'github'];

    preferredOrder.forEach((key) => {
      const url = sm[key];
      if (url) {
        const platform = SOCIAL_PLATFORM_MAP[key];
        if (platform) {
          links.push({ key, label: platform.label, url, icon: platform.icon, hoverColor: platform.hoverColor });
        }
      }
    });

    // أي مفاتيح أخرى غير موجودة في القائمة المفضلة
    Object.entries(sm).forEach(([key, url]) => {
      if (!preferredOrder.includes(key) && url) {
        links.push({ key, label: key, url: url as string, icon: <Globe size={20} />, hoverColor: 'hover:text-primary-green' });
      }
    });

    return links.length > 0 ? links : DEFAULT_SOCIAL_LINKS;
  };

  const socialLinks = getSocialLinks();

  const contactItems = contact ? [
    contact.email && { icon: <Mail size={16} className="flex-shrink-0" />, label: contact.email, dir: 'ltr' },
    contact.phone && { icon: <Phone size={16} className="flex-shrink-0" />, label: contact.phone, dir: 'ltr' },
    contact.address && { icon: <MapPin size={16} className="flex-shrink-0" />, label: contact.address, dir: 'rtl' },
    contact.workingHours && { icon: <Clock size={16} className="flex-shrink-0" />, label: contact.workingHours, dir: 'rtl' },
  ].filter(Boolean) as { icon: React.ReactNode; label: string; dir: string }[] : [
    { icon: <Mail size={16} className="flex-shrink-0" />, label: 'info@softycode.com', dir: 'ltr' },
    { icon: <Phone size={16} className="flex-shrink-0" />, label: '+966 500 000 000', dir: 'ltr' },
    { icon: <MapPin size={16} className="flex-shrink-0" />, label: 'الرياض، المملكة العربية السعودية', dir: 'rtl' },
  ];

  return (
    <footer className="bg-gradient-to-b from-slate-900 to-primary-navy pt-24 pb-12 overflow-hidden relative">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-green/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 blur-3xl rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-16 mb-16">

          {/* ── Brand + Social + Contact ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            {/* ── Logo Card ── */}
            <Link to="/" className="inline-block mb-8 group">
              <div className="relative inline-flex p-[2px] rounded-xl"
                style={{ background: 'linear-gradient(135deg, #22c55e, #14b8a6, #22c55e)' }}>
                <div className="bg-white rounded-[10px] px-4 py-2 flex items-center justify-center shadow-lg shadow-primary-green/20 transition-all duration-300 group-hover:shadow-primary-green/35">
                  <Logo size="md" />
                </div>
              </div>
            </Link>
            <p className="text-slate-300 text-base mb-10 max-w-sm leading-relaxed">
              شريكك التقني الأمثل لبناء حلول سحابية ذكية بلمسة ناعمة. نحوّل تعقيدات البرمجة إلى أنظمة سهلة وفعّالة تدعم رؤيتك للمستقبل.
            </p>

            {/* ── Social Media Icons ── */}
            <div className="flex flex-wrap gap-3 mb-10">
              {contactLoading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="w-12 h-12 rounded-2xl bg-slate-800 animate-pulse" />
                ))
              ) : (
                socialLinks.map(({ key, label, url, icon, hoverColor }, i) => (
                  <motion.a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    title={label}
                    whileHover={{ scale: 1.12, y: -4 }}
                    whileTap={{ scale: 0.92 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07 }}
                    className={`w-12 h-12 rounded-2xl border border-slate-700 bg-slate-800/60 backdrop-blur-sm flex items-center justify-center text-slate-400 transition-all duration-300 ${hoverColor}`}
                  >
                    {icon}
                  </motion.a>
                ))
              )}
            </div>

            {/* ── Contact Info ── */}
            <div className="space-y-3">
              {contactLoading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="h-5 bg-slate-800 rounded-lg animate-pulse w-3/4" />
                ))
              ) : (
                contactItems.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.08 }}
                    className="flex items-start gap-3 text-sm text-slate-400 group"
                  >
                    <span className="mt-0.5 text-primary-green/70 group-hover:text-primary-green transition-colors">
                      {item.icon}
                    </span>
                    <span
                      dir={item.dir}
                      className="group-hover:text-slate-200 transition-colors"
                      style={item.dir === 'ltr' ? { textAlign: 'left' } : {}}
                    >
                      {item.label}
                    </span>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>

          {/* ── Quick Links ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="font-bold text-white text-lg mb-8 font-display">الروابط السريعة</h4>
            <ul className="space-y-4">
              {quickLinks.map((link, i) => (
                <motion.li key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
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

          {/* ── Legal Links ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="font-bold text-white text-lg mb-8 font-display">قانوني</h4>
            <ul className="space-y-4">
              {legalLinks.map((link, i) => (
                <motion.li key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
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

          {/* ── Newsletter ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="font-bold text-white text-lg mb-8 font-display">النشرة البريدية</h4>
            <p className="text-slate-400 text-sm mb-6">اشترك لتتلقى آخر أخبارنا والعروض الحصرية</p>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="بريدك الإلكتروني"
                className="input-primary w-full"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-2 bg-brand-gradient text-white rounded-lg font-semibold text-sm hover-glow transition-all"
              >
                اشترك الآن
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* ── Divider ── */}
        <div className="h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent mb-10" />

        {/* ── Bottom Bar ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-center gap-6"
        >
          <div className="text-sm text-slate-400 font-medium">
            © {new Date().getFullYear()} SoftyCode. جميع الحقوق محفوظة.
          </div>

          <div className="flex items-center gap-4">
            {contact?.address && (
              <span className="text-xs text-slate-500 flex items-center gap-1">
                <MapPin size={11} className="text-slate-600" />
                {contact.address}
              </span>
            )}
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
