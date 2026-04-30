import { motion } from 'motion/react';
import { ChevronRight, Star, ShoppingCart, Eye, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Product } from '@/hooks/useProducts';

interface ProductCardProps {
  product: Product;
  index: number;
  viewMode: 'grid' | 'list';
}

export const ProductCard = ({ product, index, viewMode }: ProductCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  if (viewMode === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        viewport={{ once: true }}
        className="group card-elevated hover:border-primary-green/50 overflow-hidden"
      >
        <div className="flex flex-col md:flex-row">
          {/* Image Section */}
          <div className="relative md:w-96 h-56 md:h-auto overflow-hidden bg-gradient-to-br from-slate-100 to-slate-50 flex-shrink-0">
            {product.image ? (
              <motion.img
                whileHover={{ scale: 1.15 }}
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-green/10 to-blue-500/10">
                <span className="text-6xl">📦</span>
              </div>
            )}
            
            {/* Category Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-4 right-4 bg-gradient-to-r from-primary-green to-primary-teal text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg backdrop-blur-sm"
            >
              {product.category === 'services' ? '🎯 خدمة' : '📱 منتج'}
            </motion.div>

            {/* Favorite Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsFavorite(!isFavorite)}
              className="absolute bottom-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all"
            >
              <Heart size={20} className={isFavorite ? 'fill-red-500 text-red-500' : 'text-slate-600'} />
            </motion.button>
          </div>

          {/* Content Section */}
          <div className="flex-1 p-8 flex flex-col">
            <div className="flex-1">
              <h3 className="text-2xl lg:text-3xl font-display font-bold text-slate-900 mb-3 group-hover:text-primary-green transition-colors">
                {product.name}
              </h3>

              <p className="text-slate-600 leading-relaxed mb-5 text-base">
                {product.description}
              </p>

              {/* Meta Info */}
              <div className="flex items-center gap-6 mb-6 pb-6 border-b border-slate-100">
                {product.duration && (
                  <div className="flex items-center gap-2 text-sm text-slate-600">
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
                  <p className="text-xs font-bold text-slate-700 mb-4 uppercase tracking-widest">المميزات الرئيسية:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {product.features.slice(0, 4).map((feature, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-start gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors"
                      >
                        <span className="text-primary-green font-bold mt-1">✓</span>
                        <span className="text-sm text-slate-700 font-medium">{feature}</span>
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
            <div className="flex items-center justify-between pt-6 border-t border-slate-100 mt-auto gap-4">
              <div className="flex flex-col">
                <span className="text-sm text-slate-600 font-medium">السعر</span>
                <p className="text-3xl font-bold text-primary-green">
                  {product.price.toLocaleString('ar-SA')}
                  <span className="text-base text-slate-500 font-normal"> ر.س</span>
                </p>
              </div>

              <div className="flex gap-3">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to={`/product/${product.id}`}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition-all"
                  >
                    <Eye size={18} />
                    عرض
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/cart"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-brand-gradient text-white font-semibold hover-glow transition-all shadow-lg"
                  >
                    <ShoppingCart size={18} />
                    أضف
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
      whileHover={{ y: -8 }}
      className="group card-elevated hover:border-primary-green/50 overflow-hidden flex flex-col h-full"
    >
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-50">
        {product.image ? (
          <motion.img
            whileHover={{ scale: 1.1 }}
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-green/10 to-blue-500/10">
            <span className="text-5xl">📦</span>
          </div>
        )}

        {/* Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent flex items-end p-4 gap-2"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="flex-1 py-2 bg-white/90 backdrop-blur-sm hover:bg-white text-slate-900 rounded-lg font-bold transition-all flex items-center justify-center gap-2"
          >
            <Eye size={16} />
            عرض
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsFavorite(!isFavorite)}
            className="p-2 bg-white/90 backdrop-blur-sm hover:bg-white rounded-lg transition-all"
          >
            <Heart size={16} className={isFavorite ? 'fill-red-500 text-red-500' : 'text-slate-600'} />
          </motion.button>
        </motion.div>

        {/* Category Badge */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute top-4 right-4 bg-gradient-to-r from-primary-green to-primary-teal text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg"
        >
          {product.category === 'services' ? '🎯 خدمة' : '📱 منتج'}
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Title & Rating */}
        <div className="mb-3">
          <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-primary-green transition-colors font-display">
            {product.name}
          </h3>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
            ))}
            <span className="text-xs text-slate-500 ms-2">(28 تقييم)</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-2 flex-1">
          {product.description}
        </p>

        {/* Duration */}
        {product.duration && (
          <div className="flex items-center gap-2 text-xs text-slate-600 mb-4">
            <span>⏱️</span>
            <span>المدة: <strong>{product.duration}</strong></span>
          </div>
        )}

        {/* Features */}
        {product.features && product.features.length > 0 && (
          <div className="mb-4 pb-4 border-b border-slate-100">
            <p className="text-xs font-bold text-slate-700 mb-2 uppercase">المميزات:</p>
            <ul className="space-y-1.5">
              {product.features.slice(0, 2).map((feature, i) => (
                <li key={i} className="text-xs text-slate-600 flex items-start gap-2">
                  <span className="text-primary-green mt-0.5 flex-shrink-0">✓</span>
                  <span className="line-clamp-1">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Price & Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto gap-3">
          <div>
            <p className="text-2xl font-bold text-primary-green">
              {product.price.toLocaleString('ar-SA')}
              <span className="text-xs text-slate-500 font-normal"> ر.س</span>
            </p>
          </div>
          <div className="flex gap-2">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Link
                to={`/product/${product.id}`}
                className="inline-flex items-center justify-center p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all"
              >
                <Eye size={18} />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Link
                to="/cart"
                className="inline-flex items-center justify-center p-2 rounded-lg bg-primary-green hover:bg-primary-green/90 text-white transition-all shadow-lg"
              >
                <ShoppingCart size={18} />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
