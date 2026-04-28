import React from 'react';
import { motion } from 'motion/react';
import {
  Code2,
  Zap,
  ChevronRight,
  CheckCircle2,
  ShieldCheck,
  Layers,
  MessageSquare,
  Globe
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute top-0 right-0 -z-10 w-1/3 h-1/3 bg-primary-green/5 blur-3xl rounded-full" />
        <div className="absolute bottom-0 left-0 -z-10 w-1/4 h-1/4 bg-blue-500/5 blur-3xl rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-green/10 text-primary-green font-semibold text-sm mb-6">
                <Zap size={16} />
                <span>مستقبل البرمجيات يبدأ بسحابة ذكية</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-display font-bold text-primary-navy leading-tight mb-6">
                نطور <span className="text-brand-gradient">أنظمة ويب</span> ذكية تدير أعمالك بلمسة ناعمة
              </h1>
              <p className="text-xl text-slate-500 leading-relaxed mb-10 max-w-xl">
                في SoftyCode، ندمج قوة الحلول السحابية مع واجهات مستخدم ناعمة وسلسة، لنحول تعقيدات الأنظمة إلى تجارب رقمية ممتعة.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/products" className="flex items-center justify-center gap-2 px-8 py-4 bg-brand-gradient text-white rounded-2xl font-bold text-lg shadow-xl shadow-primary-green/20 hover:scale-105 transition-transform">
                  اكتشف حلولنا <ChevronRight size={20} />
                </Link>
                <Link to="/contact" className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary-navy border-2 border-slate-100 rounded-2xl font-bold text-lg hover:border-primary-green transition-all shadow-sm">
                  تواصل معنا
                </Link>
              </div>

              <div className="mt-12 flex items-center gap-6">
                <div className="flex -space-x-reverse space-x-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200" />
                  ))}
                </div>
                <p className="text-sm text-slate-500">
                  <span className="font-bold text-slate-900">+500</span> شركة تثق بنا
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
              className="relative flex items-center justify-center"
            >
              {/* ===== هالة ضوء خلفية ===== */}
              <div className="absolute inset-0 -z-10">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary-green/10 rounded-full blur-3xl" />
                <div className="absolute top-1/3 left-2/3 w-48 h-48 bg-blue-400/8 rounded-full blur-2xl" />
              </div>

              {/* ===== صورة الكاركتر ===== */}
              <motion.div
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10"
              >
                <img
                  src="/branding/softy-mascot.png"
                  alt="Softy Code Mascot"
                  className="w-full max-w-md lg:max-w-lg xl:max-w-xl drop-shadow-2xl select-none"
                  draggable={false}
                  style={{
                    filter: 'drop-shadow(0 24px 48px rgba(34,197,94,0.18)) drop-shadow(0 8px 24px rgba(15,23,42,0.12))',
                  }}
                />
              </motion.div>

              {/* ===== بطاقة: تم الإطلاق ===== */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0, y: [0, -8, 0] }}
                transition={{
                  opacity: { delay: 0.6, duration: 0.5 },
                  x: { delay: 0.6, duration: 0.5 },
                  y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.6 },
                }}
                className="absolute -top-4 -right-4 lg:-right-10 z-20 bg-white/90 backdrop-blur-sm px-4 py-3 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center text-green-600 shrink-0">
                  <CheckCircle2 size={22} />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">تم الإطلاق</p>
                  <p className="font-bold text-slate-900 text-sm">نظام المحاسبة 2.0</p>
                </div>
              </motion.div>

              {/* ===== بطاقة: أمان السيرفر ===== */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0, y: [0, 10, 0] }}
                transition={{
                  opacity: { delay: 0.8, duration: 0.5 },
                  x: { delay: 0.8, duration: 0.5 },
                  y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 },
                }}
                className="absolute -bottom-4 -left-4 lg:-left-10 z-20 bg-white/90 backdrop-blur-sm px-4 py-3 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                  <ShieldCheck size={22} />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">حماية فائقة</p>
                  <p className="font-bold text-slate-900 text-sm">أمان سيرفر 100%</p>
                </div>
              </motion.div>

              {/* ===== شارة: +500 مشروع ===== */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.4, type: "spring" }}
                className="absolute bottom-8 right-0 lg:-right-6 z-20 bg-primary-navy text-white px-4 py-2 rounded-2xl shadow-xl flex items-center gap-2"
              >
                <span className="text-primary-green font-black text-lg">+500</span>
                <span className="text-xs text-slate-300 font-medium">مشروع ناجح</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Summary */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <h2 className="text-4xl font-display font-bold text-primary-navy mb-4">لماذا تختار SoftyCode؟</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">نحن نقدم حلولاً برمجية تتجاوز مجرد الكود، نحن نبني منصات متكاملة تدعم نجاحك المستمر.</p>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { title: 'تطوير ناعم ذكي', icon: <Code2 size={32} />, color: 'text-primary-green', bg: 'bg-green-100' },
            { title: 'صيانة دائمة', icon: <Layers size={32} />, color: 'text-blue-600', bg: 'bg-blue-100' },
            { title: 'دعم 24/7', icon: <MessageSquare size={32} />, color: 'text-indigo-600', bg: 'bg-indigo-100' },
            { title: 'أمان سحابي SQL', icon: <ShieldCheck size={32} />, color: 'text-emerald-600', bg: 'bg-emerald-100' }
          ].map((item, i) => (
            <Link key={i} to="/services" className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all text-center group">
              <div className={`w-16 h-16 ${item.bg} ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-primary-navy mb-4 font-display">{item.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">حلول متكاملة تضمن لك الأداء والأمان في مشروعك التقني.</p>
            </Link>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link to="/services" className="inline-flex items-center gap-2 text-primary-green font-bold text-lg hover:gap-4 transition-all">
            عرض كافة الخدمات <ChevronRight size={20} />
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-4xl font-display font-bold text-slate-900 mb-4">أنظمة جاهزة للنجاح</h2>
              <p className="text-lg text-slate-600 max-w-xl">اكتشف مجموعتنا المختارة من الأنظمة البرمجية التي أثبتت كفاءة عالية في السوق.</p>
            </div>
            <Link to="/products" className="bg-slate-900 text-white px-8 py-3 rounded-2xl font-bold hover:bg-primary-purple transition-all shadow-lg">
              عرض المتجر البرمجي
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'نظام إكسبريس المحاسبي',
                image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
                category: 'نظام ويب'
              },
              {
                title: 'منصة التجارة الإلكترونية Pro',
                image: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=800',
                category: 'متجر إلكتروني'
              },
              {
                title: 'إدارة المدارس والجامعات',
                image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=800',
                category: 'نظام تعليمي'
              }
            ].map((p, i) => (
              <motion.div key={i} whileHover={{ y: -10 }} className="group relative rounded-[2.5rem] overflow-hidden">
                <img src={p.image} className="w-full aspect-[4/5] object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <span className="text-primary-teal text-xs font-bold uppercase tracking-widest mb-2 block">{p.category}</span>
                  <h3 className="text-2xl font-bold text-white mb-4">{p.title}</h3>
                  <Link to="/products" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors">
                    شرح التفاصيل <ChevronRight size={16} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-brand-gradient rounded-[3rem] p-12 lg:p-24 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative z-10"
          >
            <h2 className="text-4xl lg:text-6xl font-display font-bold mb-6">هل أنت جاهز لتغيير ملامح مشروعك؟</h2>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">فريقنا جاهز لخوض غمار التحدي وتحويل مشروعك إلى قصة نجاح ملهمة في الفضاء الرقمي.</p>
            <Link to="/contact" className="inline-flex items-center gap-3 px-10 py-5 bg-white text-primary-navy rounded-2xl font-bold text-2xl hover:scale-105 hover:text-primary-green transition-all shadow-xl">
              ابدأ الآن مجاناً <Globe size={24} />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

