/**
 * دوال مساعدة عامة
 */

/**
 * تنسيق الأرقام بالعملة
 */
export const formatCurrency = (amount: number, currency: string = 'ر.س'): string => {
  return `${amount.toLocaleString('ar-SA')} ${currency}`;
};

/**
 * تنسيق التاريخ
 */
export const formatDate = (date: Date | string, locale: string = 'ar-SA'): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * التحقق من صحة البريد الإلكتروني
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * التحقق من صحة رقم الهاتف
 */
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^(\+?966)?[0-9]{9,}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

/**
 * قص النص إلى عدد أحرف محدد
 */
export const truncateText = (text: string, maxLength: number = 100): string => {
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

/**
 * تأخير الوعد (للاختبار والتطوير)
 */
export const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * إعادة محاولة الدالة
 */
export const retryAsync = async <T>(
  fn: () => Promise<T>,
  maxAttempts: number = 3,
  delayMs: number = 1000
): Promise<T> => {
  let lastError;
  for (let i = 0; i < maxAttempts; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (i < maxAttempts - 1) {
        await delay(delayMs);
      }
    }
  }
  throw lastError;
};

/**
 * التحقق من اتصال الإنترنت
 */
export const isOnline = (): boolean => {
  return navigator.onLine;
};

/**
 * حفظ البيانات في localStorage
 */
export const saveToLocalStorage = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('خطأ في حفظ البيانات:', error);
  }
};

/**
 * استرجاع البيانات من localStorage
 */
export const getFromLocalStorage = <T>(key: string, defaultValue?: T): T | null => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : defaultValue ?? null;
  } catch (error) {
    console.error('خطأ في استرجاع البيانات:', error);
    return defaultValue ?? null;
  }
};

/**
 * حذف البيانات من localStorage
 */
export const removeFromLocalStorage = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('خطأ في حذف البيانات:', error);
  }
};

/**
 * دمج أسماء الفئات
 */
export const classNames = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};

/**
 * التحقق من أن الجسم فارغ
 */
export const isEmpty = (obj: Record<string, any>): boolean => {
  return Object.keys(obj).length === 0;
};

/**
 * الحصول على معرف فريد
 */
export const generateId = (prefix: string = 'id'): string => {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * حساب الحجم النسبي للملف
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};

/**
 * التحقق من نوع الملف
 */
export const isValidFileType = (file: File, allowedTypes: string[]): boolean => {
  return allowedTypes.includes(file.type);
};

/**
 * الحصول على البيانات الوصفية للصور
 */
export const getImageDimensions = (
  src: string
): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve({ width: img.width, height: img.height });
    img.onerror = reject;
    img.src = src;
  });
};
