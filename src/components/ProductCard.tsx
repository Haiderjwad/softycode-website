import React from 'react';
import { motion } from 'motion/react';
import { Star, Eye, Heart, MessageCircle, ExternalLink, Play, ArrowRight, Lock, RefreshCw, Code2, Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Product } from '@/hooks/useProducts';

interface ProductCardProps {
  product: Product;
  index: number;
  viewMode: 'grid' | 'list';
}

const StateBadge: React.FC<{ state?: string }> = ({ state }) => {
  const { t } = useTranslation();
  if (state === 'inactive') {
    return (
      <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-slate-500/90 dark:bg-slate-600/90 text-white shadow-lg backdrop-blur-sm">
        <Code2 size={14} />
        {t('common.in_development')}
      </div>
    );
  }
  if (state === 'updating') {
    return (
      <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-amber-500/90 dark:bg-amber-600/90 text-white shadow-lg backdrop-blur-sm">
        <RefreshCw size={14} className="animate-spin" />
        {t('common.in_update')}
      </div>
    );
  }
  return null;
};

const StatusOverlay: React.FC<{ state?: string }> = ({ state }) => {
  const { t } = useTranslation();
  if (state === 'inactive') {
    return (
      <div className="absolute inset-0 z-10 bg-slate-100/60 dark:bg-slate-900/70 backdrop-blur-[2px] rounded-3xl flex flex-col items-center justify-center gap-3">
        <div className="w-16 h-16 rounded-2xl bg-slate-200 dark:bg-slate-700 flex items-center justify-center shadow-xl">
          <Wrench size={32} className="text-slate-500 dark:text-slate-400" />
        </div>
        <div className="text-center">
          <p className="text-sm font-bold text-slate-600 dark:text-slate-300">{t('common.in_development')}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{t('common.coming_soon')}</p>
        </div>
      </div>
    );
  }
  if (state === 'updating') {
    return (
      <div className="absolute inset-0 z-10 bg-amber-50/40 dark:bg-amber-950/30 backdrop-blur-[1px] rounded-3xl flex flex-col items-center justify-center gap-3">
        <div className="w-16 h-16 rounded-2xl bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center shadow-xl">
          <RefreshCw size={32} className="text-amber-500 dark:text-amber-400 animate-spin" style={{ animationDuration: '3s' }} />
        </div>
        <div className="text-center">
          <p className="text-sm font-bold text-amber-700 dark:text-amber-300">{t('common.in_update')}</p>
          <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">{t('common.back_soon')}</p>
        </div>
      </div>
    );
  }
  return null;
};

