import { useState, useEffect, useCallback } from 'react';
import { saveToLocalStorage, getFromLocalStorage, removeFromLocalStorage } from '@/utils/helpers';

/**
 * Hook للتعامل مع localStorage بسهولة
 */
export const useLocalStorage = <T>(
  key: string,
  initialValue?: T
): [T | null, (value: T) => void, () => void] => {
  const [storedValue, setStoredValue] = useState<T | null>(() => {
    try {
      return getFromLocalStorage<T>(key) ?? initialValue ?? null;
    } catch {
      return initialValue ?? null;
    }
  });

  const setValue = useCallback(
    (value: T) => {
      try {
        setStoredValue(value);
        saveToLocalStorage(key, value);
      } catch (error) {
        console.error('خطأ في حفظ القيمة:', error);
      }
    },
    [key]
  );

  const removeValue = useCallback(() => {
    try {
      setStoredValue(null);
      removeFromLocalStorage(key);
    } catch (error) {
      console.error('خطأ في حذف القيمة:', error);
    }
  }, [key]);

  return [storedValue, setValue, removeValue];
};

/**
 * Hook للتحقق من اتصال الإنترنت
 */
export const useOnlineStatus = (): boolean => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
};

/**
 * Hook لتتبع موقع الماوس
 */
export const useMousePosition = (): { x: number; y: number } => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return position;
};

/**
 * Hook للتحقق من حجم الشاشة
 */
export const useWindowSize = (): { width: number; height: number } => {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
};

/**
 * Hook للتحقق من الجهاز المستخدم
 */
export const useDevice = () => {
  const [device, setDevice] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const { width } = useWindowSize();

  useEffect(() => {
    if (width < 768) {
      setDevice('mobile');
    } else if (width < 1024) {
      setDevice('tablet');
    } else {
      setDevice('desktop');
    }
  }, [width]);

  return device;
};

/**
 * Hook للتعامل مع async operations
 */
export const useAsync = <T, E = string>(
  asyncFunction: () => Promise<T>,
  immediate = true
) => {
  const [status, setStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');
  const [value, setValue] = useState<T | null>(null);
  const [error, setError] = useState<E | null>(null);

  const execute = useCallback(async () => {
    setStatus('pending');
    setValue(null);
    setError(null);
    try {
      const response = await asyncFunction();
      setValue(response);
      setStatus('success');
      return response;
    } catch (error) {
      setError(error as E);
      setStatus('error');
      throw error;
    }
  }, [asyncFunction]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { execute, status, value, error };
};

/**
 * Hook لتتبع ما إذا كان العنصر مرئياً على الشاشة
 */
export const useIntersectionObserver = (
  ref: React.RefObject<HTMLElement>,
  options?: IntersectionObserverInit
): boolean => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, options);

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, options]);

  return isVisible;
};

/**
 * Hook لتأخير القيم (Debounce)
 */
export const useDebounce = <T>(value: T, delay: number = 500): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

/**
 * Hook لتخزين مؤقت للقيمة (Throttle)
 */
export const useThrottle = <T>(value: T, delay: number = 500): T => {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastRef = React.useRef(Date.now());

  useEffect(() => {
    const now = Date.now();
    if (now >= lastRef.current + delay) {
      lastRef.current = now;
      setThrottledValue(value);
    } else {
      const handler = setTimeout(() => {
        lastRef.current = Date.now();
        setThrottledValue(value);
      }, delay - (now - lastRef.current));

      return () => clearTimeout(handler);
    }
  }, [value, delay]);

  return throttledValue;
};
