import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
Mail, Lock, Eye, EyeOff, ArrowLeft, User,
CheckCircle, Star, Rocket, HeartHandshake,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Logo, LogoIcon, LogoText } from '@/components/Logo';
import { useTranslation } from 'react-i18next';

const BENEFITS = [
{ icon: Rocket, title: 'auth.register.benefits.fast_start', desc: 'auth.register.benefits.fast_start_desc' },
{ icon: Star, title: 'auth.register.benefits.exclusive', desc: 'auth.register.benefits.exclusive_desc' },
{ icon: HeartHandshake, title: 'auth.register.benefits.partnership', desc: 'auth.register.benefits.partnership_desc' },
];

// Password strength indicator
const getPasswordStrength = (p: string) => {
if (!p) return { score: 0, label: '', color: '' };
let score = 0;
if (p.length >= 8) score++;
if (/[A-Z]/.test(p)) score++;
if (/[0-9]/.test(p)) score++;
if (/[^A-Za-z0-9]/.test(p)) score++;
if (score <= 1) return { score, label: 'auth.register.strength.weak', color: 'bg-red-500' };
if (score === 2) return { score, label: 'auth.register.strength.medium', color: 'bg-yellow-500' };
if (score === 3) return { score, label: 'auth.register.strength.good', color: 'bg-blue-500' };
return { score, label: 'auth.register.strength.strong', color: 'bg-primary-green' };
};

export const Register = () => {
const { t } = useTranslation();
const [step, setStep] = useState<1 | 2>(1);
const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);
const [formData, setFormData] = useState({
name: '',
email: '',
password: '',
confirmPassword: '',
agree: false,
});
const [loading, setLoading] = useState(false);
const [error, setError] = useState('');
const [success, setSuccess] = useState(false);
const { register } = useAuth();
const navigate = useNavigate();

const strengthRaw = getPasswordStrength(formData.password);
const strength = {
...strengthRaw,
label: strengthRaw.label ? t(strengthRaw.label) : '',
};

const handleStep1 = (e: React.FormEvent) => {
e.preventDefault();
setError('');
if (!formData.name.trim()) { setError(t('auth.register.errors.name_required')); return; }
if (!formData.email.includes('@')) { setError(t('auth.register.errors.email_invalid')); return; }
setStep(2);
};

const handleSubmit = async (e: React.FormEvent) => {
e.preventDefault();
setError('');
if (formData.password !== formData.confirmPassword) { setError(t('auth.register.errors.password_mismatch')); return; }
if (formData.password.length < 6) { setError(t('auth.register.errors.password_short')); return; }
if (!formData.agree) { setError(t('auth.register.errors.terms_required')); return; }

setLoading(true);
try {
await register(formData.email, formData.password, formData.name);
setSuccess(true);
setTimeout(() => navigate('/'), 1800);
} catch (err: any) {
const code = err.code;
if (code === 'auth/email-already-in-use') setError(t('auth.register.errors.email_exists'));
else if (code === 'auth/weak-password') setError(t('auth.register.errors.password_weak'));
else setError(t('auth.register.errors.general_error'));
} finally {
setLoading(false);
}
};

  return (
    <div className="min-h-screen flex" dir="rtl">
      {/* ── Left Panel – Form ── */}
      <div className="flex-1 flex items-center justify-center bg-white dark:bg-[#0a0a0f] p-6 lg:p-16 order-2 lg:order-1">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Mobile Logo - Same as Navbar */}
          <div className="lg:hidden text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 mx-auto justify-center">
              <LogoIcon size="lg" />
              <div className="bg-white/95 dark:bg-white rounded-lg px-2.5 py-1 shadow-sm border border-primary-green/20 dark:border-primary-green/40">
                <LogoText size="lg" />
              </div>
            </Link>
          </div>

