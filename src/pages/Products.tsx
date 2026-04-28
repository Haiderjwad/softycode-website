import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight, Globe, ShoppingCart, ExternalLink } from 'lucide-react';

export const Products = () => {
  const allProducts = [
    {
      title: 'نظام إكسبريس المحاسبي',
      desc: 'حل سحابي متكامل لإدارة الحسابات، المخازن، والمبيعات مع تقارير ذكية تدعم نمو أعمالك وتحسن من دقة عملياتك المالية.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
      price: '2,999 ريال',
      category: 'نظام ويب',
      tags: ['SaaS', 'Cloud', 'SQL']
    },
    {
      title: 'منصة التجارة الإلكترونية Pro',
      desc: 'متجر إلكتروني احترافي يدعم تعدد اللغات والعملات مع لوحة تحكم شاملة لإدارة الطلبات والعملاء وتتبع الشحنات.',
      image: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=800',
      price: '4,500 ريال',
      category: 'متجر إلكتروني',
      tags: ['E-commerce', 'Payment Gateway']
    },
    {
      title: 'نظام إدارة المدارس والجامعات',
      desc: 'منصة تعليمية متكاملة تربط بين الإدارة، المعلمين، والطلاب لتسهيل العملية التعليمية رقمياً وإدارة الاختبارات والغياب.',
      image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=800',
      price: 'تواصل معنا',
      category: 'نظام تعليمي',
      tags: ['Education', 'LMS']
    },
    {
      title: 'بوابة الدفع الذكية',
      desc: 'تكامل آمن وسريع مع جميع بوابات الدفع المحلية والعالمية، يوفر حماية عالية لكافة معاملاتك المالية عبر الإنترنت.',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=800',
      price: '1,499 ريال',
      category: 'بوابة دفع',
      tags: ['Fintech', 'Security']
    }
  ];

  return (
    <div className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-4xl lg:text-7xl font-display font-bold text-slate-900 mb-6"
        >
          منتجاتنا <span className="text-brand-gradient">الرقمية</span>
        </motion.h1>
        <p className="text-xl text-slate-500 max-w-2xl">حلول ويب وبرمجيات جاهزة صممت بمقاييس عالمية لتلبية احتياجات سوق العمل العربي.</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-8">
        {allProducts.map((product, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all"
          >
            <div className="aspect-[16/9] overflow-hidden relative">
              <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute top-6 right-6 flex gap-2">
                {product.tags.map(tag => (
                   <span key={tag} className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold text-slate-900">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="p-10">
              <div className="flex justify-between items-center mb-6">
                <span className="text-sm font-bold text-primary-teal uppercase tracking-widest">{product.category}</span>
                <span className="text-2xl font-bold text-slate-900">{product.price}</span>
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-4">{product.title}</h3>
              <p className="text-slate-500 text-lg leading-relaxed mb-10">{product.desc}</p>
              
              <div className="flex gap-4">
                <button className="flex-1 py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-primary-purple transition-all shadow-lg">
                  <ShoppingCart size={20} /> طلب النظام
                </button>
                <button className="px-6 py-4 bg-white text-slate-700 border-2 border-slate-100 rounded-2xl font-bold hover:border-primary-teal hover:text-primary-teal transition-all flex items-center justify-center">
                  <ExternalLink size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
