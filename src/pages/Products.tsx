import { useProducts } from '@/hooks/useProducts';
import { motion } from 'motion/react';
import { ChevronRight, Search, Grid, List, SlidersHorizontal, LayoutGrid } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Loader as GlobalLoader } from '@/components/Loader';
import { ProductCard } from '@/components/ProductCard';

export const Products = () => {
  const { t } = useTranslation();
  const { products, loading, error } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-32">
        <GlobalLoader text={t('common.loading')} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-32">
        <div className="bg-red-50 border border-red-200 text-red-700 px-8 py-6 rounded-2xl max-w-md text-center">
          <h2 className="text-xl font-bold mb-2">{t('common.error')}</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  // Filter only products (software systems), completely remove services from this page
  const softwareProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return product.category === 'products' && matchesSearch;
  });

  return (
    <>
      <Helmet>
        <title>{t('seo.products_title')}</title>
        <meta name="description" content={t('seo.products_desc')} />
        <meta property="og:title" content={t('seo.products_title')} />
        <meta property="og:description" content={t('seo.products_desc')} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      {/* مسافة فاصله احترافيه بين الشريط العلوي للنظام ومحتوى القسم */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 lg:pt-36 pb-24">
        {/* Professional Toolbar */}
        {/* مسافة احترافية بين شريط البحث وكارتات المنتجات */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 sm:mb-20 lg:mb-24 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl p-4 md:p-5 shadow-sm border border-slate-200/60 dark:border-slate-700/60 sticky top-24 z-30"
        >
          <div className="flex flex-col md:flex-row gap-5 items-center justify-between">

            {/* Left side: Professional Search */}
            <div className="relative w-full md:max-w-xl group flex-1">
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                <Search size={22} className="text-slate-400 dark:text-slate-500 group-hover:text-primary-green transition-colors duration-300" />
              </div>
              <input
                type="text"
                placeholder={t('pages.products.search_placeholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-5 pr-12 py-3.5 bg-slate-100/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent text-slate-900 dark:text-white placeholder-slate-500 transition-all duration-300 hover:bg-slate-100 dark:hover:bg-slate-900 shadow-inner font-medium"
              />
            </div>

            {/* Right side: Tools & View Toggles */}
            <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
              {/* Product count nicely styled */}
              <div className="whitespace-nowrap px-5 py-3.5 bg-primary-green/10 border border-primary-green/20 text-primary-green font-bold rounded-2xl text-sm flex items-center gap-2 shadow-sm">
                <div className="w-2 h-2 rounded-full bg-primary-green animate-pulse" />
                {softwareProducts.length} {t('pages.products.system_count', { count: softwareProducts.length }).split(' ').slice(1).join(' ')}
              </div>

              {/* Professional Filter Button */}
              <button
                className="p-3.5 rounded-2xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:text-primary-green hover:border-primary-green hover:bg-primary-green/5 transition-all duration-300 shadow-sm flex items-center gap-2 font-medium"
                title="Filter"
              >
                <SlidersHorizontal size={20} />
                <span className="hidden sm:inline">{t('common.filter')}</span>
              </button>

              {/* View modes */}
              <div className="flex bg-slate-100 dark:bg-slate-900/80 p-1 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-inner">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2.5 rounded-xl transition-all duration-300 flex items-center justify-center ${viewMode === 'grid'
                    ? 'bg-white dark:bg-slate-700 text-primary-green shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
                    }`}
                  title="Grid View"
                >
                  <LayoutGrid size={20} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2.5 rounded-xl transition-all duration-300 flex items-center justify-center ${viewMode === 'list'
                    ? 'bg-white dark:bg-slate-700 text-primary-green shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
                    }`}
                  title="List View"
                >
                  <List size={20} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Products (Software Systems) Section */}
        {softwareProducts.length > 0 && (
          <div>
            <div className={viewMode === 'grid'
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-6"
            }>
              {softwareProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index}
                  viewMode={viewMode}
                />
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {softwareProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-6">🔍</div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{t('pages.products.no_results_title')}</h3>
            <p className="text-slate-600 dark:text-slate-400">{t('pages.products.no_results_desc')}</p>
          </motion.div>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-primary-green to-primary-navy rounded-3xl p-12 lg:p-16 text-center text-white mt-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            {t('pages.products.cta_title')}
          </h2>
          <p className="text-lg text-white/80 mb-8">
            {t('pages.products.cta_desc')}
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-white dark:bg-gray-800 text-primary-green dark:text-primary-green px-8 py-3 rounded-xl font-bold hover:scale-105 transition-transform"
          >
            {t('pages.products.cta_button')} <ChevronRight size={20} />
          </Link>
        </motion.div>
      </div>
    </div>
    </>
  );
};