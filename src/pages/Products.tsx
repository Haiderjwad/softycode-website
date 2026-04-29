import { useProducts } from '@/hooks/useProducts';
import { motion } from 'motion/react';
import { ChevronRight, Loader } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Loader as GlobalLoader } from '@/components/Loader';

export const Products = () => {
  const { products, loading, error } = useProducts();

   if (loading) {
     return (
       <div className="min-h-screen flex items-center justify-center pt-32">
         <GlobalLoader text="جاري تحميل المنتجات..." />
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
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl lg:text-6xl font-display font-bold text-primary-navy mb-6">
            منتجاتنا وخدماتنا
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            اكتشف مجموعة شاملة من الحلول البرمجية المتطورة التي صممت خصيصاً لتلبية احتياجات عملك
          </p>
          <p className="text-sm text-slate-400 mt-4">
            {products.length} منتج متاح حالياً
          </p>
        </motion.div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-lg text-slate-500">لا توجد منتجات حالياً</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 hover:border-primary-green/50"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-green/10 to-blue-500/10">
                      <span className="text-4xl text-primary-green/50">📦</span>
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-primary-green/90 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold">
                    {product.category === 'services' ? '🎯 خدمة' : '📱 منتج'}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-primary-navy mb-2 font-display">
                    {product.name}
                  </h3>

                  <p className="text-slate-600 text-sm leading-relaxed mb-4">
                    {product.description}
                  </p>

                  {/* Duration */}
                  {product.duration && (
                    <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
                      <span>⏱️</span>
                      <span>المدة: {product.duration}</span>
                    </div>
                  )}

                  {/* Features */}
                  {product.features && product.features.length > 0 && (
                    <div className="mb-6 pb-6 border-b border-slate-100">
                      <p className="text-xs font-semibold text-slate-700 mb-3 uppercase">المميزات:</p>
                      <ul className="space-y-2">
                        {product.features.slice(0, 3).map((feature, i) => (
                          <li key={i} className="text-sm text-slate-600 flex items-center gap-2">
                            <span className="text-primary-green">✓</span>
                            {feature}
                          </li>
                        ))}
                        {product.features.length > 3 && (
                          <li className="text-sm text-primary-green font-semibold">
                            +{product.features.length - 3} مميزات إضافية
                          </li>
                        )}
                      </ul>
                    </div>
                  )}

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold text-primary-navy">
                        {product.price.toLocaleString('ar-SA')}
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
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-primary-green to-primary-navy rounded-3xl p-12 lg:p-16 text-center text-white"
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            لم تجد ما تبحث عنه؟
          </h2>
          <p className="text-lg text-white/80 mb-8">
            تحدث معنا عن احتياجاتك الخاصة وسنقوم بتطوير حل مخصص لك
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
