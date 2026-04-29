import { useServices } from '@/hooks/useFirestore';
import { motion } from 'motion/react';
import { ChevronRight, Loader } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Services = () => {
  const { services, loading, error } = useServices();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-32">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="flex flex-col items-center gap-4"
        >
          <Loader size={48} className="text-primary-green" />
          <p className="text-lg text-slate-600">جاري تحميل الخدمات...</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-32">
        <div className="bg-red-50 border border-red-200 text-red-700 px-8 py-6 rounded-2xl max-w-md text-center">
          <h2 className="text-xl font-bold mb-2">حدث خطأ</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-24 pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl lg:text-6xl font-display font-bold text-primary-navy mb-6">
            خدماتنا المتميزة
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            نقدم مجموعة شاملة من الخدمات المساعدة التي تدعم نجاح مشروعك على المدى الطويل
          </p>
          <p className="text-sm text-slate-400 mt-4">
            {services.length} خدمة متاحة
          </p>
        </motion.div>

        {services.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-lg text-slate-500">لا توجد خدمات حالياً</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 hover:border-primary-green/50"
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-primary-navy mb-2 font-display">
                      {service.name}
                    </h3>
                    {service.period && (
                      <span className="inline-block bg-primary-green/10 text-primary-green px-3 py-1 rounded-full text-sm font-semibold">
                        {service.period}
                      </span>
                    )}
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-14 h-14 bg-primary-green/10 rounded-full flex items-center justify-center"
                  >
                    <span className="text-2xl">🎯</span>
                  </motion.div>
                </div>

                <p className="text-slate-600 text-base leading-relaxed mb-6">
                  {service.description}
                </p>

                {service.features && service.features.length > 0 && (
                  <div className="mb-6 pb-6 border-b border-slate-100">
                    <p className="text-xs font-semibold text-slate-700 mb-3 uppercase">المميزات:</p>
                    <ul className="space-y-2">
                      {service.features.map((feature, i) => (
                        <li key={i} className="text-sm text-slate-600 flex items-center gap-2">
                          <span className="text-primary-green">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold text-primary-navy">
                      {service.price.toLocaleString('ar-SA')}
                      <span className="text-lg text-slate-500 font-normal"> ر.س</span>
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-primary-green hover:bg-primary-green/90 text-white p-3 rounded-full transition-all shadow-lg"
                  >
                    <ChevronRight size={20} />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-primary-green to-primary-navy rounded-3xl p-12 lg:p-16 text-center text-white"
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            تحتاج إلى خدمة مخصصة؟
          </h2>
          <p className="text-lg text-white/80 mb-8">
            فريقنا جاهز لتطوير باقة خدمات تناسب احتياجات مشروعك بالضبط
          </p>
          <Link
            to="/cart"
            className="inline-flex items-center gap-2 bg-white text-primary-green px-8 py-3 rounded-xl font-bold hover:scale-105 transition-transform"
          >
            عرض السلة <ChevronRight size={20} />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};
