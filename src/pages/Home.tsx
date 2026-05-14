import React from 'react';
import { motion } from 'motion/react';
import { useTranslation, Trans } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import {
  Code2,
  Zap,
  ChevronRight,
  ShieldCheck,
  Layers,
  MessageSquare,
  Globe,
  Rocket,
  Store,
  Stethoscope,
  Truck,
  Users,
  Award,
  Briefcase,
  ArrowUpRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSiteStats, useSiteSystems, useSiteFeatures, SiteSystem } from '../hooks/useSiteData';
import { useProducts } from '../hooks/useProducts';

export const Home = () => {
  const { t } = useTranslation();
  const { stats, loading: statsLoading } = useSiteStats();
  const { systems, loading: systemsLoading } = useSiteSystems();
  const { features, loading: featuresLoading } = useSiteFeatures();
  const { products, loading: productsLoading } = useProducts();

  // Fallback data while loading or if no data in Firebase
  const defaultStats = [
    { label: t('hero.stats.clients', 'عميل سعيد'), value: '500+', icon: 'Users', color: 'purple' },
    { label: t('hero.stats.projects', 'مشروع ناجح'), value: '1,200+', icon: 'Rocket', color: 'teal' },
    { label: t('hero.stats.experience', 'سنة خبرة'), value: '10+', icon: 'Award', color: 'blue' },
  ];

  const displayStats = statsLoading || stats.length === 0 ? defaultStats : stats;

  const iconMap: Record<string, React.ComponentType<{ className?: string; size?: number }>> = {
    Users,
    Rocket,
    Award,
    Briefcase,
    Store,
    Stethoscope,
    Truck,
    Code2,
    Layers,
    MessageSquare,
    ShieldCheck
  };

  const colorMap: Record<string, { text: string; bg: string }> = {
    purple: { text: 'text-fuchsia-600', bg: 'bg-fuchsia-100' },
    teal: { text: 'text-teal-600', bg: 'bg-teal-100' },
    blue: { text: 'text-blue-600', bg: 'bg-blue-100' },
    green: { text: 'text-emerald-600', bg: 'bg-emerald-100' },
    orange: { text: 'text-orange-600', bg: 'bg-orange-100' },
    indigo: { text: 'text-indigo-600', bg: 'bg-indigo-100' },
  };

  const defaultFeatures = [
    { title: t('features.smart_dev.title', 'تطوير ناعم ذكي'), icon: 'Code2', color: 'green', bg: 'bg-green-100', description: t('features.smart_dev.desc', 'بنية تحتية مرنة تواكب نمو أعمالك مع واجهات مستخدم متميزة لتحقيق أعلى معايير الجودة.') },
    { title: t('features.support.title', 'دعم فني استثنائي'), icon: 'MessageSquare', color: 'blue', bg: 'bg-blue-100', description: t('features.support.desc', 'فريق متخصص متواجد على مدار الساعة لضمان استمرارية عمل نظامك بكفاءة عالية وبدون توقف.') },
    { title: t('features.updates.title', 'تحديثات مستمرة'), icon: 'Layers', color: 'indigo', bg: 'bg-indigo-100', description: t('features.updates.desc', 'ابقى دائماً في الصدارة مع تحديثات دورية تضمن لك أحدث الميزات البرمجية والتطويرات الأمنية.') },
    { title: t('features.security.title', 'أمان سحابي متقدم'), icon: 'ShieldCheck', color: 'teal', bg: 'bg-emerald-100', description: t('features.security.desc', 'حماية بياناتك هي أولويتنا من خلال أحدث بروتوكولات التشفير وأنظمة النسخ الاحتياطي التلقائي.') },
  ];

  const displayFeatures = featuresLoading || features.length === 0 ? defaultFeatures : features;

  const defaultSystems: SiteSystem[] = [
    { name: t('systems.restaurant', 'نظام المطاعم الذكي'), description: '', icon: 'Store', color: 'orange', bgColor: 'from-orange-500 to-rose-500', category: 'restaurant', order: 1 },
    { name: t('systems.clinics', 'نظام إدارة العيادات'), description: '', icon: 'Stethoscope', color: 'teal', bgColor: 'from-teal-500 to-emerald-500', category: 'clinics', order: 2 },
    { name: t('systems.delivery', 'نظام التوصيل المتكامل'), description: '', icon: 'Truck', color: 'blue', bgColor: 'from-blue-500 to-indigo-600', category: 'delivery', order: 3 },
  ];

  const displaySystems = systemsLoading || systems.length === 0 ? defaultSystems : systems;

  return (
    <div className="bg-slate-50 dark:bg-slate-950 selection:bg-primary-green/20 selection:text-primary-navy">
      <Helmet>
        <title>{t('seo.home_title', 'SoftyCode | حلول برمجية وأنظمة ويب احترافية')}</title>
      </Helmet>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden bg-slate-50 dark:bg-slate-950">
        {/* Background Patterns */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.05] pointer-events-none"></div>
        <div className="absolute top-0 right-0 -z-10 w-[300px] sm:w-[500px] md:w-[800px] h-[300px] sm:h-[500px] md:h-[800px] bg-primary-teal/10 blur-[80px] md:blur-[120px] rounded-full mix-blend-multiply dark:mix-blend-lighten" />
        <div className="absolute bottom-0 left-0 -z-10 w-[250px] sm:w-[400px] md:w-[600px] h-[250px] sm:h-[400px] md:h-[600px] bg-primary-purple/10 blur-[60px] md:blur-[100px] rounded-full mix-blend-multiply dark:mix-blend-lighten" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-8 items-center">

            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border border-slate-200/60 dark:border-slate-700/60 text-slate-700 dark:text-slate-200 font-semibold text-sm mb-8 shadow-sm hover:shadow-md transition-all cursor-default">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-green/80 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-primary-green"></span>
                </span>
                <span className="tracking-wide">{t('hero.badge')}</span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-[4.5rem] font-display font-black text-slate-900 dark:text-white leading-[1.15] mb-6 tracking-tight">
                <Trans
                  i18nKey="hero.title"
                  components={{
                    0: <span className="text-brand-gradient" />
                  }}
                />
              </h1>
              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-10 max-w-xl font-medium">
                {t('hero.description')}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/products" className="group relative overflow-hidden inline-flex items-center justify-center gap-2 px-8 py-4.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl hover:shadow-slate-900/20 transition-all active:scale-[0.98]">
                  <div className="absolute inset-0 bg-brand-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10 flex items-center gap-2">{t('hero.cta_products')} <ArrowUpRight className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" size={20} /></span>
                </Link>
                <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-2xl font-bold text-lg hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm active:scale-[0.98]">
                  {t('hero.cta_consult')}
                </Link>
              </div>

              <div className="mt-12 flex items-center gap-6 pt-8 border-t border-slate-200/60 dark:border-slate-800/60 max-w-md">
                <div className="flex -space-x-reverse space-x-3">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-50 dark:border-slate-900 bg-slate-200 dark:bg-slate-700 overflow-hidden relative shadow-sm">
                      <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="Client" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-0.5">
                    {[...Array(5)].map((_, i) => <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}
                  </div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    <Trans i18nKey="hero.trust">
                      أكثر من <span className="font-bold text-slate-900 dark:text-white">+500</span> عميل يثق بنا
                    </Trans>
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Mascot / Visual Area */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className="relative flex items-center justify-center lg:h-[600px] w-full mt-10 lg:mt-0"
            >
              {/* Premium Glow effect */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-primary-green/20 via-primary-teal/10 to-primary-purple/20 rounded-[3rem] rotate-3 blur-2xl transform"></div>

              {/* Glass container for the mascot to sit on */}
              <div className="absolute inset-0 -z-10 bg-white/40 dark:bg-slate-800/40 backdrop-blur-3xl rounded-[3rem] border border-white/80 dark:border-slate-700/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"></div>

              {/* Mascot */}
              <motion.img
                animate={{ y: [-12, 12, -12] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                src="/branding/softy-mascot.png"
                alt="Softy Code Mascot"
                loading="eager"
                // @ts-ignore
                fetchPriority="high"
                className="w-[85%] max-w-[450px] drop-shadow-[0_25px_35px_rgba(34,197,94,0.15)] relative z-10 select-none"
                draggable={false}
              />

              {/* System Cards floating around the mascot */}
              <div className="absolute inset-0 pointer-events-none z-20">
                {displaySystems.slice(0, 3).map((system, index) => {
                  const IconComponent = iconMap[system.icon] || Store;
                  const positions = [
                    'top-8 right-2 md:top-12 md:-right-8',
                    'bottom-24 right-0 md:bottom-20 md:-right-12',
                    'bottom-0 left-2 md:bottom-12 md:-left-8'
                  ];
                  const tooltipPos = index === 2
                    ? "left-[100%] ml-3 md:ml-4 -translate-x-4 group-hover:translate-x-0"
                    : "right-[100%] mr-3 md:mr-4 translate-x-4 group-hover:translate-x-0";
                  const delays = [0.8, 1.0, 1.2];
                  const gradientClass = system.bgColor || 'from-slate-500 to-slate-700';

                  return (
                    <motion.div
                      key={system.id || index}
                      initial={{ opacity: 0, scale: 0.8, x: index % 2 === 0 ? 20 : -20 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      transition={{ delay: delays[index], duration: 0.6, type: "spring" }}
                      className={`absolute ${positions[index]} pointer-events-auto flex items-center justify-center group z-30`}
                    >
                      {/* Floating Sphere Icon */}
                      <div className="relative flex items-center justify-center">
                        {/* Sphere Bubble */}
                        <div className="w-12 h-12 md:w-[68px] md:h-[68px] rounded-full bg-white/20 dark:bg-slate-800/30 md:bg-white/30 md:dark:bg-slate-800/40 backdrop-blur-md md:backdrop-blur-xl border border-white/30 dark:border-slate-500/30 md:border-white/50 md:dark:border-slate-500/50 shadow-[0_4px_16px_rgba(0,0,0,0.05)] md:shadow-[0_12px_40px_rgba(0,0,0,0.15)] flex items-center justify-center cursor-pointer transition-all duration-500 group-hover:scale-110 md:group-hover:scale-125 group-hover:bg-white/90 dark:group-hover:bg-slate-800/90 group-hover:shadow-[0_0_30px_rgba(34,197,94,0.3)] group-hover:border-white/100 dark:group-hover:border-slate-600/80">
                          <div className={`w-7 h-7 md:w-[46px] md:h-[46px] rounded-full bg-gradient-to-br ${gradientClass} flex items-center justify-center text-white shadow-inner transition-transform duration-500 group-hover:scale-110 opacity-75 md:opacity-100 group-hover:opacity-100`}>
                            <IconComponent className="w-3.5 h-3.5 md:w-[22px] md:h-[22px]" />
                          </div>
                        </div>

                        {/* Hover Tooltip Card */}
                        <div className={`absolute top-1/2 -translate-y-1/2 ${tooltipPos} opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-400 ease-out pointer-events-none w-max z-50`}>
                          <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl px-4 py-2.5 md:px-5 md:py-3.5 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.2)] border border-slate-200/60 dark:border-slate-700/60 flex items-center gap-3.5 transform origin-right">
                            <div className="text-right">
                              <div className="font-bold text-xs md:text-sm text-slate-800 dark:text-white leading-tight">{system.name}</div>
                              <div className="text-[10px] md:text-xs text-primary-green mt-1 font-bold tracking-wide">{t('common.ready', 'جاهز للعمل')}</div>
                            </div>
                            <div className="relative flex items-center justify-center">
                              <div className={`absolute inset-0 rounded-full animate-ping opacity-75 bg-gradient-to-br ${gradientClass}`}></div>
                              <div className={`relative w-2.5 h-2.5 md:w-3 md:h-3 rounded-full shadow-sm bg-gradient-to-br ${gradientClass}`}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Server Security Card */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0, y: [0, 8, 0] }}
                transition={{
                  opacity: { delay: 1.4, duration: 0.5 },
                  x: { delay: 1.4, duration: 0.5 },
                  y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.4 },
                }}
                className="absolute top-1/4 left-0 md:-left-6 pointer-events-auto flex items-center justify-center group z-30"
              >
                {/* Floating Sphere Icon */}
                <div className="relative flex items-center justify-center">
                  {/* Sphere Bubble */}
                  <div className="w-12 h-12 md:w-[68px] md:h-[68px] rounded-full bg-white/20 dark:bg-slate-800/30 md:bg-white/30 md:dark:bg-slate-800/40 backdrop-blur-md md:backdrop-blur-xl border border-white/30 dark:border-slate-500/30 md:border-white/50 md:dark:border-slate-500/50 shadow-[0_4px_16px_rgba(0,0,0,0.05)] md:shadow-[0_12px_40px_rgba(0,0,0,0.15)] flex items-center justify-center cursor-pointer transition-all duration-500 group-hover:scale-110 md:group-hover:scale-125 group-hover:bg-white/90 dark:group-hover:bg-slate-800/90 group-hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] group-hover:border-white/100 dark:group-hover:border-slate-600/80">
                    <div className="w-7 h-7 md:w-[46px] md:h-[46px] rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white shadow-inner transition-transform duration-500 group-hover:scale-110 opacity-75 md:opacity-100 group-hover:opacity-100">
                      <ShieldCheck className="w-4 h-4 md:w-[22px] md:h-[22px]" />
                    </div>
                  </div>

                  {/* Hover Tooltip Card */}
                  <div className="absolute top-1/2 -translate-y-1/2 left-[100%] ml-3 md:ml-4 -translate-x-4 group-hover:translate-x-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-400 ease-out pointer-events-none w-max z-50">
                    <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl px-4 py-2.5 md:px-5 md:py-3.5 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.2)] border border-slate-200/60 dark:border-slate-700/60 flex items-center gap-3.5 transform origin-left">
                      <div className="text-right">
                        <div className="font-bold text-xs md:text-sm text-slate-800 dark:text-white leading-tight">{t('hero.security_card.title', 'أمان سيرفر')}</div>
                        <div className="text-[10px] md:text-xs text-emerald-600 dark:text-emerald-400 mt-1 font-bold tracking-wide">{t('hero.security_card.status', '100% موثوق')}</div>
                      </div>
                      <div className="relative flex items-center justify-center">
                        <div className="absolute inset-0 rounded-full animate-ping opacity-75 bg-gradient-to-br from-emerald-400 to-emerald-600"></div>
                        <div className="relative w-2.5 h-2.5 md:w-3 md:h-3 rounded-full shadow-sm bg-gradient-to-br from-emerald-400 to-emerald-600"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section with Glass Cards */}
      <section className="py-20 relative z-20 -mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {displayStats.map((stat, index) => {
              const IconComponent = iconMap[stat.icon] || Users;
              const colors = colorMap[stat.color] || { text: 'text-purple-600', bg: 'bg-purple-100' };
              return (
                <motion.div
                  key={stat.id || index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: index * 0.15, duration: 0.6 }}
                  className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 md:p-8 rounded-[2rem] border border-white dark:border-slate-700 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all text-center group"
                >
                  <div className={`w-16 h-16 ${colors.bg} dark:bg-slate-700 ${colors.text} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-sm`}>
                    <IconComponent size={32} />
                  </div>
                  <div className="text-4xl md:text-5xl font-display font-black text-slate-900 dark:text-white mb-2 tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-slate-500 dark:text-slate-400 font-semibold text-lg">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Summary - Modern Grid */}
      <section className="py-24 bg-white dark:bg-slate-900 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16 relative z-10">
          <div className="inline-flex items-center justify-center mb-4">
            <span className="px-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-sm font-bold tracking-wide uppercase">{t('features.badge', 'مزايا SoftyCode')}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-black text-slate-900 dark:text-white mb-6 tracking-tight">{t('features.title', 'لماذا تختارنا كشريك تقني؟')}</h2>
          <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium">{t('features.subtitle', 'نحن نقدم حلولاً برمجية تتجاوز مجرد الكود، نحن نبني منصات متكاملة تدعم نجاحك المستمر وتضمن لك التفوق في سوق العمل.')}</p>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {displayFeatures.map((feature, i) => {
            const IconComponent = iconMap[feature.icon] || Code2;
            const colors = colorMap[feature.color] || { text: 'text-primary-green', bg: 'bg-emerald-50' };
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <Link to="/services" className="block h-full bg-slate-50 dark:bg-slate-800 hover:bg-white dark:hover:bg-slate-700 p-6 md:p-8 rounded-[2rem] border border-slate-100 dark:border-slate-700 hover:border-slate-200 shadow-sm hover:shadow-[0_20px_40px_rgb(0,0,0,0.06)] transition-all group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 md:w-32 h-24 md:h-32 bg-gradient-to-br from-white/40 dark:from-white/5 to-transparent rounded-bl-full pointer-events-none opacity-50"></div>

                  <div className={`w-14 h-14 ${colors.bg} dark:bg-slate-900 ${colors.text} rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300`}>
                    <IconComponent size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 font-display tracking-tight group-hover:text-primary-green transition-colors">{feature.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-medium">{feature.description}</p>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center mt-16 flex flex-wrap justify-center gap-6 relative z-10">
          <Link to="/services" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary-navy dark:bg-white dark:text-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-colors shadow-md">
            {t('features.cta_all', 'عرض كافة الخدمات')} <ChevronRight size={18} />
          </Link>
          <Link to="/blog" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-2xl font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700">
            {t('features.cta_blog', 'اكتشف أحدث المقالات')}
          </Link>
        </div>
      </section>

      {/* Featured Products Showcase */}
      <section className="py-24 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center justify-center mb-4">
                <span className="px-4 py-1.5 rounded-full bg-primary-green/10 text-primary-green text-sm font-bold tracking-wide">{t('products.badge', 'المنتجات الجاهزة')}</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-black text-slate-900 dark:text-white mb-4 tracking-tight">{t('products.title', 'أنظمة احترافية جاهزة للنجاح')}</h2>
              <p className="text-lg text-slate-500 dark:text-slate-400 font-medium">{t('products.subtitle', 'اكتشف مجموعتنا المختارة من الأنظمة البرمجية المتكاملة التي أثبتت كفاءة عالية وساهمت في نجاح المئات من الأعمال.')}</p>
            </div>
            <Link to="/products" className="shrink-0 bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-8 py-4 rounded-2xl font-bold border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-lg transition-all flex items-center gap-2 group">
              {t('products.cta_store', 'عرض المتجر البرمجي')} <ArrowUpRight size={20} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {(() => {
              const displayProds = (!productsLoading && products && products.length > 0)
                ? products.filter(p => p.category === 'products' && p.state !== 'inactive' && p.state !== 'updating').slice(0, 3)
                : [
                  {
                    name: t('products.items.accounting.title', 'نظام إكسبريس المحاسبي'),
                    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
                    category: t('products.items.accounting.cat', 'نظام سحابي ERP'),
                  },
                  {
                    name: t('products.items.ecommerce.title', 'منصة التجارة الإلكترونية Pro'),
                    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=800',
                    category: t('products.items.ecommerce.cat', 'متاجر إلكترونية'),
                  },
                  {
                    name: t('products.items.spa.title', 'نظام السبا المتكامل V2'),
                    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800',
                    category: t('products.items.spa.cat', 'إدارة المنشآت'),
                  }
                ];

              const cardColors = ['bg-emerald-500', 'bg-blue-500', 'bg-purple-500'];

              return displayProds.map((p, i) => (
                <motion.div
                  key={p.id || i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.6 }}
                  className="group relative rounded-[2.5rem] overflow-hidden bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700"
                >
                  <div className="aspect-[4/5] overflow-hidden relative">
                    <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors z-10" />
                    <img src={p.image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={p.name} />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent z-10 opacity-90" />
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-8 z-20 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`w-2 h-2 rounded-full ${cardColors[i % cardColors.length]}`}></span>
                      <span className="text-white/80 text-sm font-bold tracking-wide">{p.category === 'products' ? 'نظام متكامل' : p.category}</span>
                    </div>
                    <h3 className="text-2xl font-black text-white mb-4 leading-tight">{p.name}</h3>
                    <Link to={p.id ? `/product/${p.id}` : "/products"} className="inline-flex items-center gap-2 text-white font-bold bg-white/10 hover:bg-white/20 backdrop-blur-md px-5 py-2.5 rounded-xl transition-colors text-sm">
                      {t('common.details', 'شرح التفاصيل')} <ChevronRight size={16} />
                    </Link>
                  </div>
                </motion.div>
              ));
            })()}
          </div>
        </div>
      </section>

      {/* Enterprise CTA Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[2rem] md:rounded-[3rem] p-8 sm:p-12 lg:p-20 text-center text-white overflow-hidden shadow-[0_20px_50px_rgba(16,185,129,0.2)] bg-slate-900 mx-4 sm:mx-0">
          <div className="absolute inset-0 bg-brand-gradient opacity-90"></div>
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-[250px] md:w-[500px] h-[250px] md:h-[500px] bg-white/10 blur-[60px] md:blur-[100px] rounded-full mix-blend-overlay"></div>
          <div className="absolute bottom-0 left-0 w-[250px] md:w-[500px] h-[250px] md:h-[500px] bg-black/20 blur-[60px] md:blur-[100px] rounded-full mix-blend-overlay"></div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative z-10 flex flex-col items-center"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[4rem] font-display font-black mb-6 tracking-tight leading-tight max-w-4xl">
              {t('cta.title', 'هل أنت جاهز لتغيير ملامح مشروعك الرقمي؟')}
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl font-medium leading-relaxed">
              {t('cta.desc', 'فريق SoftyCode الرقمي مستعد لتحويل رؤيتك إلى واقع برمجي يتفوق في السوق. ابدأ اليوم وارتقِ بأعمالك لمستويات غير مسبوقة.')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-slate-900 rounded-2xl font-black text-xl hover:scale-105 hover:shadow-[0_20px_40px_rgba(255,255,255,0.2)] transition-all">
                {t('cta.start', 'ابدأ الآن مجاناً')} <Globe size={24} />
              </Link>
              <Link to="/services" className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-2xl font-bold text-xl hover:bg-white/20 transition-all">
                {t('cta.services', 'استكشف خدماتنا')}
              </Link>
            </div>
            <p className="mt-8 text-sm text-white/70 font-medium">✨ {t('cta.no_card', 'لا يتطلب بطاقة ائتمانية للبدء')}</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};