export const ProductCard: React.FC<ProductCardProps> = ({ product, index, viewMode }) => {
  const { t } = useTranslation();
  const [isFavorite, setIsFavorite] = useState(false);
  const isDisabled = product.state === 'inactive' || product.state === 'updating';

  const ImageLinkWrapper: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
    if (isDisabled) {
      return <div className={className}>{children}</div>;
    }
    return (
      <Link to={`/product/${product.id}`} className={className}>
        {children}
      </Link>
    );
  };

  const TitleLinkWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    if (isDisabled) {
      return <div>{children}</div>;
    }
    return <Link to={`/product/${product.id}`}>{children}</Link>;
  };

  if (viewMode === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        viewport={{ once: true }}
        className={`group relative rounded-3xl border overflow-hidden transition-all duration-500 ${
          product.state === 'inactive'
            ? 'bg-slate-50 dark:bg-slate-800/50 border-slate-200/60 dark:border-slate-700/40'
            : product.state === 'updating'
            ? 'bg-amber-50/30 dark:bg-slate-800/50 border-amber-200/40 dark:border-amber-700/30'
            : 'bg-white dark:bg-slate-800 border-slate-200/60 dark:border-slate-700/60 hover:border-primary-green/30 hover:shadow-2xl hover:shadow-primary-green/5'
        }`}
      >
        <StatusOverlay state={product.state} />
        <div className="flex flex-col md:flex-row">
          {/* Image Section */}
          <ImageLinkWrapper
            className={`relative md:w-96 h-56 md:h-auto overflow-hidden bg-gradient-to-br from-slate-100 dark:from-slate-800 to-slate-50 dark:to-slate-900 flex-shrink-0 transition-colors duration-300 block ${isDisabled ? 'cursor-default' : ''}`}
          >
            {product.image ? (
              <motion.img
                whileHover={isDisabled ? {} : { scale: 1.15 }}
                src={product.image}
                alt={product.name}
                className={`w-full h-full object-cover ${isDisabled ? 'grayscale-[0.4] opacity-70' : ''}`}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-green/10 to-blue-500/10 dark:from-primary-green/5 dark:to-blue-500/5 transition-colors duration-300">
                <span className="text-6xl">📦</span>
              </div>
            )}
            <div className="absolute top-4 right-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg backdrop-blur-sm">
              <span>📱 {t('common.system')}</span>
            </div>
            <StateBadge state={product.state} />
          </ImageLinkWrapper>

          {/* Content Section */}
          <div className="flex-1 p-8 flex flex-col">
            <div className="flex-1">
              <TitleLinkWrapper>
                <h3 className={`text-2xl lg:text-3xl font-display font-bold mb-3 transition-colors duration-300 ${
                  product.state === 'inactive'
                    ? 'text-slate-500 dark:text-slate-400'
                    : product.state === 'updating'
                    ? 'text-slate-700 dark:text-slate-200'
                    : 'text-slate-900 dark:text-white group-hover:text-primary-green'
                }`}>
                  {product.name}
                </h3>
              </TitleLinkWrapper>

              <p className={`leading-relaxed mb-5 text-base transition-colors duration-300 line-clamp-2 ${
                isDisabled
                  ? 'text-slate-400 dark:text-slate-500'
                  : 'text-slate-600 dark:text-slate-400'
              }`}>
                {product.description}
              </p>

              {/* Meta Info */}
              <div className="flex items-center gap-6 mb-6 pb-6 border-b border-slate-200 dark:border-slate-700 transition-colors duration-300">
                {product.duration && (
                  <div className={`flex items-center gap-2 text-sm transition-colors duration-300 ${
                    isDisabled ? 'text-slate-400 dark:text-slate-500' : 'text-slate-600 dark:text-slate-400'
                  }`}>
                    <span className="text-lg">⏱️</span>
                    <span>{t('common.duration')} <strong>{product.duration}</strong></span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className={isDisabled ? 'fill-slate-300 text-slate-300 dark:fill-slate-600 dark:text-slate-600' : 'fill-amber-400 text-amber-400'} />
                  ))}
                </div>
              </div>

              {/* Features Grid */}
              {product.features && product.features.length > 0 && (
                <div className="mb-6">
                  <p className={`text-xs font-bold mb-4 uppercase tracking-widest transition-colors duration-300 ${
                    isDisabled ? 'text-slate-500 dark:text-slate-500' : 'text-slate-700 dark:text-slate-300'
                  }`}>{t('common.features_main')}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {product.features.slice(0, 4).map((feature, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className={`flex items-start gap-3 p-2 rounded-lg transition-colors duration-300 ${
                          isDisabled ? 'opacity-60' : 'hover:bg-slate-50 dark:hover:bg-slate-800'
                        }`}
                      >
                        <span className={`font-bold mt-1 ${isDisabled ? 'text-slate-400' : 'text-primary-green'}`}>✓</span>
                        <span className={`text-sm font-medium transition-colors duration-300 ${
                          isDisabled ? 'text-slate-500 dark:text-slate-500' : 'text-slate-700 dark:text-slate-300'
                        }`}>{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                  {product.features.length > 4 && !isDisabled && (
                    <motion.div whileHover={{ x: 5 }} className="mt-3 inline-block">
                      <span className="text-sm text-primary-green font-bold cursor-pointer hover:underline">
                        {t('common.additional_features', { count: product.features.length - 4 })}
                      </span>
                    </motion.div>
                  )}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-200 dark:border-slate-700 mt-auto gap-4 transition-colors duration-300 flex-wrap">
              <div className="flex flex-col">
                <span className={`text-sm font-medium transition-colors duration-300 ${
                  isDisabled ? 'text-slate-400 dark:text-slate-500' : 'text-slate-600 dark:text-slate-400'
                }`}>{t('products.price_label', 'السعر')}</span>
                <p className={`text-3xl font-bold ${isDisabled ? 'text-slate-400' : 'text-primary-green'}`}>
                  {product.price.toLocaleString('ar-SA')}
                  <span className={`text-base font-normal ${isDisabled ? 'text-slate-400' : 'text-slate-500'}`}> {t('products.currency', 'ر.س')}</span>
                </p>
              </div>

              <div className="flex gap-3 flex-wrap">
                {!isDisabled && (
                  <>
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
                        {t('products.order_now')}
                      </Link>
                    </motion.div>
                  </>
                )}
                {isDisabled && (
                  <div className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                    product.state === 'updating'
                      ? 'bg-amber-100 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-600'
                  }`}>
                    <Lock size={18} />
                    {product.state === 'updating' ? t('common.in_update') : t('common.in_development')}
                  </div>
                )}
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
      whileHover={isDisabled ? {} : { y: -6 }}
      className={`group relative rounded-3xl border overflow-hidden flex flex-col h-full transition-all duration-500 ${
        product.state === 'inactive'
          ? 'bg-slate-50 dark:bg-slate-800/50 border-slate-200/60 dark:border-slate-700/40'
          : product.state === 'updating'
          ? 'bg-amber-50/30 dark:bg-slate-800/50 border-amber-200/40 dark:border-amber-700/30'
          : 'bg-white dark:bg-slate-800 border-slate-200/60 dark:border-slate-700/60 hover:border-primary-green/30 hover:shadow-2xl hover:shadow-primary-green/5'
      }`}
    >
      {/* State Overlay for Grid */}
      {isDisabled && (
        <div className="absolute inset-0 z-20 bg-white/40 dark:bg-slate-900/50 backdrop-blur-[2px] rounded-3xl flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl ${
            product.state === 'updating' ? 'bg-amber-100 dark:bg-amber-900/40' : 'bg-slate-200 dark:bg-slate-700'
          }`}>
            {product.state === 'updating' ? (
              <RefreshCw size={28} className="text-amber-500 dark:text-amber-400 animate-spin" style={{ animationDuration: '3s' }} />
            ) : (
              <Wrench size={28} className="text-slate-500 dark:text-slate-400" />
            )}
          </div>
          <div className="text-center">
            <p className={`text-sm font-bold ${
              product.state === 'updating' ? 'text-amber-700 dark:text-amber-300' : 'text-slate-600 dark:text-slate-300'
            }`}>
              {product.state === 'updating' ? t('common.in_update') : t('common.in_development')}
            </p>
            <p className={`text-xs mt-1 ${
              product.state === 'updating' ? 'text-amber-600 dark:text-amber-400' : 'text-slate-500 dark:text-slate-400'
            }`}>
              {product.state === 'updating' ? t('common.back_soon') : t('common.coming_soon')}
            </p>
          </div>
        </div>
      )}

      {/* Top Status Banner */}
      {product.state === 'inactive' && (
        <div className="absolute top-0 inset-x-0 z-10 bg-slate-500 dark:bg-slate-600 text-white text-xs font-bold text-center py-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {t('common.in_development')} - {t('common.not_available_now')}
        </div>
      )}
      {product.state === 'updating' && (
        <div className="absolute top-0 inset-x-0 z-10 bg-amber-500 dark:bg-amber-600 text-white text-xs font-bold text-center py-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {t('common.in_update')} - {t('common.back_soon')}
        </div>
      )}

      <div className={`relative h-64 overflow-hidden bg-gradient-to-br from-slate-100 dark:from-slate-800 to-slate-50 dark:to-slate-900 transition-colors duration-300 block ${isDisabled ? 'cursor-default' : ''}`}>
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className={`w-full h-full object-cover transition-all duration-500 ${isDisabled ? 'grayscale-[0.3] opacity-70' : 'group-hover:scale-110'}`}
          />
        ) : (
          <div className={`w-full h-full flex items-center justify-center transition-colors duration-300 ${
            isDisabled
              ? 'bg-slate-100 dark:bg-slate-800'
              : 'bg-gradient-to-br from-primary-green/10 dark:from-primary-green/5 to-blue-500/10 dark:to-blue-500/5'
          }`}>
            <span className="text-5xl">📦</span>
          </div>
        )}

        {/* Category Badge */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute top-4 right-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg"
        >
          📱 {t('common.system')}
        </motion.div>

        <StateBadge state={product.state} />
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Title & Rating */}
        <div className="mb-3">
          <TitleLinkWrapper>
            <h3 className={`text-lg font-bold mb-2 line-clamp-2 transition-colors duration-300 font-display ${
              product.state === 'inactive'
                ? 'text-slate-500 dark:text-slate-400'
                : product.state === 'updating'
                ? 'text-slate-700 dark:text-slate-200'
                : 'text-slate-900 dark:text-white group-hover:text-primary-green'
            }`}>
              {product.name}
            </h3>
          </TitleLinkWrapper>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} className={isDisabled ? 'fill-slate-300 text-slate-300 dark:fill-slate-600 dark:text-slate-600' : 'fill-amber-400 text-amber-400'} />
            ))}
            <span className={`text-xs ms-2 transition-colors duration-300 ${isDisabled ? 'text-slate-400 dark:text-slate-500' : 'text-slate-500 dark:text-slate-400'}`}>
              {isDisabled ? t('common.not_available') : t('common.review_count', { count: 28 })}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className={`text-sm leading-relaxed mb-4 line-clamp-2 flex-1 transition-colors duration-300 ${
          isDisabled ? 'text-slate-400 dark:text-slate-500' : 'text-slate-600 dark:text-slate-400'
        }`}>
          {product.description}
        </p>

        {/* Duration */}
        {product.duration && (
          <div className={`flex items-center gap-2 text-xs mb-4 transition-colors duration-300 ${
            isDisabled ? 'text-slate-400 dark:text-slate-500' : 'text-slate-600 dark:text-slate-400'
          }`}>
            <span>⏱️</span>
              <span>{t('common.duration')} <strong>{product.duration}</strong></span>
          </div>
        )}

        {/* Features */}
        {product.features && product.features.length > 0 && (
          <div className="mb-4 pb-4 border-b border-slate-200 dark:border-slate-700 transition-colors duration-300">
            <p className={`text-xs font-bold mb-2 uppercase transition-colors duration-300 ${
              isDisabled ? 'text-slate-500 dark:text-slate-500' : 'text-slate-700 dark:text-slate-300'
            }`}>{t('common.features') + ':'}</p>
            <ul className="space-y-1.5">
              {product.features.slice(0, 2).map((feature, i) => (
                <li key={i} className={`text-sm flex items-start gap-2 transition-colors duration-300 ${
                  isDisabled ? 'text-slate-500 dark:text-slate-500' : 'text-slate-600 dark:text-slate-400'
                }`}>
                  <span className={`mt-0.5 flex-shrink-0 ${isDisabled ? 'text-slate-400' : 'text-primary-green'}`}>✓</span>
                  <span className="line-clamp-1">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Price & Actions */}
        <div className={`flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700 mt-auto gap-3 transition-colors duration-300 ${
          isDisabled ? 'opacity-70' : ''
        }`}>
          <div>
            <p className={`text-2xl font-bold ${isDisabled ? 'text-slate-400' : 'text-primary-green'}`}>
              {product.price.toLocaleString('ar-SA')}
              <span className={`text-xs font-normal transition-colors duration-300 ${isDisabled ? 'text-slate-400' : 'text-slate-500 dark:text-slate-400'}`}> {t('products.currency', 'ر.س')}</span>
            </p>
          </div>
        </div>

        {/* Try System Button */}
        {product.systemUrl && !isDisabled && (
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
        {!isDisabled && (
          <Link
            to="/contact"
            className="mt-3 w-full py-3 px-4 rounded-xl border-2 border-primary-navy dark:border-slate-400 text-primary-navy dark:text-slate-300 font-semibold text-center transition-all duration-300 hover:bg-primary-navy hover:text-white dark:hover:bg-slate-300 dark:hover:text-slate-900 flex items-center justify-center gap-2"
            onClick={(e) => e.stopPropagation()}
          >
            <ArrowRight size={18} />
            {t('products.order_now')}
          </Link>
        )}

        {/* Disabled State Placeholder Button */}
        {isDisabled && (
          <div className={`mt-4 w-full py-3 px-4 rounded-xl font-bold text-center transition-all duration-300 flex items-center justify-center gap-2 border-2 ${
            product.state === 'updating'
              ? 'bg-amber-100 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800'
              : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-600'
          }`}>
            <Lock size={16} />
            {product.state === 'updating' ? t('common.in_update') : t('common.in_development')}
          </div>
        )}
      </div>
    </motion.div>
  );
};
