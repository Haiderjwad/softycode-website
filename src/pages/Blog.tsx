import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Calendar, User, Share2, Heart, X, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';

const blogPostsAr = [
  {
    id: 1,
    title: 'كيف تختار النظام المحاسبي المناسب لشركتك؟',
    excerpt: 'النظام المحاسبي هو العمود الفقري لأي عمل تجاري. تعرف على أهم العوامل التي يجب مراعاتها عند اختيار...',
    content: 'النظام المحاسبي هو العمود الفقري لأي عمل تجاري... (المحتوى الكامل للمقالة) يجب أن يكون النظام قادرا على متابعة المخزون والتدفقات النقدية بدقة وإصدار التقارير المالية المتوافقة مع متطلبات الهيئة العامة للزكاة والدخل.',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800',
    date: '2026-04-25',
    author: 'أحمد محمد',
    category: 'نظام محاسبي',
    readTime: '5 دقائق',
  },
  {
    id: 2,
    title: 'أفضل الممارسات في تطوير تطبيقات الجوال',
    excerpt: 'تطوير تطبيقات الجوال يتطلب تخطيطاً دقيقاً وخبرة تقنية متقدمة. تعرف على أفضل الممارسات...',
    content: 'تطوير تطبيقات الجوال ليس مجرد كتابة أكواد، بل هو عملية متكاملة تبدأ من فهم حاجة المستخدم وتصميم واجهة استخدام بديهية، وصولا إلى برمجة تطبيق سريع وآمن ومتوافق مع مختلف الأجهزة.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800',
    date: '2026-04-20',
    author: 'سارة علي',
    category: 'تطوير تطبيقات',
    readTime: '7 دقائق',
  },
  {
    id: 3,
    title: 'كيف تصبح شركة رقمية ناجحة؟',
    excerpt: 'التحول الرقمي لم يعد خياراً بل ضرورة. تعرف على الخطوات التي تحتاج لاتخاذها...',
    content: 'التحول الرقمي يساعد الشركات على تحسين كفاءة العمليات، تقليل التكاليف، وزيادة رضا العملاء. يتضمن ذلك استخدام الحوسبة السحابية، الأتمتة، وتحليل البيانات الضخمة.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    date: '2026-04-15',
    author: 'خالد العمري',
    category: 'تحول رقمي',
    readTime: '6 دقائق',
  },
  {
    id: 4,
    title: 'أحدث التقنيات في تطوير الويب 2026',
    excerpt: 'العالم الرقمي يتطور بسرعة. تعرف على أحدث التقنيات التي يجب أن تعرفها...',
    content: 'في عام 2026، نشهد تطوراً كبيراً في استخدام الذكاء الاصطناعي في تطوير الويب، تطبيقات الويب التقدمية (PWA)، والبنية التحتية بدون خوادم (Serverless). هذه التقنيات توفر أداء أسرع وتجربة مستخدم أفضل.',
    image: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&q=80&w=800',
    date: '2026-04-10',
    author: 'فاطمة السيد',
    category: 'تقنيات الويب',
    readTime: '8 دقائق',
  },
  {
    id: 5,
    title: 'كيف تدير مشروعك البرمجي بنجاح؟',
    excerpt: 'إدارة المشاريع البرمجية تتطلب مهارات متعددة. تعرف على أفضل الممارسات...',
    content: 'نجاح أي مشروع برمجي يعتمد على التخطيط الجيد، التواصل الفعال بين أعضاء الفريق، وإدارة التوقعات بشكل واقعي. يساعد استخدام منهجيات مثل Agile في تسليم منتجات ذات جودة عالية ومرونة في التعديل.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    date: '2026-04-05',
    author: 'محمد العتيبي',
    category: 'إدارة مشاريع',
    readTime: '5 دقائق',
  },
  {
    id: 6,
    title: 'أهمية الأمن الرقمي في الشركات',
    excerpt: 'الأمن الرقمي أصبح ضرورة حتمية. تعرف على أهمية حماية بياناتك...',
    content: 'مع تزايد الهجمات السيبرانية، أصبح من الضروري على كل شركة الاستثمار في حلول الأمان لحماية بياناتها وبيانات عملائها. يشمل ذلك استخدام تشفير البيانات، جدران الحماية، والنسخ الاحتياطي الدوري.',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800',
    date: '2026-04-01',
    author: 'نورة القحطاني',
    category: 'أمن رقمي',
    readTime: '6 دقائق',
  },
];

