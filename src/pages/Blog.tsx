import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, User, Tag, Share2, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const blogPosts = [
  {
    id: 1,
    title: 'كيف تختار نظام المحاسبة المناسب لمشروعك؟',
    excerpt: 'نظام المحاسبة هو العمود الفقري لأي عمل تجاري. تعرف على العوامل الرئيسية التي يجب مراعاتها عند الاختيار...',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800',
    date: '2026-04-25',
    author: 'أحمد محمد',
    category: 'نظام المحاسبة',
    readTime: '5 دقائق',
  },
  {
    id: 2,
    title: 'أفضل الممارسات لتطوير تطبيقات الجوال',
    excerpt: 'تطوير تطبيقات الجوال يتطلب تخطيطاً دقيقاً وخبرة تقنية متقدمة. تعرف على أفضل الممارسات...',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800',
    date: '2026-04-20',
    author: 'سارة علي',
    category: 'تطوير التطبيقات',
    readTime: '7 دقائق',
  },
  {
    id: 3,
    title: 'كيف تتحول إلى شركة رقمية ناجحة؟',
    excerpt: 'التحول الرقمي ليس مجرد خيار بل ضرورة. تعرف على الخطوات التي يجب اتباعها...',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    date: '2026-04-15',
    author: 'خالد العمري',
    category: 'التحول الرقمي',
    readTime: '6 دقائق',
  },
  {
    id: 4,
    title: 'أحدث التقنيات في تطوير الويب 2026',
    excerpt: 'العالم الرقمي يتطور بسرعة. تعرف على أحدث التقنيات التي يجب أن تعرفها...',
    image: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&q=80&w=800',
    date: '2026-04-10',
    author: 'فاطمة السعيد',
    category: 'تقنيات الويب',
    readTime: '8 دقائق',
  },
  {
    id: 5,
    title: 'كيف تدير مشروعك البرمجي بنجاح؟',
    excerpt: 'إدارة المشاريع البرمجية تتطلب مهارات متعددة. تعرف على أفضل الممارسات...',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    date: '2026-04-05',
    author: 'محمد العتيبي',
    category: 'إدارة المشاريع',
    readTime: '5 دقائق',
  },
  {
    id: 6,
    title: 'أهمية الأمان الرقمي في الشركات',
    excerpt: 'الأمان الرقمي أصبح ضرورة لا غنى عنها. تعرف على أهمية حماية بياناتك...',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800',
    date: '2026-04-01',
    author: 'نورة القحطاني',
    category: 'الأمان الرقمي',
    readTime: '6 دقائق',
  },
];

export const Blog = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-900 pt-32 pb-20">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-slate-100 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-display font-bold text-slate-900 dark:text-white mb-4"
          >
            المدونة
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl"
          >
            مقالات وأخبار حول عالم البرمجة والتقنيات الحديثة
          </motion.p>
        </div>
      </div>

      {/* Featured Post */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-[3rem] overflow-hidden mb-16"
        >
          <img
            src={blogPosts[0].image}
            alt={blogPosts[0].title}
            className="w-full aspect-[21/9] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-16">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-4 py-2 bg-primary-green text-white rounded-full text-sm font-bold">
                {blogPosts[0].category}
              </span>
              <span className="text-white/80 text-sm flex items-center gap-1">
                <Calendar size={16} />
                {blogPosts[0].date}
              </span>
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4">
              {blogPosts[0].title}
            </h2>
            <p className="text-white/80 text-lg mb-6 max-w-2xl">
              {blogPosts[0].excerpt}
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-white/80">
                <User size={20} />
                <span>{blogPosts[0].author}</span>
              </div>
              <span className="text-white/60">•</span>
              <span className="text-white/80">{blogPosts[0].readTime}</span>
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
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-primary-green/50 group"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold">
                    {post.category}
                  </span>
                  <span className="text-slate-400 text-sm flex items-center gap-1">
                    <Calendar size={14} />
                    {post.date}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary-green transition-colors">
                  {post.title}
                </h3>
                <p className="text-slate-600 text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-500 text-sm">
                    <User size={16} />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 text-sm">{post.readTime}</span>
                    <button className="p-2 text-slate-400 hover:text-primary-green transition-colors">
                      <Share2 size={18} />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-red-600 transition-colors">
                      <Heart size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-primary-green transition-all">
            عرض المزيد من المقالات
          </button>
        </div>
      </div>
    </div>
  );
};