import React from 'react';
import { motion } from 'motion/react';
import { Mail, MessageSquare, MapPin, Phone, ArrowRight, Instagram, Twitter, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Contact = () => {
  return (
    <div className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl lg:text-7xl font-display font-bold text-slate-900 mb-6"
        >
          تواصل <span className="text-brand-gradient">معنا</span>
        </motion.h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">نحن هنا للإجابة على استفساراتك ومساعدتك في اختيار الحل الأنسب لمشروعك القادم.</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 bg-white rounded-[3.5rem] shadow-2xl border border-slate-50 overflow-hidden">
          {/* Info Sidebar */}
          <div className="lg:col-span-5 bg-slate-900 p-12 lg:p-16 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-teal/20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
            
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-10 font-display">معلومات الاتصال</h2>
              
              <div className="space-y-10 mb-20">
                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-primary-teal shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">البريد الالكتروني</h4>
                    <p className="text-slate-400">info@softycode.com</p>
                  </div>
                </div>

                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-primary-purple shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">اتصل بنا</h4>
                    <p className="text-slate-400">+966 500 000 000</p>
                  </div>
                </div>

                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-blue-400 shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">الموقع</h4>
                    <p className="text-slate-400">الرياض، المملكة العربية السعودية</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-slate-500">تابعنا على</h4>
                <div className="flex gap-4">
                  {[Twitter, Linkedin, Instagram].map((Icon, i) => (
                    <a key={i} href="#" className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center hover:bg-primary-teal transition-all">
                      <Icon size={24} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7 p-12 lg:p-16">
            <form className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="font-bold text-slate-800 text-sm">اسمك الكامل</label>
                  <input className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:ring-4 focus:ring-primary-purple/10 focus:border-primary-purple transition-all outline-none" placeholder="أحمد علي" />
                </div>
                <div className="space-y-3">
                  <label className="font-bold text-slate-800 text-sm">بريدك الالكتروني</label>
                  <input className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:ring-4 focus:ring-primary-purple/10 focus:border-primary-purple transition-all outline-none" placeholder="ali@example.com" />
                </div>
              </div>

              <div className="space-y-3">
                <label className="font-bold text-slate-800 text-sm">نوع المشروع</label>
                <select className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:ring-4 focus:ring-primary-purple/10 focus:border-primary-purple transition-all outline-none appearance-none">
                  <option>نظام محاسبي</option>
                  <option>متجر الكتروني</option>
                  <option>نظام ويب مخصص</option>
                  <option>غير ذلك</option>
                </select>
              </div>

              <div className="space-y-3">
                <label className="font-bold text-slate-800 text-sm">رسالتك</label>
                <textarea className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:ring-4 focus:ring-primary-purple/10 focus:border-primary-purple transition-all outline-none h-40" placeholder="أخبرنا عن فكرتك بالتفصيل..."></textarea>
              </div>

              <button className="w-full py-5 bg-brand-gradient text-white rounded-2xl font-bold text-xl shadow-xl shadow-primary-purple/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3">
                إرسال الرسالة <ArrowRight size={24} className="rotate-180" />
              </button>
              <Link
                to="/cart"
                className="w-full py-5 bg-white text-primary-green border-2 border-primary-green rounded-2xl font-bold text-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
              >
                عرض السلة <ArrowRight size={24} />
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