const blogPostsEn = [
  {
    id: 1,
    title: 'How to Choose the Right Accounting System for Your Business?',
    excerpt: 'The accounting system is the backbone of any business. Learn about the key factors to consider when choosing...',
    content: 'The accounting system is the backbone of any business... (Full content here) The system should be able to accurately track inventory and cash flows and issue financial reports that comply with local regulations.',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800',
    date: '2026-04-25',
    author: 'Ahmed Mohammed',
    category: 'Accounting System',
    readTime: '5 min',
  },
  {
    id: 2,
    title: 'Best Practices for Mobile App Development',
    excerpt: 'Mobile app development requires careful planning and advanced technical expertise. Learn about the best practices...',
    content: 'Mobile app development is more than just writing code; it is an integrated process starting from understanding user needs and designing an intuitive UI, ending with programming a fast, secure, and compatible application.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800',
    date: '2026-04-20',
    author: 'Sarah Ali',
    category: 'App Development',
    readTime: '7 min',
  },
  {
    id: 3,
    title: 'How to Become a Successful Digital Company?',
    excerpt: 'Digital transformation is not just an option but a necessity. Learn about the steps you need to take...',
    content: 'Digital transformation helps companies improve process efficiency, reduce costs, and increase customer satisfaction. This includes adopting cloud computing, automation, and big data analysis.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    date: '2026-04-15',
    author: 'Khalid Al-Amri',
    category: 'Digital Transformation',
    readTime: '6 min',
  },
  {
    id: 4,
    title: 'Latest Technologies in Web Development 2026',
    excerpt: 'The digital world is evolving rapidly. Learn about the latest technologies you need to know...',
    content: 'In 2026, we are witnessing significant advancements in using AI for web development, PWAs, and Serverless infrastructure. These technologies offer faster performance and a better user experience.',
    image: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&q=80&w=800',
    date: '2026-04-10',
    author: 'Fatima Al-Sayed',
    category: 'Web Technologies',
    readTime: '8 min',
  },
  {
    id: 5,
    title: 'How to Successfully Manage Your Software Project?',
    excerpt: 'Software project management requires multiple skills. Learn about the best practices...',
    content: 'The success of any software project relies on good planning, effective communication among team members, and realistic expectations management. Leveraging agile methodologies yields high-quality products.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    date: '2026-04-05',
    author: 'Mohammed Al-Otaibi',
    category: 'Project Management',
    readTime: '5 min',
  },
  {
    id: 6,
    title: 'The Importance of Digital Security in Companies',
    excerpt: 'Digital security has become an essential necessity. Learn about the importance of protecting your data...',
    content: 'With increasing cyber attacks, it is crucial for every company to invest in security solutions to protect its data. This includes data encryption, firewalls, and regular backups.',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800',
    date: '2026-04-01',
    author: 'Noura Al-Qahtani',
    category: 'Digital Security',
    readTime: '6 min',
  },
];

