import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle, ArrowLeft, Truck, Shield, CreditCard, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

export const OrderSuccess = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full"
      >
        {/* Success Card */}
        <div className="bg-white rounded-[3rem] shadow-2xl shadow-slate-950/5 border border-slate-100 overflow-hidden">
          {/* Success Header */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-12 text-center text-white">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle size={48} className="text-green-500" />
            </motion.div>
            <h1 className="text-4xl font-bold mb-4">تم إتمام الطلب بنجاح!</h1>
            <p className="text-white/80 text-lg">
              شكراً لك على اختيارنا. تم استلام طلبك وسيتم معالجته قريباً.
            </p>
          </div>

          {/* Order Details */}
          <div className="p-8 space-y-6">
            <div className="bg-slate-50 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-4">تفاصيل الطلب</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600 flex-shrink-0">
                    <Calendar size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">رقم الطلب</p>
                    <p className="font-bold text-slate-900">#ORD-2024-001</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 flex-shrink-0">
                    <Truck size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">تاريخ الطلب</p>
                    <p className="font-bold text-slate-900">29 أبريل 2026</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 flex-shrink-0">
                    <CreditCard size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">طريقة الدفع</p>
                    <p className="font-bold text-slate-900">الدفع عند الاستلام</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Status */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
              <h3 className="text-lg font-bold text-slate-900 mb-4">حالة الطلب</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle size={20} className="text-green-600 flex-shrink-0" />
                  <span className="text-slate-700">تم استلام الطلب</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-600 flex items-center justify-center text-white text-xs flex-shrink-0">
                    <CheckCircle size={12} />
                  </div>
                  <span className="text-slate-700">جاري المعالجة</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center text-slate-400 text-xs flex-shrink-0">
                    <CheckCircle size={12} />
                  </div>
                  <span className="text-slate-400">جاري التجهيز</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center text-slate-400 text-xs flex-shrink-0">
                    <CheckCircle size={12} />
                  </div>
                  <span className="text-slate-400">التوصيل</span>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-slate-50 rounded-2xl">
                <Shield size={28} className="text-green-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-slate-700">ضمان الجودة</p>
              </div>
              <div className="text-center p-4 bg-slate-50 rounded-2xl">
                <Truck size={28} className="text-green-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-slate-700">شحن سريع</p>
              </div>
              <div className="text-center p-4 bg-slate-50 rounded-2xl">
                <CreditCard size={28} className="text-green-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-slate-700">دفع آمن</p>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="px-8 pb-8">
            <div className="flex gap-4">
              <Link
                to="/products"
                className="flex-1 py-4 px-6 rounded-2xl border-2 border-slate-200 hover:border-primary-green hover:bg-slate-50 transition-all font-bold text-slate-700 text-center"
              >
                تصفح المزيد من المنتجات
              </Link>
              <Link
                to="/"
                className="flex-1 py-4 px-6 rounded-2xl bg-brand-gradient text-white hover:shadow-xl transition-all font-bold text-center"
              >
                العودة للرئيسية
              </Link>
            </div>
          </div>
        </div>

        {/* Support Info */}
        <div className="mt-8 text-center">
          <p className="text-slate-600 mb-4">
            لديك أي استفسارات؟ تواصل معنا
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 text-primary-green font-bold hover:underline"
          >
            <ArrowLeft size={20} />
            اتصل بنا
          </Link>
        </div>
      </motion.div>
    </div>
  );
};