import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, FileText, Shield, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Terms = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-20 transition-colors duration-300">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-display font-bold text-slate-900 dark:text-white mb-4 transition-colors duration-300"
          >
            الشروط والأحكام
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl transition-colors duration-300"
          >
            قراءة الشروط والأحكام قبل استخدام منتجاتنا وخدماتنا
          </motion.p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 p-8 lg:p-12 space-y-8 transition-colors duration-300"
        >
          {/* Introduction */}
          <div className="flex items-start gap-4">
            <FileText size={32} className="text-primary-green flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                مقدمة
              </h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                هذه الشروط والأحكام تحكم استخدامك لمنتجاتنا وخدماتنا. قبل استخدام أي من منتجاتنا أو خدماتنا، يرجى قراءة هذه الشروط بعناية. باستخدام منتجاتنا أو خدماتنا، فإنك توافق على هذه الشروط.
              </p>
            </div>
          </div>

          {/* Section 1 */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
              <CheckCircle size={24} className="text-primary-green" />
              1. قبول الشروط
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              من خلال زيارة موقعنا واستخدام منتجاتنا وخدماتنا، فإنك تقر بأنك قد قرأت هذه الشروط وأنك توافق على الالتزام بها. إذا كنت لا توافق على أي من هذه الشروط، يرجى عدم استخدام منتجاتنا وخدماتنا.
            </p>
          </div>

          {/* Section 2 */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
              <CheckCircle size={24} className="text-primary-green" />
              2. استخدام المنتجات والخدمات
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              يجب استخدام منتجاتنا وخدماتنا فقط للأغراض المشروعة وللأغراض التي وضعتنا من أجله. لا يُسمح باستخدام منتجاتنا وخدماتنا لأي غرض غير قانوني أو غير أخلاقي.
            </p>
          </div>

          {/* Section 3 */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
              <CheckCircle size={24} className="text-primary-green" />
              3. حقوق الملكية
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              جميع الحقوق المتعلقة بمنتجاتنا وخدماتنا محفوظة لنا. لا يُسمح باستخدام أو نسخ أو توزيع أو تعديل منتجاتنا وخدماتنا دون إذن كتابي منا.
            </p>
          </div>

          {/* Section 4 */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
              <CheckCircle size={24} className="text-primary-green" />
              4. الضمان والاسترجاع
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              نقدم ضماناً لمدة 30 يوماً على جميع منتجاتنا وخدماتنا. إذا واجهت أي مشكلة، يمكنك طلب الاسترجاع أو الاستبدال خلال هذه الفترة. راجع سياسة الاسترجاع التفصيلية.
            </p>
          </div>

          {/* Section 5 */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
              <CheckCircle size={24} className="text-primary-green" />
              5. المسؤولية
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              نحن غير مسؤولين عن أي أضرار ناتجة عن استخدام منتجاتنا وخدماتنا. يجب عليك التحقق من صحة المنتجات والخدمات قبل الاستخدام.
            </p>
          </div>

          {/* Section 6 */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
              <CheckCircle size={24} className="text-primary-green" />
              6. التعديلات على الشروط
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              نحتفظ بالحق في تعديل هذه الشروط في أي وقت. سيتم إبلاغك بأي تعديلات من خلال إشعار على موقعنا أو عبر البريد الإلكتروني.
            </p>
          </div>

          {/* Section 7 */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
              <CheckCircle size={24} className="text-primary-green" />
              7. سياسة الخصوصية
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              نلتزم بحماية خصوصيتك. راجع سياسة الخصوصية التفصيلية لمعرفة كيفية جمع واستخدام بياناتك.
            </p>
          </div>

          {/* Footer */}
          <div className="pt-8 border-t border-slate-200 dark:border-slate-800">
            <p className="text-slate-500 dark:text-slate-500 text-sm">
              آخر تحديث: 29 أبريل 2026
            </p>
          </div>
        </motion.div>

        {/* Back Link */}
        <div className="mt-8 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-primary-green font-bold hover:underline"
          >
            <ArrowLeft size={20} />
            العودة للرئيسية
          </Link>
        </div>
      </div>
    </div>
  );
};