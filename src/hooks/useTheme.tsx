import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * دالة مساعدة لتطبيق الـ theme على عنصر الـ HTML الجذري
 */
const applyThemeToDOM = (theme: Theme) => {
  if (typeof window === 'undefined') return;
  
  const root = document.documentElement;
  const isDark = theme === 'dark';
  
  // تحديث الـ classes
  root.classList.toggle('dark', isDark);
  root.classList.toggle('light', !isDark);
  
  // تحديث color-scheme للمتصفح (يؤثر على شريط التمرير وعناصر النظام)
  root.style.colorScheme = theme;
  
  // حفظ التفضيل
  localStorage.setItem('theme', theme);
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // حالة الثيم - نبدأ بـ 'light' لتجنب مشاكل hydration
  // وسنحدد الثيم الأصلي في useEffect بعد التحميل
  const [theme, setTheme] = useState<Theme>('light');

  // حالة للتأكد من أن المكون قد تم تحميله في المتصفح (لمنع مشاكل Hydration)
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // قراءة الثيم المحفوظ من localStorage - يعمل فقط على العميل
    const saved = localStorage.getItem('theme') as Theme;
    if (saved === 'light' || saved === 'dark') {
      setTheme(saved);
    } else {
      // إذا لم يكن هناك ثيم محفوظ، نستخدم تفضيل النظام
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }
    setMounted(true);
  }, []);

  // مراقبة تغيير الثيم وتطبيقه على DOM
  useEffect(() => {
    if (mounted) {
      applyThemeToDOM(theme);
    }
  }, [theme, mounted]);

  // دالة التبديل
  const toggleTheme = useCallback(() => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  // مراقبة تغيير تفضيلات النظام
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      const hasSavedTheme = localStorage.getItem('theme');
      if (!hasSavedTheme) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // قيمة الـ Context
  const value = React.useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return (
    <ThemeContext.Provider value={value}>
      {/* نغلف المحتوى بـ div لضمان تطبيق الألوان حتى لو تأخر الـ class على html */}
      <div className={mounted ? '' : 'invisible'}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
