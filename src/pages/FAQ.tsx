import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, CheckCircle, ArrowLeft, Phone, Mail, MessageSquare, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const faqs = [
  {
    question: 'كيف يمكنني طلب منتج أو خدمة؟',
    answer: 'يمكنك طلب المنتجات والخدمات من خلال صفحة المنتجات، واختيار المنتج المطلوب، ثم إضافته إلى سلة المشتريات وإتمام الطلب. سيتم التواصل معك لتفاصيل الدفع والتوصيل.',
  },
  {
    question: 'ما هي طرق الدفع المتاحة؟',
    answer: 'نحن نقدم عدة طرق للدفع: الدفع عند الاستلام، البطاقات الائتمانية، التحويل البنكي، والتحويل الإلكتروني. جميع طرق الدفع آمنة ومشفرة.',
  },
  {
    question: 'كم تستغرق عملية التوصيل؟',
    answer: 'تعتمد مدة التوصيل على موقعك الجغرافي. عادة ما تستغرق من 2-5 أيام عمل للمدن الرئيسية، ومن 5-10 أيام للمناطق النائية.',
  },
  {
    question: 'هل تقدمون ضماناً على المنتجات؟',
    answer: 'نعم، نقدم ضماناً لمدة 30 يوماً على جميع المنتجات والخدمات. إذا واجهت أي مشكلة، سنعالجها فوراً.',
  },
  {
    question: 'كيف يمكنني متابعة طلبي؟',
    answer: 'يمكنك متابعة طلبك من خلال صفحة حالة الطلب، أو التواصل معنا عبر الهاتف أو البريد الإلكتروني. سنقوم بإبلاغك بكل تحديثات الطلب.',
  },
  {
    question: 'هل يمكنني إلغاء طلبي؟',
    answer: 'نعم، يمكنك إلغاء طلبك قبل بدء المعالجة. فقط تواصل معنا عبر الهاتف أو البريد الإلكتروني وسنقوم بمعالجة الطلب فوراً.',
  },
  {
    question: 'ما هي شروط الاسترجاع والاستبدال؟',
    answer: 'نقدم استرجاع واستبدال خلال 30 يوماً من تاريخ الاستلام، بشرط أن يكون المنتج في حالته الأصلية وغير مستخدم. راجع سياسة الاسترجاع التفصيلية.',
  },
  {
    question: 'كيف يمكنني التواصل معكم؟',
    answer: 'يمكنك التواصل معنا عبر الهاتف: +966 500 000 000، البريد الإلكتروني: info@softycode.com، أو عبر نموذج الاتصال في صفحة التواصل.',
  },
  {
    question: 'هل تقدمون خدمات الدعم الفني؟',
    answer: 'نعم، نقدم دعماً فنياً متواصلاً 24/7 عبر الهاتف والبريد الإلكتروني. كما نقدم خدمة الدعم عبر الإنترنت والمراسلة.',
  },
  {
    question: 'ما هي الخدمات التي تقدمونها؟',
    answer: 'نقدم مجموعة شاملة من الخدمات: تطوير أنظمة الويب، تطبيقات الجوال، استشارات تقنية، تصميم الواجهات، الصيانة السحابية، والأمان الرقمي.',
  },
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-display font-bold text-slate-900 mb-4"
          >
            الأسئلة الشائعة
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-600 max-w-2xl"
          >
            اكتشف إجابات على أسئلتك الشائعة حول منتجاتنا وخدماتنا
          </motion.p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="relative">
            <input
              type="text"
              placeholder="ابحث عن سؤال..."
              className="w-full px-6 py-5 pr-14 rounded-2xl bg-white border-2 border-slate-200 focus:border-primary-green focus:ring-4 focus:ring-primary-green/10 transition-all outline-none text-lg"
            />
            <Search size={24} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4 mb-16">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left"
              >
                <span className="text-lg font-bold text-slate-900 pr-4">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown size={24} className="text-slate-400" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6">
                      <p className="text-slate-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-primary-green to-primary-teal rounded-[3rem] p-12 text-center text-white"
        >
          <CheckCircle size={48} className="mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">
            لم تجد إجابة لسؤالك؟
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            فريقنا جاهز لمساعدتك. تواصل معنا الآن وسنرد عليك في أقرب وقت ممكن.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+966500000000"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-primary-green rounded-2xl font-bold text-lg hover:scale-105 transition-transform"
            >
              <Phone size={24} />
              +966 500 000 000
            </a>
            <a
              href="mailto:info@softycode.com"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/10 text-white rounded-2xl font-bold text-lg hover:bg-white/20 transition-all"
            >
              <Mail size={24} />
              info@softycode.com
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};