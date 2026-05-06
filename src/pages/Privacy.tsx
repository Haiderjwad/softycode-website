import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Shield, Lock, Eye, Database, User, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Privacy = () => {
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
            سياسة الخصوصية
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl transition-colors duration-300"
          >
            نلتزم بحماية خصوصيتك وبياناتك الشخصية
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
            <Shield size={32} className="text-primary-green flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                مقدمة
              </h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                نحن في SoftyCode نقدر خصوصيتك ونلتزم بحماية بياناتك الشخصية. هذه سياسة الخصوصية توضح كيفية جمعنا واستخدامنا وملفاتك الشخصية. يرجى قراءة هذه السياسة بعناية قبل استخدام منتجاتنا وخدماتنا.
              </p>
            </div>
          </div>

          {/* Section 1 */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
              <Lock size={24} className="text-primary-green" />
              1. البيانات التي نجمعها
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              قد نجمع البيانات التالية:
            </p>
            <ul className="space-y-2 text-slate-600 dark:text-slate-400">
              <li className="flex items-start gap-2">
                <span className="text-primary-green mt-1">•</span>
                <span>البيانات الشخصية: الاسم، البريد الإلكتروني، رقم الهاتف</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-green mt-1">•</span>
                <span>بيانات الدفع: تفاصيل البطاقة الائتمانية (تُشفّر)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-green mt-1">•</span>
                <span>بيانات الاستخدام: سلوك التصفح، المفضلة</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-green mt-1">•</span>
                <span>بيانات طلب الخدمة: تفاصيل المشاريع والمتطلبات التقنية</span>
              </li>
            </ul>
          </div>

          {/* Section 2 */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
              <Database size={24} className="text-primary-green" />
              2. كيف نستخدم بياناتك
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              نستخدم بياناتك لـ:
            </p>
            <ul className="space-y-2 text-slate-600 dark:text-slate-400">
              <li className="flex items-start gap-2">
                <span className="text-primary-green mt-1">•</span>
                <span>تقديم الخدمات والمنتجات المطلوبة</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-green mt-1">•</span>
                <span>تحسين تجربة المستخدم</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-green mt-1">•</span>
                <span>إرسال الإشعارات والتحديثات</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-green mt-1">•</span>
                <span>معالجة الطلبات والدفع</span>
              </li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
              <ShieldCheck size={24} className="text-primary-green" />
              3. حماية البيانات
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              نستخدم أحدث تقنيات الحماية لحماية بياناتك:
            </p>
            <ul className="space-y-2 text-slate-600 dark:text-slate-400">
              <li className="flex items-start gap-2">
                <span className="text-primary-green mt-1">•</span>
                <span>التشفير المتقدم للبيانات الحساسة</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-green mt-1">•</span>
                <span>نظام المصادقة الثنائية</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-green mt-1">•</span>
                <span>الوصول المشفر للبيانات</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-green mt-1">•</span>
                <span>النسخ الاحتياطي التلقائي</span>
              </li>
            </ul>
          </div>

          {/* Section 4 */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
              <Eye size={24} className="text-primary-green" />
              4. مشاركة البيانات
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              لا نشارك بياناتك مع أطراف ثالثة إلا في الحالات التالية:
            </p>
            <ul className="space-y-2 text-slate-600 dark:text-slate-400">
              <li className="flex items-start gap-2">
                <span className="text-primary-green mt-1">•</span>
                <span>لأغراض الدفع والفواتير</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-green mt-1">•</span>
                <span>لتحسين خدماتنا</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-green mt-1">•</span>
                <span>وفقاً للقانون المعمول به</span>
              </li>
            </ul>
          </div>

          {/* Section 5 */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
              <User size={24} className="text-primary-green" />
              5. حقوقك
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              لديك الحق في:
            </p>
            <ul className="space-y-2 text-slate-600 dark:text-slate-400">
              <li className="flex items-start gap-2">
                <span className="text-primary-green mt-1">•</span>
                <span>الوصول إلى بياناتك</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-green mt-1">•</span>
                <span>تعديل بياناتك</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-green mt-1">•</span>
                <span>حذف حسابك</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-green mt-1">•</span>
                <span>الاستفادة من الخدمات المجانية</span>
              </li>
            </ul>
          </div>

          {/* Section 6 */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
              <Shield size={24} className="text-primary-green" />
              6. ملفات تعريف الارتباط
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              نستخدم ملفات تعريف الارتباط لتحسين تجربة المستخدم. يمكنك إدارة إعدادات ملفات تعريف الارتباط في متصفحك.
            </p>
          </div>

          {/* Footer */}
          <div className="pt-8 border-t border-slate-200 dark:border-slate-800 transition-colors duration-300">
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