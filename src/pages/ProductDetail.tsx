import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Check, Star, Share2, Heart, ChevronRight, Calendar, Tag, Clock, Shield } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '@/hooks/useProducts';

export const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, loading, error } = useProducts();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const product = products.find((p) => p.id === id);

  useEffect(() => {
    if (product && product.image) {
      setSelectedImage(0);
    }
  }, [product]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-32">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="flex flex-col items-center gap-4"
        >
          <div className="w-16 h-16 border-4 border-primary-green border-t-transparent rounded-full" />
          <p className="text-lg text-slate-600">جاري تحميل المنتج...</p>
        </motion.div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-32">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">المنتج غير موجود</h2>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-primary-green font-bold hover:underline"
          >
            <ArrowLeft size={20} />
            العودة للمنتجات
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-slate-500 hover:text-primary-green transition-colors">
              الرئيسية
            </Link>
            <ChevronRight size={16} className="text-slate-300" />
            <Link to="/products" className="text-slate-500 hover:text-primary-green transition-colors">
              المنتجات
            </Link>
            <ChevronRight size={16} className="text-slate-300" />
            <span className="text-slate-900 font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative aspect-square rounded-[3rem] overflow-hidden bg-slate-100"
            >
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-green/10 to-blue-500/10">
                  <span className="text-8xl text-primary-green/50">📦</span>
                </div>
              )}
            </motion.div>

            {product.image && (
              <div className="grid grid-cols-4 gap-4">
                {[0, 1, 2, 3].map((i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedImage(i)}
                    className={`aspect-square rounded-2xl overflow-hidden border-2 transition-all ${selectedImage === i
                        ? 'border-primary-green'
                        : 'border-slate-200 hover:border-primary-green'
                      }`}
                  >
                    <img
                      src={product.image}
                      alt={`${product.name} ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-start justify-between mb-4">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-green/10 text-primary-green font-semibold text-sm">
                  {product.category === 'services' ? '🎯 خدمة' : '📱 منتج'}
                </span>
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`p-3 rounded-2xl transition-all ${isWishlisted
                      ? 'bg-red-100 text-red-600'
                      : 'bg-slate-100 text-slate-400 hover:bg-red-50 hover:text-red-600'
                    }`}
                >
                  <Heart size={24} fill={isWishlisted ? 'currentColor' : 'none'} />
                </button>
              </div>

              <h1 className="text-4xl lg:text-5xl font-display font-bold text-slate-900 mb-4">
                {product.name}
              </h1>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={`${i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-slate-200'
                        }`}
                    />
                  ))}
                </div>
                <span className="text-slate-500">4.8 (128 تقييم)</span>
              </div>

              <p className="text-xl text-slate-600 leading-relaxed mb-8">
                {product.description}
              </p>

              <div className="flex items-baseline gap-3 mb-8">
                <span className="text-5xl font-bold text-primary-green">
                  {product.price.toLocaleString('ar-SA')}
                </span>
                <span className="text-xl text-slate-500">ر.س</span>
              </div>
            </motion.div>

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h3 className="text-lg font-bold text-slate-900 mb-4">المميزات</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {product.features.map((feature, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100"
                    >
                      <Check size={20} className="text-primary-green flex-shrink-0" />
                      <span className="text-slate-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Duration */}
            {product.duration && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100">
                  <Clock size={20} className="text-primary-green flex-shrink-0" />
                  <span className="text-slate-700">
                    <span className="font-bold">المدة:</span> {product.duration}
                  </span>
                </div>
              </motion.div>
            )}


            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex gap-4"
            >
              <Link
                to="/contact"
                className="flex-1 py-5 rounded-2xl font-bold text-xl shadow-xl transition-all flex items-center justify-center gap-3 bg-brand-gradient text-white hover:shadow-2xl"
              >
                طلب الخدمة
              </Link>
              <button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-5 rounded-2xl bg-slate-100 hover:bg-slate-200 transition-all"
              >
                <Share2 size={24} />
              </button>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-200"
            >
              <div className="text-center">
                <Shield size={28} className="text-primary-green mx-auto mb-2" />
                <p className="text-sm font-medium text-slate-700">ضمان الجودة</p>
              </div>
              <div className="text-center">
                <Calendar size={28} className="text-primary-green mx-auto mb-2" />
                <p className="text-sm font-medium text-slate-700">دفع آمن</p>
              </div>
              <div className="text-center">
                <Tag size={28} className="text-primary-green mx-auto mb-2" />
                <p className="text-sm font-medium text-slate-700">أسعار منافسة</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Related Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-20"
        >
          <h2 className="text-3xl font-display font-bold text-slate-900 mb-8">
            منتجات مشابهة
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {products
              .filter((p) => p.category === product.category && p.id !== product.id)
              .slice(0, 3)
              .map((relatedProduct, i) => (
                <Link
                  key={relatedProduct.id}
                  to={`/product/${relatedProduct.id}`}
                  className="group"
                >
                  <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 hover:border-primary-green/50">
                    <div className="aspect-square bg-slate-100 overflow-hidden">
                      {relatedProduct.image ? (
                        <img
                          src={relatedProduct.image}
                          alt={relatedProduct.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-green/10 to-blue-500/10">
                          <span className="text-4xl text-primary-green/50">📦</span>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-slate-900 mb-2">
                        {relatedProduct.name}
                      </h3>
                      <p className="text-slate-600 text-sm mb-4">
                        {relatedProduct.description}
                      </p>
                      <p className="text-2xl font-bold text-primary-green">
                        {relatedProduct.price.toLocaleString('ar-SA')} ر.س
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};