import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Check, Star, Share2, Heart, ChevronRight, Calendar, Tag, Clock, Shield, ExternalLink, Play, ArrowRight as ArrowRightIcon, AlertTriangle, Lock, RefreshCw, Wrench } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '@/hooks/useProducts';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';

export const ProductDetail = () => {
  const { t, i18n } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, loading, error } = useProducts();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const product = products.find((p) => p.id === id);
  const isDisabled = product?.state === 'inactive' || product?.state === 'updating';

  useEffect(() => {
    if (product && product.image) {
      setSelectedImage(0);
    }
  }, [product]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-32 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
        <Helmet>
          <title>{t('seo.product_detail_title', { name: '' })}</title>
          <meta name="description" content={t('seo.product_detail_desc', { name: '' })} />
          <meta property="og:title" content={t('seo.product_detail_title', { name: '' })} />
          <meta property="og:description" content={t('seo.product_detail_desc', { name: '' })} />
          <meta property="og:type" content="product" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={t('seo.product_detail_title', { name: '' })} />
          <meta name="twitter:description" content={t('seo.product_detail_desc', { name: '' })} />
        </Helmet>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="flex flex-col items-center gap-4"
        >
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full" />
          <p className="text-lg text-slate-600 dark:text-slate-300">{t('common.loading_product')}</p>
        </motion.div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-32 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
        <Helmet>
          <title>{t('seo.product_detail_title', { name: '' })}</title>
          <meta name="description" content={t('seo.product_detail_desc', { name: '' })} />
          <meta property="og:title" content={t('seo.product_detail_title', { name: '' })} />
          <meta property="og:description" content={t('seo.product_detail_desc', { name: '' })} />
          <meta property="og:type" content="product" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={t('seo.product_detail_title', { name: '' })} />
          <meta name="twitter:description" content={t('seo.product_detail_desc', { name: '' })} />
        </Helmet>
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{t('common.product_not_found')}</h2>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold hover:underline"
          >
            <ArrowLeft size={20} />
            {t('common.back_to_products')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <Helmet>
        <title>{t('seo.product_detail_title', { name: product.name })}</title>
        <meta name="description" content={t('seo.product_detail_desc', { name: product.name })} />
        <meta property="og:title" content={t('seo.product_detail_title', { name: product.name })} />
        <meta property="og:description" content={t('seo.product_detail_desc', { name: product.name })} />
        <meta property="og:type" content="product" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('seo.product_detail_title', { name: product.name })} />
        <meta name="twitter:description" content={t('seo.product_detail_desc', { name: product.name })} />
      </Helmet>

      {/* Breadcrumb */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-100 dark:border-slate-700 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              {t('common.home')}
            </Link>
            <ChevronRight size={16} className="text-slate-300 dark:text-slate-500" />
            <Link to="/products" className="text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              {t('common.products')}
            </Link>
            <ChevronRight size={16} className="text-slate-300 dark:text-slate-500" />
            <span className="text-slate-900 dark:text-white font-medium">{product.name}</span>
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
              className="relative aspect-square rounded-[3rem] overflow-hidden bg-slate-100 dark:bg-slate-800 transition-colors duration-300 border border-slate-200 dark:border-slate-700"
            >
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-500/10 to-blue-500/10 dark:from-emerald-400/5 dark:to-blue-400/5">
                  <span className="text-8xl opacity-30">📦</span>
                </div>
              )}
            </motion.div>
          </div>

          {/* Details */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 font-semibold text-sm border border-emerald-200 dark:border-emerald-800">
                    📱 {t('common.system')}
                  </span>
                  {product.state === 'inactive' && (
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-sm border border-slate-200 dark:border-slate-600">
                      <Wrench size={16} />
                      {t('common.in_development')}
                    </span>
                  )}
                  {product.state === 'updating' && (
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 font-semibold text-sm border border-amber-200 dark:border-amber-800">
                      <RefreshCw size={16} className="animate-spin" style={{ animationDuration: '3s' }} />
                      {t('common.in_update')}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`p-3 rounded-2xl transition-all ${isWishlisted
                      ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-400 dark:text-slate-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400'
                    }`}
                >
                  <Heart size={24} fill={isWishlisted ? 'currentColor' : 'none'} />
                </button>
              </div>

              <h1 className={`text-4xl lg:text-5xl font-display font-bold mb-4 transition-colors duration-300 ${
                product.state === 'inactive'
                  ? 'text-slate-500 dark:text-slate-400'
                  : product.state === 'updating'
                  ? 'text-slate-700 dark:text-slate-200'
                  : 'text-slate-900 dark:text-white'
              }`}>
                {product.name}
              </h1>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={`${i < 4 ? (isDisabled ? 'text-slate-300 fill-slate-300 dark:text-slate-600 dark:fill-slate-600' : 'text-amber-400 fill-amber-400') : 'text-slate-200 dark:text-slate-700'}`}
                    />
                  ))}
                </div>
                <span className={`transition-colors duration-300 ${isDisabled ? 'text-slate-400 dark:text-slate-500' : 'text-slate-500 dark:text-slate-400'}`}>
                  {isDisabled ? t('common.not_available_now') : t('common.review_count', { count: 128 })}
                </span>
              </div>

              <p className={`text-xl leading-relaxed mb-8 transition-colors duration-300 ${
                isDisabled ? 'text-slate-500 dark:text-slate-400' : 'text-slate-600 dark:text-slate-300'
              }`}>
                {product.description}
              </p>

              <div className={`flex items-baseline gap-3 mb-8 transition-colors duration-300 ${isDisabled ? 'opacity-70' : ''}`}>
                <span className={`text-5xl font-bold ${isDisabled ? 'text-slate-400 dark:text-slate-500' : 'text-emerald-600 dark:text-emerald-400'}`}>
                  {product.price.toLocaleString(i18n.language === 'ar' ? 'ar-SA' : 'en-US')}
                </span>
                <span className={`text-xl ${isDisabled ? 'text-slate-400 dark:text-slate-500' : 'text-slate-500 dark:text-slate-400'}`}>{t('products.currency')}</span>
              </div>

              {product.state === 'inactive' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-8 p-4 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center flex-shrink-0">
                    <Wrench size={20} className="text-slate-500 dark:text-slate-400" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{t('product_detail.in_development_title')}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{t('product_detail.in_development_desc')}</p>
                  </div>
                </motion.div>
              )}

              {product.state === 'updating' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-8 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-2xl border border-amber-200 dark:border-amber-800 flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-800 flex items-center justify-center flex-shrink-0">
                    <RefreshCw size={20} className="text-amber-500 dark:text-amber-400 animate-spin" style={{ animationDuration: '3s' }} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-amber-700 dark:text-amber-300">{t('product_detail.in_update_title')}</p>
                    <p className="text-xs text-amber-600 dark:text-amber-400">{t('product_detail.in_update_desc')}</p>
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">{t('product_detail.features')}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {product.features.map((feature, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 transition-colors duration-300"
                    >
                      <Check size={20} className="text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                      <span className="text-slate-700 dark:text-slate-200 text-sm">{feature}</span>
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
                <div className="flex items-center gap-3 p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 transition-colors duration-300">
                  <Clock size={20} className="text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                  <span className="text-slate-700 dark:text-slate-200">
                    <span className="font-bold">{t('product_detail.duration')}</span> {product.duration}
                  </span>
                </div>
              </motion.div>
            )}

            {/* Try System Button - Professional full-sized button */}
            {product.systemUrl && !isDisabled && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <a
                  href={product.systemUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-5 px-6 rounded-2xl font-bold text-xl shadow-lg transition-all flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-500 to-teal-500 dark:from-emerald-400 dark:to-teal-400 text-white hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                  title={t('common.try_system')}
                >
                  <Play size={24} fill="currentColor" />
                  {t('product_detail.try_system')}
                  <ExternalLink size={18} className="opacity-80" />
                </a>
              </motion.div>
            )}

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex gap-4 flex-col md:flex-row"
            >
              {!isDisabled ? (
                <Link
                  to="/contact"
                  className="flex-1 py-5 rounded-2xl font-bold text-xl shadow-xl transition-all flex items-center justify-center gap-3 bg-gradient-to-r from-primary-navy to-slate-700 dark:from-primary-navy dark:to-slate-600 text-white hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98]"
                >
                  <ArrowRightIcon size={20} />
                  {t('product_detail.order_service')}
                </Link>
              ) : (
                <div className={`flex-1 py-5 rounded-2xl font-bold text-xl flex items-center justify-center gap-3 shadow-inner ${
                  product.state === 'updating'
                    ? 'bg-amber-100 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border-2 border-amber-200 dark:border-amber-800'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 border-2 border-slate-200 dark:border-slate-600'
                }`}>
                  <Lock size={24} />
                  {product.state === 'updating' ? t('product_detail.system_updating') : t('product_detail.system_developing')}
                </div>
              )}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-5 rounded-2xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-all"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: product.name,
                      text: product.description,
                      url: window.location.href,
                    });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                  }
                }}
              >
                <Share2 size={24} className="text-slate-700 dark:text-slate-300" />
              </motion.button>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-200 dark:border-slate-700 transition-colors duration-300"
            >
              <div className="text-center">
                <Shield size={28} className="text-emerald-600 dark:text-emerald-400 mx-auto mb-2" />
                <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{t('product_detail.quality_guarantee')}</p>
              </div>
              <div className="text-center">
                <Calendar size={28} className="text-emerald-600 dark:text-emerald-400 mx-auto mb-2" />
                <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{t('product_detail.secure_payment')}</p>
              </div>
              <div className="text-center">
                <Tag size={28} className="text-emerald-600 dark:text-emerald-400 mx-auto mb-2" />
                <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{t('product_detail.competitive_prices')}</p>
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
          <h2 className="text-3xl font-display font-bold text-slate-900 dark:text-white mb-8">
            {t('product_detail.related_products')}
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
                  <div className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 dark:border-slate-700 hover:border-emerald-400/50 dark:hover:border-emerald-500/50">
                    <div className="aspect-square bg-slate-100 dark:bg-slate-900 overflow-hidden transition-colors duration-300">
                      {relatedProduct.image ? (
                        <img
                          src={relatedProduct.image}
                          alt={relatedProduct.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-500/10 to-blue-500/10">
                          <span className="text-4xl opacity-50">📦</span>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {relatedProduct.name}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 line-clamp-2">
                        {relatedProduct.description}
                      </p>
                      <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                        {relatedProduct.price.toLocaleString(i18n.language === 'ar' ? 'ar-SA' : 'en-US')} {t('products.currency')}
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
