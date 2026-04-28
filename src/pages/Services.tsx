import React from 'react';
import { motion } from 'motion/react';
import { 
  Code2, 
  Layers, 
  MessageSquare, 
  ShieldCheck, 
  ChevronRight 
} from 'lucide-react';

export const Services = () => {
  const servicesList = [
    {
      title: 'تطوير أنظمة الويب',
      desc: 'نطور أنظمة ويب متكاملة ومعقدة تخدم أهدافك التجارية بأحدث التقنيات العالمية. نضمن لك السرعة والأداء العالي والاستقرار التام.',
      icon: <Code2 size={40} />,
      color: 'bg-purple-50 text-purple-600',
      features: ['أنظمة ERP', 'لوحات تحكم متطورة', 'ربط API']
    },
    {
      title: 'الصيانة والتطوير',
      desc: 'خدمات صيانة دورية وتطوير مستمر لكافة الأنظمة البرمجية لضمان كفاءتها وبقائها حديثة ومواكبة للتطورات التقنية المتسارعة.',
      icon: <Layers size={40} />,
      color: 'bg-teal-50 text-teal-600',
      features: ['تحديثات دورية', 'إصلاح الأخطاء', 'إضافة ميزات جديدة']
    },
    {
      title: 'الدعم الفني 24/7',
      desc: 'فريق دعم فني متخصص متواجد على مدار الساعة لحل المشكلات التقنية وضمان استمرارية عملك دون توقف أو انقطاع.',
      icon: <MessageSquare size={40} />,
      color: 'bg-blue-50 text-blue-600',
      features: ['استجابة سريعة', 'دعم عبر الهاتف', 'مراقبة حية']
    },
    {
      title: 'الأمان الرقمي & SQL',
      desc: 'حماية فائقة لبياناتك باستخدام أقوى قواعد بيانات SQL مع تطبيق معايير الأمان العالمية ضد الاختراق وتسريب البيانات.',
      icon: <ShieldCheck size={40} />,
      color: 'bg-red-50 text-red-600',
      features: ['تشفير البيانات', 'نسخ احتياطي', 'فحص أمني']
    }
  ];

  return (
    <div className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl lg:text-6xl font-display font-bold text-slate-900 mb-6"
        >
          خدماتنا <span className="text-brand-gradient">التقنية</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-slate-600 max-w-3xl mx-auto"
        >
          نقدم حلولاً متكاملة تغطي كافة جوانب احتياجاتك الرقمية، من التخطيط والتطوير إلى الصيانة والأمن.
        </motion.p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12">
        {servicesList.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="group bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 hover:shadow-2xl hover:border-transparent transition-all"
          >
            <div className={`w-20 h-20 rounded-3xl ${service.color} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
              {service.icon}
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">{service.title}</h3>
            <p className="text-lg text-slate-600 leading-relaxed mb-8">{service.desc}</p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {service.features.map((f, i) => (
                <div key={i} className="flex items-center gap-2 text-slate-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary-teal" />
                  <span className="font-medium text-sm">{f}</span>
                </div>
              ))}
            </div>
            <div className="pt-8 border-t border-slate-100">
              <button className="flex items-center gap-2 text-primary-purple font-bold hover:gap-4 transition-all">
                اطلب هذه الخدمة <ChevronRight size={20} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
