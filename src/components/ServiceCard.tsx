import { motion } from 'framer-motion';
import { Star, Play, MessageCircle, ArrowRight, Eye, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  period?: string;
  features?: string[];
  image?: string;
}

interface ServiceCardProps {
  service: Service;
  index: number;
  viewMode: 'grid' | 'list';
}

export const ServiceCard = ({ service, index, viewMode }: ServiceCardProps) => {
  const { t } = useTranslation();

  if (viewMode === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.1 }}
        viewport={{ once: true }}
        whileHover={{ y: -4 }}
        className="group bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:shadow-primary-green/5 border border-slate-200/60 dark:border-slate-700/60 hover:border-primary-green/30 transition-all duration-500"
      >
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
          <div className="w-full md:w-64 h-48 shrink-0 rounded-2xl overflow-hidden bg-gradient-to-br from-slate-100 dark:from-slate-800 to-slate-50 dark:to-slate-900 border border-slate-100 dark:border-slate-700/50 shadow-inner relative group-hover:shadow-lg transition-all duration-500">
            {service.image ? (
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-primary-green/20 dark:text-primary-green/10 bg-primary-green/5 dark:bg-slate-800/80">
                <Sparkles size={64} strokeWidth={1} />
              </div>
            )}
            <div className="absolute top-3 right-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
              خدمة
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>

          <div className="flex-1 w-full space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary-green transition-colors duration-300 font-display">
                  {service.name}
                </h3>
                <div className="flex items-center gap-1.5 mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-slate-500 dark:text-slate-400">(45 {t('common.reviews', 'تقييم')})</span>
                </div>
              </div>
            </div>

            <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed max-w-3xl">
              {service.description}
            </p>

            <div className="flex flex-wrap gap-x-8 gap-y-4 pt-2">
              {service.period && (
                <div className="flex items-center gap-2.5 text-sm bg-slate-50 dark:bg-slate-800/50 px-4 py-2 rounded-xl text-slate-700 dark:text-slate-300 border border-slate-100 dark:border-slate-700">
                  <span className="text-primary-green">⏱️</span>
                  <span>المدة: <strong>{service.period}</strong></span>
                </div>
              )}
            </div>

            {service.features && service.features.length > 0 && (
              <div className="pt-2">
                <p className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-3 uppercase tracking-wider">المميزات الرئيسية:</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
                  {service.features.slice(0, 4).map((feature, i) => (
                    <li key={i} className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary-green"></div>
                      <span className="line-clamp-1">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-between pt-6 mt-4 border-t border-slate-100 dark:border-slate-700/60 gap-4">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">{t('products.price_starts_from', 'السعر يبدأ من')}</p>
                <p className="text-3xl font-bold text-primary-green">
                  {service.price.toLocaleString('ar-SA')}
                  <span className="text-base text-slate-500 font-normal"> {t('products.currency', 'ر.س')}</span>
                </p>
              </div>

              <div className="flex gap-3 flex-wrap">
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
      <div className="relative h-64 overflow-hidden bg-gradient-to-br from-slate-100 dark:from-slate-800 to-slate-50 dark:to-slate-900 transition-colors duration-300 block">
        {service.image ? (
          <motion.img
            whileHover={{ scale: 1.1 }}
            src={service.image}
            alt={service.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-primary-green/20 dark:text-primary-green/10 bg-primary-green/5 dark:bg-slate-800/80">
            <Sparkles size={64} strokeWidth={1} />
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute top-4 right-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg"
        >
          خدمة
        </motion.div>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <div className="mb-3">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 line-clamp-2 group-hover:text-primary-green transition-colors duration-300 font-display">
            {service.name}
          </h3>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
            ))}
            <span className="text-xs text-slate-500 dark:text-slate-400 ms-2 transition-colors duration-300">(45 تقييم)</span>
          </div>
        </div>

        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2 flex-1 transition-colors duration-300">
          {service.description}
        </p>

        {service.period && (
          <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 mb-4 transition-colors duration-300">
            <span>⏱️</span>
            <span>المدة: <strong>{service.period}</strong></span>
          </div>
        )}

        {service.features && service.features.length > 0 && (
          <div className="mb-4 pb-4 border-b border-slate-200 dark:border-slate-700 transition-colors duration-300">
            <p className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase transition-colors duration-300">المميزات:</p>
            <ul className="space-y-1.5">
              {service.features.slice(0, 2).map((feature, i) => (
                <li key={i} className="text-xs text-slate-600 dark:text-slate-400 flex items-start gap-2 transition-colors duration-300">
                  <span className="text-primary-green mt-0.5 flex-shrink-0">✓</span>
                  <span className="line-clamp-1">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex flex-col pt-4 border-t border-slate-200 dark:border-slate-700 mt-auto gap-3 transition-colors duration-300">
          <div>
            <p className="text-2xl font-bold text-primary-green">
              {service.price.toLocaleString('ar-SA')}
              <span className="text-xs text-slate-500 dark:text-slate-400 font-normal transition-colors duration-300"> {t('products.currency', 'ر.س')}</span>
            </p>
          </div>

          <Link
            to="/contact"
            className="w-full py-3 px-4 rounded-xl border-2 border-primary-navy dark:border-slate-400 text-primary-navy dark:text-slate-300 font-semibold text-center transition-all duration-300 hover:bg-primary-navy hover:text-white dark:hover:bg-slate-300 dark:hover:text-slate-900 flex items-center justify-center gap-2"
            onClick={(e) => e.stopPropagation()}
          >
            <ArrowRight size={18} />
            {t('products.order_now', 'اطلب الآن')}
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
