import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Github, Globe } from 'lucide-react';
import { Logo } from './Logo';

export const Footer = () => {
  return (
    <footer className="bg-primary-navy pt-24 pb-12 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-green/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 mb-20 text-white">
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-8 bg-white p-2 rounded-xl">
              <Logo className="h-10" />
            </Link>
            <p className="text-slate-400 text-lg mb-10 max-w-sm leading-relaxed">
              شريكك التقني الأمثل لبناء حلول سحابية ذكية بلمسة ناعمة. نحول تعقيدات البرمجة إلى أنظمة سهلة وفعالة تدعم رؤيتك للمستقبل.
            </p>
            <div className="flex gap-6">
              {[Twitter, Linkedin, Github].map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-slate-400 hover:bg-primary-green hover:text-white transition-all shadow-sm">
                  <Icon size={24} />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-white text-xl mb-8 font-display">الروابط السريعة</h4>
            <ul className="space-y-5 text-slate-400 font-medium">
              <li><Link to="/" className="hover:text-primary-green transition-colors">الرئيسية</Link></li>
              <li><Link to="/services" className="hover:text-primary-green transition-colors">خدماتنا</Link></li>
              <li><Link to="/products" className="hover:text-primary-green transition-colors">منتجاتنا</Link></li>
              <li><Link to="/blog" className="hover:text-primary-green transition-colors">المدونة</Link></li>
              <li><Link to="/careers" className="hover:text-primary-green transition-colors">الوظائف</Link></li>
              <li><Link to="/about" className="hover:text-primary-green transition-colors">عن الشركة</Link></li>
              <li><Link to="/faq" className="hover:text-primary-green transition-colors">الأسئلة الشائعة</Link></li>
              <li><Link to="/contact" className="hover:text-primary-green transition-colors">اتصل بنا</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white text-xl mb-8 font-display">قانوني</h4>
            <ul className="space-y-5 text-slate-400 font-medium">
              <li><Link to="/privacy" className="hover:text-primary-green transition-colors">سياسة الخصوصية</Link></li>
              <li><Link to="/terms" className="hover:text-primary-green transition-colors">الشروط والأحكام</Link></li>
              <li><Link to="/careers" className="hover:text-primary-green transition-colors">الوظائف</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-500 font-medium">
          <p>© {new Date().getFullYear()} SoftyCode. جميع الحقوق محفوظة.</p>
          <div className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-full">
            <Globe size={18} className="text-primary-green" />
            <span className="text-sm">المملكة العربية السعودية، الرياض</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
