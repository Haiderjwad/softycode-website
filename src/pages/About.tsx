import React from 'react';
import { motion } from 'motion/react';
import { Target, Users, Award, Rocket, CheckCircle } from 'lucide-react';

export const About = () => {
  const stats = [
    { label: 'عميل سعيد', value: '500+', icon: <Users className="text-purple-600" /> },
    { label: 'مشروع ناجح', value: '1,200+', icon: <Rocket className="text-teal-600" /> },
    { label: 'سنة خبرة', value: '10+', icon: <Award className="text-blue-600" /> },
  ];

  return (
    <div className="pt-32 pb-20">
      {/* Intro */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 text-center">
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-primary-purple font-bold tracking-widest uppercase text-sm mb-4 block"
        >
          قصة النجاح تبدأ هنا
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl lg:text-7xl font-display font-bold text-slate-900 mb-8"
        >
          عن <span className="text-brand-gradient">SoftyCode</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
        >
          نحن لسنا مجرد شركة برمجيات، نحن شركاؤك في النجاح الرقمي. نجمع بين الخبرة التقنية العميقة والإبداع التصميمي لنبني أنظمة تدوم طويلاً.
        </motion.p>
      </section>

      {/* Stats */}
      <section className="bg-slate-50 py-20 mb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            {stats.map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 text-center"
              >
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  {stat.icon}
                </div>
                <div className="text-4xl font-display font-bold text-slate-900 mb-2">{stat.value}</div>
                <div className="text-slate-500 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-12 bg-white rounded-[3rem] border border-slate-100 shadow-xl"
          >
            <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-8">
              <Target size={32} />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">رؤيتنا</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              أن نكون المرجع الأول في الوطن العربي لتطوير أنظمة الويب الاحترافية، ونسهم في التحول الرقمي الشامل للمؤسسات والشركات بمختلف أحجامها.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-12 bg-white rounded-[3rem] border border-slate-100 shadow-xl"
          >
            <div className="w-14 h-14 bg-teal-100 text-teal-600 rounded-2xl flex items-center justify-center mb-8">
              <Rocket size={32} />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">رسالتنا</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              توفير حلول تقنية مبتكرة، آمنة، وسهلة الاستخدام تمكن رواد الأعمال من إدارة مشاريعهم بذكاء وكفاءة عالية، مع ضمان تقديم أفضل دعم فني مستمر.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
