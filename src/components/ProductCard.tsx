import React from 'react';
import { motion } from 'motion/react';
import { Star, Eye, Heart, MessageCircle, ExternalLink, Play, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Product } from '@/hooks/useProducts';

interface ProductCardProps {
  product: Product;
  index: number;
  viewMode: 'grid' | 'list';
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, index, viewMode }) => {
  const { t } = useTranslation();
  const [isFavorite, setIsFavorite] = useState(false);

  if (viewMode === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        viewport={{ once: true }}
        className="group bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/60 dark:border-slate-700/60 hover:border-primary-green/30 hover:shadow-2xl hover:shadow-primary-green/5 overflow-hidden transition-all duration-500"
      >
        <div className="flex flex-col md:flex-row">
          {/* Image Section */}
          <Link
            to={`/product/${product.id}`}
            className="relative md:w-96 h-56 md:h-auto overflow-hidden bg-gradient-to-br from-slate-100 dark:from-slate-800 to-slate-50 dark:to-slate-900 flex-shrink-0 transition-colors duration-300 block"
          >
            {product.image ? (
              <motion.img
                whileHover={{ scale: 1.15 }}
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-green/10 to-blue-500/10 dark:from-primary-green/5 dark:to-blue-500/5 transition-colors duration-300">
                <span className="text-6xl">📦</span>
              </div>
            )}
            <div className="absolute top-4 right-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg backdrop-blur-sm">
              📱 نظام
            </div>
          </Link>

          {/* Content Section */}
          <div className="flex-1 p-8 flex flex-col">
            <div className="flex-1">
              <Link to={`/product/${product.id}`}>
                <h3 className="text-2xl lg:text-3xl font-display font-bold text-slate-900 dark:text-white mb-3 group-hover:text-primary-green transition-colors duration-300">
                  {product.name}
                </h3>
              </Link>

              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-5 text-base transition-colors duration-300 line-clamp-2">
                {product.description}
              </p>

              {/* Meta Info */}
              <div className="flex items-center gap-6 mb-6 pb-6 border-b border-slate-200 dark:border-slate-700 transition-colors duration-300">
                {product.duration && (
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 transition-colors duration-300">
                    <span className="text-lg">⏱️</span>
                    <span>المدة: <strong>{product.duration}</strong></span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>

              {/* Features Grid */}
              {product.features && product.features.length > 0 && (
                <div className="mb-6">
                  <p className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-4 uppercase tracking-widest transition-colors duration-300">المميزات الرئيسية:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {product.features.slice(0, 4).map((feature, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-start gap-3 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors duration-300"
                      >
                        <span className="text-primary-green font-bold mt-1">✓</span>
                        <span className="text-sm text-slate-700 dark:text-slate-300 font-medium transition-colors duration-300">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                  {product.features.length > 4 && (
                    <motion.div whileHover={{ x: 5 }} className="mt-3 inline-block">
                      <span className="text-sm text-primary-green font-bold cursor-pointer hover:underline">
                        عرض {product.features.length - 4} مميزة إضافية
                      </span>
                    </motion.div>
                  )}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-200 dark:border-slate-700 mt-auto gap-4 transition-colors duration-300 flex-wrap">
              <div className="flex flex-col">
                <span className="text-sm text-slate-600 dark:text-slate-400 font-medium transition-colors duration-300">{t('products.price_label', 'السعر')}</span>
                <p className="text-3xl font-bold text-primary-green">
                  {product.price.toLocaleString('ar-SA')}
                  <span className="text-base text-slate-500 font-normal"> {t('products.currency', 'ر.س')}</span>
                </p>
              </div>

              <div className="flex gap-3 flex-wrap">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to={`/product/${product.id}`}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-semibold transition-all duration-300"
                  >
                    <Eye size={18} />
                    {t('products.view_details', 'عرض التفاصيل')}
                  </Link>
                </motion.div>
                {product.systemUrl && (
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <a
                      href={product.systemUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary-green hover:bg-primary-green/90 text-white font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                      title="تجربة النظام"
                    >
                      <Play size={18} fill="currentColor" />
                      {t('products.try_system', 'تجربة النظام الآن')}
                    </a>
                  </motion.div>
                )}
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary-navy to-slate-700 dark:from-primary-navy dark:to-slate-600 text-white font-semibold hover:shadow-lg transition-all duration-300"
                  >
                    <MessageCircle size={18} />
                    {t('products.order_now', 'اطلب الآن')}
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Grid View
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      className="group bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/60 dark:border-slate-700/60 hover:border-primary-green/30 hover:shadow-2xl hover:shadow-primary-green/5 overflow-hidden flex flex-col h-full transition-all duration-500"
    >
      <Link
        to={`/product/${product.id}`}
        className="relative h-64 overflow-hidden bg-gradient-to-br from-slate-100 dark:from-slate-800 to-slate-50 dark:to-slate-900 transition-colors duration-300 block"
      >
        {product.image ? (
          <motion.img
            whileHover={{ scale: 1.1 }}
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-green/10 dark:from-primary-green/5 to-blue-500/10 dark:to-blue-500/5 transition-colors duration-300">
            <span className="text-5xl">📦</span>
          </div>
        )}

        {/* Category Badge */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute top-4 right-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg"
        >
          📱 نظام
        </motion.div>
      </Link>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Title & Rating */}
        <div className="mb-3">
          <Link to={`/product/${product.id}`}>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 line-clamp-2 group-hover:text-primary-green transition-colors duration-300 font-display">
              {product.name}
            </h3>
          </Link>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
            ))}
            <span className="text-xs text-slate-500 dark:text-slate-400 ms-2 transition-colors duration-300">(28 تقييم)</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2 flex-1 transition-colors duration-300">
          {product.description}
        </p>

        {/* Duration */}
        {product.duration && (
          <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 mb-4 transition-colors duration-300">
            <span>⏱️</span>
            <span>المدة: <strong>{product.duration}</strong></span>
          </div>
        )}

        {/* Features */}
        {product.features && product.features.length > 0 && (
          <div className="mb-4 pb-4 border-b border-slate-200 dark:border-slate-700 transition-colors duration-300">
            <p className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase transition-colors duration-300">المميزات:</p>
            <ul className="space-y-1.5">
              {product.features.slice(0, 2).map((feature, i) => (
                <li key={i} className="text-xs text-slate-600 dark:text-slate-400 flex items-start gap-2 transition-colors duration-300">
                  <span className="text-primary-green mt-0.5 flex-shrink-0">✓</span>
                  <span className="line-clamp-1">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Price & Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700 mt-auto gap-3 transition-colors duration-300">
          <div>
            <p className="text-2xl font-bold text-primary-green">
              {product.price.toLocaleString('ar-SA')}
              <span className="text-xs text-slate-500 dark:text-slate-400 font-normal transition-colors duration-300"> {t('products.currency', 'ر.س')}</span>
            </p>
          </div>
        </div>

        {/* Try System Button - Full width and clear */}
        {product.systemUrl && (
          <motion.a
            href={product.systemUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-4 w-full py-3 px-4 rounded-xl bg-primary-green hover:bg-primary-green/90 text-white font-bold text-center transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 hover:-translate-y-0.5"
            onClick={(e) => e.stopPropagation()}
          >
            <Play size={18} fill="currentColor" />
            {t('products.try_system', 'تجربة النظام الآن')}
          </motion.a>
        )}

        {/* Order Now Link */}
        <Link
          to="/contact"
          className="mt-3 w-full py-3 px-4 rounded-xl border-2 border-primary-navy dark:border-slate-400 text-primary-navy dark:text-slate-300 font-semibold text-center transition-all duration-300 hover:bg-primary-navy hover:text-white dark:hover:bg-slate-300 dark:hover:text-slate-900 flex items-center justify-center gap-2"
          onClick={(e) => e.stopPropagation()}
        >
          <ArrowRight size={18} />
          {t('products.order_now', 'اطلب الآن')}
        </Link>
      </div>
    </motion.div>
  );
};