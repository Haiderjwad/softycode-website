import React from 'react';

interface LogoProps {
  /** حجم الشعار */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** نمط العرض */
  variant?: 'full' | 'icon-only' | 'text-only';
  className?: string;
}

/**
 * الأحجام:
 * icon     → حجم أيقونة S المزدوج بالبكسل
 * nameH    → ارتفاع صورة نص SOFTY CODE بالبكسل
 * gap      → المسافة بين الأيقونة والنص
 */
const sizeMap = {
  sm: { icon: 48, nameH: 20, gap: '2px' },
  md: { icon: 72, nameH: 26, gap: '2px' },
  lg: { icon: 96, nameH: 34, gap: '3px' },
  xl: { icon: 128, nameH: 42, gap: '4px' },
};

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  variant = 'full',
  className = '',
}) => {
  const dim = sizeMap[size];

  return (
    <div
      className={`inline-flex items-center transition-all duration-300 group ${className}`}
      style={{ gap: dim.gap, lineHeight: 1 }}
      aria-label="SOFTY CODE"
      role="img"
    >
      {/* ======= أيقونة S المزدوج ======= */}
      {(variant === 'full' || variant === 'icon-only') && (
        <img
          src="/branding/softylogo.png"
          alt="Softy Code Icon"
          draggable={false}
          style={{
            width: dim.icon,
            height: dim.icon,
            objectFit: 'contain',
            display: 'block',
            flexShrink: 0,
            transition: 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1), filter 0.3s ease',
            filter:
              'drop-shadow(0 4px 14px rgba(34,197,94,0.28)) ' +
              'drop-shadow(0 2px 6px rgba(15,23,42,0.14))',
          }}
          className="group-hover:scale-110"
        />
      )}

      {/* ======= نص SOFTY CODE الرسمي ======= */}
      {(variant === 'full' || variant === 'text-only') && (
        <img
          src="/branding/softy name brand.png"
          alt="Softy Code"
          draggable={false}
          style={{
            height: dim.nameH,
            width: 'auto',
            objectFit: 'contain',
            display: 'block',
            flexShrink: 0,
            filter:
              'drop-shadow(0 1px 3px rgba(15,23,42,0.12))',
            transition: 'opacity 0.3s ease',
          }}
        />
      )}
    </div>
  );
};
