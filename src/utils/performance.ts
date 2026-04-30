/**
 * تحسينات الأداء والتحميل
 */

/**
 * Lazy Load للصور
 */
export const LazyImage = ({
  src,
  alt,
  className,
  loading = 'lazy',
}: {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
}) => (
  <img
    src={src}
    alt={alt}
    className={className}
    loading={loading}
    decoding="async"
  />
);

/**
 * تحميل الخطوط بشكل ديناميكي
 */
export const loadFont = (fontName: string, fontUrl: string) => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'font';
  link.href = fontUrl;
  link.type = 'font/woff2';
  link.crossOrigin = 'anonymous';
  document.head.appendChild(link);
};

/**
 * تحسين الأداء باستخدام requestAnimationFrame
 */
export const rafThrottle = (callback: FrameRequestCallback) => {
  let rafId: number;
  return (event: Event) => {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => callback(event as any));
  };
};

/**
 * Prefetch الموارد المهمة
 */
export const prefetchResource = (url: string, as: string = 'fetch') => {
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = url;
  link.as = as;
  document.head.appendChild(link);
};

/**
 * DNS Prefetch
 */
export const dnsPrefetch = (domain: string) => {
  const link = document.createElement('link');
  link.rel = 'dns-prefetch';
  link.href = `//${domain}`;
  document.head.appendChild(link);
};

/**
 * Preconnect للنطاقات الخارجية
 */
export const preconnect = (domain: string, crossOrigin = true) => {
  const link = document.createElement('link');
  link.rel = 'preconnect';
  link.href = `//${domain}`;
  if (crossOrigin) link.crossOrigin = 'anonymous';
  document.head.appendChild(link);
};

/**
 * حساب وقت التحميل
 */
export const measureLoadTime = (label: string) => {
  if ('performance' in window) {
    const navigationTiming = performance.getEntriesByType('navigation')[0];
    if (navigationTiming) {
      console.log(`${label}: ${navigationTiming.loadEventEnd - navigationTiming.loadEventStart}ms`);
    }
  }
};

/**
 * معالجة الصور للويب (تحسين الحجم)
 */
export const getOptimizedImageUrl = (
  url: string,
  width: number,
  quality: number = 80
): string => {
  // يمكن استخدام خدمة مثل Cloudinary أو ImageKit
  // مثال:
  return `${url}?w=${width}&q=${quality}&fm=auto`;
};

/**
 * تخزين مؤقت للبيانات (Cache)
 */
export class DataCache {
  private cache = new Map<string, { data: any; timestamp: number }>();
  private ttl: number; // Time to live in milliseconds

  constructor(ttl: number = 5 * 60 * 1000) {
    this.ttl = ttl;
  }

  set(key: string, value: any) {
    this.cache.set(key, { data: value, timestamp: Date.now() });
  }

  get(key: string) {
    const item = this.cache.get(key);
    if (!item) return null;

    const isExpired = Date.now() - item.timestamp > this.ttl;
    if (isExpired) {
      this.cache.delete(key);
      return null;
    }

    return item.data;
  }

  clear() {
    this.cache.clear();
  }

  has(key: string) {
    return this.get(key) !== null;
  }
}

/**
 * Web Worker للعمليات الثقيلة
 */
export const createWorker = (fn: Function): Worker => {
  const code = fn.toString();
  const blob = new Blob([`(${code})()`], { type: 'application/javascript' });
  const url = URL.createObjectURL(blob);
  return new Worker(url);
};
