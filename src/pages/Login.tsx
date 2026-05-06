import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Mail, Lock, Eye, EyeOff, ArrowLeft,
  CheckCircle, Sparkles, Shield, Zap,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Logo } from '@/components/Logo';

const FEATURES = [
  { icon: Shield, text: 'حماية وأمان على أعلى مستوى' },
  { icon: Zap, text: 'وصول فوري لجميع الخدمات' },
  { icon: Sparkles, text: 'تجربة مستخدم متميزة وسلسة' },
  { icon: CheckCircle, text: 'دعم فني متواصل 24/7' },
];

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(formData.email, formData.password);
      navigate('/');
    } catch (err: any) {
      const msg = err.code;
      if (msg === 'auth/user-not-found' || msg === 'auth/wrong-password' || msg === 'auth/invalid-credential') {
        setError('البريد الإلكتروني أو كلمة المرور غير صحيحة');
      } else if (msg === 'auth/too-many-requests') {
        setError('تم تجاوز عدد المحاولات. يرجى المحاولة لاحقاً');
      } else {
        setError('حدث خطأ. يرجى المحاولة مجدداً');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex" dir="rtl">
      {/* ── Left Panel – Branding ── */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col items-center justify-center p-16 bg-[#050510] dark:bg-[#020204]"
      >
        {/* Animated blobs */}
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-indigo-500/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-0 w-48 h-48 bg-slate-800/30 rounded-full blur-2xl" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle, #4ade80 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        <div className="relative z-10 text-center max-w-md">
          {/* Logo Card */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mb-12 inline-flex"
          >
            <Link to="/">
              <div className="relative inline-flex p-[2px] rounded-2xl shadow-2xl shadow-primary-green/20"
                style={{ background: 'linear-gradient(135deg, #22c55e, #14b8a6, #22c55e)' }}>
                <div className="bg-white rounded-[14px] px-8 py-5 flex items-center justify-center">
                  <Logo size="lg" />
                </div>
              </div>
            </Link>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-4xl font-display font-bold text-slate-100 mb-4"
          >
            مرحباً بعودتك
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-slate-400 text-lg mb-12"
          >
            سجّل دخولك للوصول إلى لوحة التحكم وخدماتك المفضلة
          </motion.p>

          {/* Features list */}
          <div className="space-y-4">
            {FEATURES.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + i * 0.1 }}
                className="flex items-center gap-3 text-right"
              >
                <div className="w-9 h-9 rounded-xl bg-primary-green/20 flex items-center justify-center flex-shrink-0">
                  <f.icon size={18} className="text-primary-green" />
                </div>
                <span className="text-slate-300 font-medium">{f.text}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom quote */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 text-slate-600 text-sm text-center"
        >
          © {new Date().getFullYear()} SoftyCode — جميع الحقوق محفوظة
        </motion.p>
      </motion.div>

      {/* ── Right Panel – Form ── */}
      <div className="flex-1 flex items-center justify-center bg-white dark:bg-[#0a0a0f] p-6 lg:p-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="w-full max-w-md"
        >
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <Link to="/"><Logo size="lg" className="mx-auto" /></Link>
          </div>

          {/* Header */}
          <div className="mb-10">
            <h1 className="text-4xl font-display font-bold text-slate-900 dark:text-white mb-2">
              تسجيل الدخول
            </h1>
            <p className="text-slate-500 dark:text-slate-400">
              ليس لديك حساب؟{' '}
              <Link to="/register" className="text-primary-green font-bold hover:underline">
                إنشاء حساب جديد
              </Link>
            </p>
          </div>

          {/* Card */}
          <div className="bg-slate-50 dark:bg-[#111118] rounded-3xl shadow-xl shadow-slate-200/80 dark:shadow-none border border-slate-100 dark:border-slate-800 p-8 space-y-6">

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.97 }}
                  className="bg-red-50 dark:bg-red-900/20 border border-red-200/80 dark:border-red-800/50 text-red-700 dark:text-red-400 px-4 py-3 rounded-2xl text-sm text-center font-medium"
                >
                  ⚠️ {error}
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">البريد الإلكتروني</label>
                <div className="relative">
                  <Mail size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pr-11 pl-4 py-4 rounded-2xl bg-white dark:bg-slate-800/50 border-2 border-slate-200 dark:border-slate-700 focus:border-primary-green dark:focus:border-primary-green focus:bg-white dark:focus:bg-slate-800 focus:ring-4 focus:ring-primary-green/10 dark:focus:ring-primary-green/20 transition-all outline-none text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
                    placeholder="name@example.com"
                    required
                    dir="ltr"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">كلمة المرور</label>
                  <button type="button" className="text-xs text-primary-green hover:underline font-medium">
                    نسيت كلمة المرور؟
                  </button>
                </div>
                <div className="relative">
                  <Lock size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pr-11 pl-12 py-4 rounded-2xl bg-white dark:bg-slate-800/50 border-2 border-slate-200 dark:border-slate-700 focus:border-primary-green dark:focus:border-primary-green focus:bg-white dark:focus:bg-slate-800 focus:ring-4 focus:ring-primary-green/10 dark:focus:ring-primary-green/20 transition-all outline-none text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
                    placeholder="••••••••"
                    required
                    dir="ltr"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
                className="w-full bg-brand-gradient text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-primary-green/25 hover:shadow-xl hover:shadow-primary-green/30 transition-all flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    جاري تسجيل الدخول...
                  </span>
                ) : (
                  <>
                    تسجيل الدخول
                    <ArrowLeft size={20} />
                  </>
                )}
              </motion.button>
            </form>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-100 dark:border-slate-800" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-4 bg-slate-50 dark:bg-[#111118] text-slate-400 font-medium">أو تسجيل الدخول بـ</span>
              </div>
            </div>

            {/* Google */}
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-2xl border-2 border-slate-200 dark:border-slate-700 hover:border-primary-green/40 dark:hover:border-primary-green/40 hover:bg-white dark:hover:bg-slate-800 transition-all font-bold text-slate-700 dark:text-slate-200 text-sm"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              تسجيل الدخول بـ Google
            </motion.button>
          </div>

          {/* Back to home */}
          <div className="mt-8 text-center">
            <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-primary-green transition-colors text-sm font-medium">
              <ArrowLeft size={16} />
              العودة إلى الرئيسية
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
