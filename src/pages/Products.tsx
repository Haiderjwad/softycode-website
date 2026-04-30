import { useProducts } from '@/hooks/useProducts';
import { motion } from 'motion/react';
import { ChevronRight, Search, Grid, List } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Loader as GlobalLoader } from '@/components/Loader';
import { ProductCard } from '@/components/ProductCard';

export const Products = () => {
  const { products, loading, error } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'products' | 'services'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

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

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Separate products and services
  const services = filteredProducts.filter(p => p.category === 'services');
  const softwareProducts = filteredProducts.filter(p => p.category === 'products');

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-24 pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl lg:text-6xl font-display font-bold text-primary-navy mb-6">
            منتجاتنا وخدماتنا
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            اكتشف مجموعة شاملة من الحلول البرمجية المتطورة التي صممت خصيصاً لتلبية احتياجات عملك
          </p>
          <p className="text-sm text-slate-400 mt-4">
            {products.length} منتج وخدمة متاحة حالياً
          </p>
        </motion.div>

        {/* Filters & Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
            {/* Search */}
            <div className="relative flex-1 w-full lg:max-w-md">
              <Search size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="ابحث عن منتج أو خدمة..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-12 pl-4 py-3 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:border-primary-green focus:ring-4 focus:ring-primary-green/10 transition-all outline-none"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 items-center">
              {/* Category Filter */}
              <div className="flex gap-2 p-1 bg-slate-100 rounded-2xl">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-4 py-2 rounded-xl font-semibold transition-all ${
                    selectedCategory === 'all'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  الكل
                </button>
                <button
                  onClick={() => setSelectedCategory('products')}
                  className={`px-4 py-2 rounded-xl font-semibold transition-all ${
                    selectedCategory === 'products'
                      ? 'bg-primary-green text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  برمجيات
                </button>
                <button
                  onClick={() => setSelectedCategory('services')}
                  className={`px-4 py-2 rounded-xl font-semibold transition-all ${
                    selectedCategory === 'services'
                      ? 'bg-primary-navy text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  خدمات
                </button>
              </div>

              {/* View Mode */}
              <div className="flex gap-2 p-1 bg-slate-100 rounded-2xl">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-xl transition-all ${
                    viewMode === 'grid' ? 'bg-white text-primary-green shadow-sm' : 'text-slate-600'
                  }`}
                >
                  <Grid size={20} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-xl transition-all ${
                    viewMode === 'list' ? 'bg-white text-primary-green shadow-sm' : 'text-slate-600'
                  }`}
                >
                  <List size={20} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Services Section */}
        {services.length > 0 && (
          <div className="mb-20">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-primary-navy text-sm font-bold uppercase tracking-widest">الخدمات</span>
                <h2 className="text-3xl lg:text-4xl font-display font-bold text-primary-navy mt-2">
                  خدماتنا المتميزة
                </h2>
              </div>
              <span className="text-slate-500 text-sm bg-slate-100 px-4 py-2 rounded-full">
                {services.length} خدمة
              </span>
            </div>
            <div className={viewMode === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              : "space-y-6"
            }>
              {services.map((service, index) => (
                <ProductCard 
                  key={service.id} 
                  product={service} 
                  index={index}
                  viewMode={viewMode}
                />
              ))}
            </div>
          </div>
        )}

        {/* Products Section */}
        {softwareProducts.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-primary-navy text-sm font-bold uppercase tracking-widest">البرامج</span>
                <h2 className="text-3xl lg:text-4xl font-display font-bold text-primary-navy mt-2">
                  الأنظمة البرمجية
                </h2>
              </div>
              <span className="text-slate-500 text-sm bg-slate-100 px-4 py-2 rounded-full">
                {softwareProducts.length} نظام
              </span>
            </div>
            <div className={viewMode === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
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
        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-6">🔍</div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">لم يتم العثور على نتائج</h3>
            <p className="text-slate-600">جرب تغيير مصطلحات البحث أو الفلاتر</p>
          </motion.div>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-primary-green to-primary-navy rounded-3xl p-12 lg:p-16 text-center text-white mt-20"
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            لم تجد ما تبحث عنه؟
          </h2>
          <p className="text-lg text-white/80 mb-8">
            تحدث معنا عن احتياجاتك الخاصة وسنقوم بتطوير حل مخصص لك
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-white text-primary-green px-8 py-3 rounded-xl font-bold hover:scale-105 transition-transform"
          >
            تواصل معنا <ChevronRight size={20} />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};
