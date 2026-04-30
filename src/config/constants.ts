/**
 * تكوينات عامة للتطبيق
 */

export const APP_CONFIG = {
  appName: 'SoftyCode',
  appDescription: 'حلول برمجية ذكية وسحابية لإدارة أعمالك',
  appURL: process.env.REACT_APP_URL || 'https://softycode.com',
  
  // الألوان
  colors: {
    primary: '#10b981',
    secondary: '#14b8a6',
    accent: '#0ea5e9',
    dark: '#0f172a',
    light: '#f8fafc',
  },

  // المحتوى
  content: {
    currency: 'ر.س',
    taxRate: 0.15,
    freeShippingThreshold: 500,
    defaultLanguage: 'ar',
  },

  // الإعدادات
  settings: {
    animationDuration: 300,
    debounceDelay: 300,
    cacheTimeout: 3600,
  },

  // الحدود
  limits: {
    maxNameLength: 100,
    maxEmailLength: 254,
    maxMessageLength: 5000,
    maxFileSize: 5242880, // 5MB
  },
};

// نقاط الانقطاع للتصميم المتجاوب
export const BREAKPOINTS = {
  xs: '320px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

// متغيرات الحركة
export const MOTION_VARIANTS = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  slideIn: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
  slideInLeft: {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -30 },
  },
  slideInRight: {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 30 },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
  },
};

// الرسائل
export const MESSAGES = {
  success: {
    purchase: 'تم إنشاء الطلب بنجاح',
    contact: 'شكراً على رسالتك، سنتواصل معك قريباً',
  },
  error: {
    purchase: 'حدث خطأ أثناء معالجة الطلب',
    network: 'خطأ في الاتصال، يرجى التحقق من الإنترنت',
    validation: 'يرجى تصحيح الأخطاء أدناه',
  },
  loading: {
    products: 'جاري تحميل المنتجات...',
    contact: 'جاري تحميل معلومات الاتصال...',
    processing: 'جاري المعالجة...',
  },
};

// الحالات
export const HTTP_STATUS = {
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
};