{/* Header */}
<div className="mb-8">
<h1 className="text-4xl font-display font-bold text-slate-900 dark:text-white mb-2">
{t('auth.register.title')}
</h1>
<p className="text-slate-500 dark:text-slate-400">
{t('auth.register.has_account')}{' '}
<Link to="/login" className="text-primary-green font-bold hover:underline">
{t('auth.register.login_link')}
</Link>
</p>
</div>

          {/* Step Indicator */}
          <div className="flex items-center gap-3 mb-8">
            {[1, 2].map((s) => (
              <React.Fragment key={s}>
                <motion.div
                  animate={{ scale: step === s ? 1.1 : 1 }}
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${step > s
                    ? 'bg-primary-green text-white'
                    : step === s
                      ? 'bg-brand-gradient text-white shadow-lg shadow-primary-green/30'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                    }`}
                >
                  {step > s ? <CheckCircle size={16} /> : s}
                </motion.div>
                {s < 2 && <div className={`flex-1 h-1 rounded-full transition-all duration-500 ${step > s ? 'bg-primary-green' : 'bg-slate-200 dark:bg-slate-800'}`} />}
              </React.Fragment>
            ))}
          </div>
<div className="flex justify-between text-xs text-slate-400 font-medium mb-8 -mt-4">
<span className={step >= 1 ? 'text-primary-green' : ''}>{t('auth.register.personal_info')}</span>
<span className={step === 2 ? 'text-primary-green' : ''}>{t('auth.register.password_label')}</span>
</div>

          {/* Success Screen */}
          <AnimatePresence mode="wait">
            {success ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-slate-50 dark:bg-[#111118] rounded-3xl shadow-xl shadow-slate-200/80 dark:shadow-none border border-slate-100 dark:border-slate-800 p-10 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.2 }}
                  className="w-20 h-20 bg-primary-green/10 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle size={40} className="text-primary-green" />
                </motion.div>
<h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{t('auth.register.success_title')}</h2>
<p className="text-slate-500">{t('auth.register.success_message', { name: formData.name })}</p>
              </motion.div>
            ) : (
              <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="bg-slate-50 dark:bg-[#111118] rounded-3xl shadow-xl shadow-slate-200/80 dark:shadow-none border border-slate-100 dark:border-slate-800 p-8 space-y-5">

                  {/* Error */}
                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="bg-red-50 dark:bg-red-900/20 border border-red-200/80 dark:border-red-800/50 text-red-700 dark:text-red-400 px-4 py-3 rounded-2xl text-sm text-center font-medium"
                      >
                        ⚠️ {error}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* ── Step 1 Fields ── */}
                  <AnimatePresence mode="wait">
                    {step === 1 ? (
                      <motion.form
                        key="step1"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        onSubmit={handleStep1}
                        className="space-y-5"
                      >
{/* Name */}
<div>
<label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">{t('auth.register.name_label')}</label>
<div className="relative">
<User size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
<input
type="text"
value={formData.name}
onChange={(e) => setFormData({ ...formData, name: e.target.value })}
className="w-full pr-11 pl-4 py-4 rounded-2xl bg-white dark:bg-slate-800/50 border-2 border-slate-200 dark:border-slate-700 focus:border-primary-green dark:focus:border-primary-green focus:bg-white dark:focus:bg-slate-800 focus:ring-4 focus:ring-primary-green/10 dark:focus:ring-primary-green/20 transition-all outline-none text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
placeholder={t('auth.register.name_placeholder')}
required
/>
</div>
</div>

{/* Email */}
<div>
<label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">{t('auth.register.email_label')}</label>
<div className="relative">
<Mail size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
<input
type="email"
value={formData.email}
onChange={(e) => setFormData({ ...formData, email: e.target.value })}
className="w-full pr-11 pl-4 py-4 rounded-2xl bg-white dark:bg-slate-800/50 border-2 border-slate-200 dark:border-slate-700 focus:border-primary-green dark:focus:border-primary-green focus:bg-white dark:focus:bg-slate-800 focus:ring-4 focus:ring-primary-green/10 dark:focus:ring-primary-green/20 transition-all outline-none text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
placeholder={t('auth.register.email_placeholder')}
required
dir="ltr"
/>
</div>
</div>

<motion.button
type="submit"
whileHover={{ scale: 1.02 }}
whileTap={{ scale: 0.98 }}
className="w-full bg-brand-gradient text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-primary-green/25 hover:shadow-xl transition-all flex items-center justify-center gap-3"
>
{t('auth.register.next_button')}
<ArrowLeft size={20} className="rotate-180" />
</motion.button>
                      </motion.form>
                    ) : (
                      <motion.form
                        key="step2"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        onSubmit={handleSubmit}
                        className="space-y-5"
                      >
{/* Password */}
<div>
<label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">{t('auth.register.password_label')}</label>
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
<button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
</button>
</div>
{/* Strength bar */}
{formData.password && (
<div className="mt-2 space-y-1">
<div className="flex gap-1">
{[1, 2, 3, 4].map((i) => (
<div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${i <= strength.score ? strength.color : 'bg-slate-200 dark:bg-slate-700'}`} />
))}
</div>
<p className="text-xs text-slate-500 dark:text-slate-400">{t('auth.register.password_strength')}: <span className="font-bold">{strength.label}</span></p>
</div>
)}
</div>