export const Blog = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language.startsWith('ar');
  const blogPosts = isArabic ? blogPostsAr : blogPostsEn;

  const [selectedPost, setSelectedPost] = useState<typeof blogPosts[0] | null>(null);

  useEffect(() => {
    document.body.style.overflow = selectedPost ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [selectedPost]);

  return (
    <>
      <Helmet>
        <title>{t('seo.blog_title')}</title>
        <meta name="description" content={t('seo.blog_desc')} />
        <meta property="og:title" content={t('seo.blog_title')} />
        <meta property="og:description" content={t('seo.blog_desc')} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
    <div className="min-h-screen bg-slate-50 dark:bg-gray-900 pt-32 pb-20 transition-colors duration-300">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-slate-100 dark:border-gray-700 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-display font-bold text-slate-900 dark:text-white mb-4 transition-colors duration-300"
          >
            {t('pages.blog.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl transition-colors duration-300"
          >
            {t('pages.blog.subtitle')}
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Post */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-[3rem] overflow-hidden mb-16 cursor-pointer group"
          onClick={() => setSelectedPost(blogPosts[0])}
        >
          <img
            src={blogPosts[0].image}
            alt={blogPosts[0].title}
            className="w-full aspect-[21/9] object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-16">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-4 py-2 bg-primary-green text-white rounded-full text-sm font-bold shadow-lg">
                {blogPosts[0].category}
              </span>
              <span className="text-white/90 text-sm flex items-center gap-1.5 font-medium bg-black/30 px-3 py-1.5 rounded-full backdrop-blur-md">
                <Calendar size={16} />
                {blogPosts[0].date}
              </span>
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4 group-hover:text-primary-green transition-colors duration-300 font-display">
              {blogPosts[0].title}
            </h2>
            <p className="text-white/80 text-lg mb-6 max-w-2xl line-clamp-2">
              {blogPosts[0].excerpt}
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 text-white bg-black/30 px-4 py-2 rounded-xl backdrop-blur-md">
                <User size={18} />
                <span className="font-semibold">{blogPosts[0].author}</span>
              </div>
              <div className="flex items-center gap-2 text-white bg-black/30 px-4 py-2 rounded-xl backdrop-blur-md">
                <BookOpen size={18} />
                <span className="font-semibold">{blogPosts[0].readTime}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.slice(1).map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedPost(post)}
              className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-slate-100 dark:border-slate-700/60 hover:border-primary-green/30 dark:hover:border-primary-green/30 group cursor-pointer flex flex-col h-full"
            >
              <div className="aspect-[4/3] overflow-hidden relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm text-primary-green dark:text-primary-green px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                  {post.category}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-3 mb-4 opacity-80">
                  <span className="text-slate-500 dark:text-slate-400 text-sm flex items-center gap-1.5 font-medium">
                    <Calendar size={14} className="text-primary-green" />
                    {post.date}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-primary-green transition-colors duration-300 font-display">
                  {post.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 line-clamp-3 leading-relaxed flex-1">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700/60 mt-auto">
                  <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 text-sm font-medium">
                    <User size={16} className="text-slate-400 dark:text-slate-500" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-slate-500 dark:text-slate-400 text-sm font-medium flex items-center gap-1">
                      <BookOpen size={14} />
                      {post.readTime}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-16">
          <button className="px-8 py-4 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white rounded-2xl font-bold hover:bg-primary-green hover:text-white dark:hover:bg-primary-green border border-transparent hover:shadow-lg transition-all duration-300 min-w-[200px]">
            {t('pages.blog.load_more')}
          </button>
        </div>
      </div>

      {/* Modal / Dialog */}
      <AnimatePresence>
        {selectedPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => setSelectedPost(null)}
            />

            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col border border-slate-200/50 dark:border-slate-700/50"
            >
              {/* Image Header */}
              <div className="relative h-48 sm:h-64 lg:h-80 shrink-0">
                <img
                  src={selectedPost.image}
                  alt={selectedPost.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                <button
                  onClick={() => setSelectedPost(null)}
                  className="absolute top-4 right-4 rtl:left-4 rtl:right-auto p-2 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-md transition-colors duration-300"
                >
                  <X size={24} />
                </button>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-3 py-1 bg-primary-green text-white rounded-full text-xs font-bold shadow-sm">
                      {selectedPost.category}
                    </span>
                    <span className="px-3 py-1 bg-black/40 backdrop-blur-md text-white rounded-full text-xs font-bold flex items-center gap-1.5 shadow-sm">
                      <Calendar size={12} />
                      {selectedPost.date}
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white font-display leading-tight">
                    {selectedPost.title}
                  </h2>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 md:p-10 overflow-y-auto custom-scrollbar">
                <div className="flex flex-wrap justify-between items-center pb-6 mb-6 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-500 dark:text-slate-400">
                      <User size={24} />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">{selectedPost.author}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                        <BookOpen size={14} />
                        {selectedPost.readTime}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-primary-green transition-colors duration-300" title={t('common.share')}>
                      <Share2 size={20} />
                    </button>
                    <button className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500 transition-colors duration-300" title={t('common.like')}>
                      <Heart size={20} />
                    </button>
                  </div>
                </div>

                <div className="prose prose-lg dark:prose-invert prose-slate max-w-none text-slate-700 dark:text-slate-300 leading-loose">
                  {selectedPost.content.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 text-base md:text-lg">
                      {paragraph}
                    </p>
                  ))}
                  <p className="text-base md:text-lg">
                    {selectedPost.excerpt}
                  </p>
                  <p className="text-base md:text-lg">
                    {isArabic
                      ? 'تعتبر هذه النصائح والممارسات جزءاً أساسياً من نجاح أي استراتيجية تقنية. نأمل أن تكون هذه المقالة قد أضافت قيمة لك ولعملك، وندعوك لمشاركة هذه المعرفة مع من قد يستفيد منها في مجال عملك.'
                      : 'These tips and practices are an essential part of any technical strategy. We hope this article added value to you and your business, and we invite you to share this knowledge with those who might benefit from it.'}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
    </>
  );
};