{/* Confirm password */}
<div>
<label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">{t('auth.register.confirm_password_label')}</label>
<div className="relative">
<Lock size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
<input
type={showConfirmPassword ? 'text' : 'password'}
value={formData.confirmPassword}
onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
className={`w-full pr-11 pl-12 py-4 rounded-2xl border-2 transition-all outline-none text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 ${formData.confirmPassword && formData.password !== formData.confirmPassword
? 'border-red-400 bg-red-50 dark:bg-red-900/20'
: formData.confirmPassword && formData.password === formData.confirmPassword
? 'border-primary-green bg-green-50 dark:bg-green-900/20'
: 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 focus:border-primary-green focus:bg-white dark:focus:bg-slate-800 focus:ring-4 focus:ring-primary-green/10 dark:focus:ring-primary-green/20'
}`}
placeholder="••••••••"
required
dir="ltr"
/>
<button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
{showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
</button>
</div>
</div>

{/* Terms */}
<label className="flex items-start gap-3 cursor-pointer group">
<input
type="checkbox"
checked={formData.agree}
onChange={(e) => setFormData({ ...formData, agree: e.target.checked })}
className="mt-1 w-4 h-4 rounded border-slate-300 dark:border-slate-700 text-primary-green focus:ring-primary-green"
/>
<span className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-slate-200 transition-colors">
{t('auth.register.agree_terms')}{' '}
<Link to="/terms" className="text-primary-green font-bold hover:underline">{t('auth.register.terms_link')}</Link>
{' '}و{' '}
<Link to="/privacy" className="text-primary-green font-bold hover:underline">{t('auth.register.privacy_link')}</Link>
</span>
</label>

                        <div className="flex gap-3">
<motion.button
type="button"
whileHover={{ scale: 1.02 }}
whileTap={{ scale: 0.98 }}
onClick={() => { setStep(1); setError(''); }}
className="flex-1 py-4 rounded-2xl border-2 border-slate-200 dark:border-slate-700 hover:border-primary-green/40 dark:hover:border-primary-green/40 hover:bg-white dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold transition-all"
>
{t('auth.register.previous_button')}
</motion.button>
<motion.button
type="submit"
disabled={loading}
whileHover={{ scale: loading ? 1 : 1.02 }}
whileTap={{ scale: loading ? 1 : 0.98 }}
className="flex-2 flex-1 bg-brand-gradient text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-primary-green/25 hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
>
{loading ? (
<span className="flex items-center gap-2">
<svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
</svg>
{t('auth.register.creating')}
</span>
) : t('auth.register.create_account')}
</motion.button>
                        </div>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Back */}
<div className="mt-8 text-center">
<Link to="/" className="inline-flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-primary-green transition-colors text-sm font-medium">
<ArrowLeft size={16} />
{t('auth.register.back_home')}
</Link>
</div>
        </motion.div>
      </div>

      {/* ── Right Panel – Branding ── */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col items-center justify-center p-16 order-1 lg:order-2 bg-[#050510] dark:bg-[#020204]"
      >
        {/* Blobs */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-purple-900/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-56 h-56 bg-teal-900/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #4ade80 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="relative z-10 text-center max-w-md">
          {/* Logo - Same as Navbar */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-12 inline-flex"
          >
            <Link to="/" className="inline-flex items-center gap-2">
              {/* Cloud Icon */}
              <LogoIcon size="xl" />
              {/* Brand Name with white card - exactly like Navbar */}
              <div className="bg-white/95 dark:bg-white rounded-lg px-2.5 py-1 shadow-sm border border-primary-green/20 dark:border-primary-green/40 transition-all duration-300 hover:border-primary-green/40 dark:hover:border-primary-green/60">
                <LogoText size="xl" />
              </div>
            </Link>
          </motion.div>

<motion.h2
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ delay: 0.5 }}
className="text-4xl font-display font-bold text-white mb-4"
>
{t('auth.register.welcome_title')}
</motion.h2>
<motion.p
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ delay: 0.6 }}
className="text-slate-400 text-lg mb-12"
>
{t('auth.register.welcome_desc')}
</motion.p>

<div className="space-y-6">
{BENEFITS.map((b, i) => (
<motion.div
key={i}
initial={{ opacity: 0, x: 20 }}
animate={{ opacity: 1, x: 0 }}
transition={{ delay: 0.7 + i * 0.12 }}
className="flex items-start gap-4 text-right bg-white/5 rounded-2xl p-4 border border-slate-800"
>
<div className="w-10 h-10 rounded-xl bg-primary-green/20 flex items-center justify-center flex-shrink-0">
<b.icon size={20} className="text-primary-green" />
</div>
<div>
<p className="text-white font-bold mb-0.5">{t(b.title)}</p>
<p className="text-slate-400 text-sm">{t(b.desc)}</p>
</div>
</motion.div>
))}
</div>
        </div>

<motion.p
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{ delay: 1.3 }}
className="absolute bottom-8 text-slate-600 text-sm"
>
© {new Date().getFullYear()} SoftyCode — {t('auth.register.all_rights_reserved')}
</motion.p>
      </motion.div>
    </div>
  );
};
