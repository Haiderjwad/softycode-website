import React from 'react';

interface LogoProps {
  /** حجم الشعار */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** نمط العرض */
  variant?: 'full' | 'icon-only' | 'text-only';
  className?: string;
}

/**
 * Responsive size mapping using Tailwind classes instead of fixed pixels.
 */
const sizeMap = {
  sm: { icon: "w-12 h-12", nameH: "h-5", gap: 'gap-0.5' },
  md: { icon: "w-16 h-16", nameH: "h-6", gap: 'gap-1' },
  lg: { icon: "w-20 h-20 md:w-24 md:h-24", nameH: "h-8 md:h-10", gap: 'gap-1' },
  xl: { icon: "w-20 h-20 md:w-24 md:h-24 lg:w-32 lg:h-32", nameH: "h-8 md:h-10 lg:h-[42px]", gap: 'gap-1.5' },
};

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  variant = 'full',
  className = '',
}) => {
  const dim = sizeMap[size];

  return (
    <div
      className={`inline-flex items-center transition-all duration-300 group ${dim.gap} ${className}`}
      style={{ lineHeight: 1 }}
      aria-label="SOFTY CODE"
      role="img"
    >
      {/* ======= أيقونة S المزدوج ======= */}
      {(variant === 'full' || variant === 'icon-only') && (
        <img
          src="/branding/softylogo.png"
          alt="Softy Code Icon"
          draggable={false}
          loading="eager"
          // @ts-ignore
          fetchPriority="high"
          style={{
            objectFit: 'contain',
            display: 'block',
            flexShrink: 0,
            transition: 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1), filter 0.3s ease',
            filter:
              'drop-shadow(0 4px 14px rgba(34,197,94,0.28)) ' +
              'drop-shadow(0 2px 6px rgba(15,23,42,0.14))',
          }}
          className={`${dim.icon} group-hover:scale-110`}
        />
      )}

      {/* ======= نص SOFTY CODE الرسمي ======= */}
      {(variant === 'full' || variant === 'text-only') && (
        <img
          src="/branding/softy name brand.png"
          alt="Softy Code"
          draggable={false}
          loading="eager"
          // @ts-ignore
          fetchPriority="high"
          style={{
            width: 'auto',
            objectFit: 'contain',
            display: 'block',
            flexShrink: 0,
            filter:
              'drop-shadow(0 1px 3px rgba(15,23,42,0.12))',
            transition: 'opacity 0.3s ease',
          }}
          className={dim.nameH}
        />
      )}
    </div>
  );
};

// Component for icon only (cloud symbol)
export const LogoIcon: React.FC<{ size?: 'sm' | 'md' | 'lg' | 'xl'; className?: string }> = ({
  size = 'md',
  className = '',
}) => {
  const dim = sizeMap[size];

  return (
    <img
      src="/branding/softylogo.png"
      alt="Softy Code Icon"
      draggable={false}
      loading="eager"
      // @ts-ignore
      fetchPriority="high"
      style={{
        objectFit: 'contain',
        display: 'block',
        transition: 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1), filter 0.3s ease',
        filter:
          'drop-shadow(0 4px 14px rgba(34,197,94,0.28)) ' +
          'drop-shadow(0 2px 6px rgba(15,23,42,0.14))',
      }}
      className={`${dim.icon} ${className} hover:scale-110`}
    />
  );
};

// Component for text/brand name only
export const LogoText: React.FC<{ size?: 'sm' | 'md' | 'lg' | 'xl'; className?: string }> = ({
  size = 'md',
  className = '',
}) => {
  const dim = sizeMap[size];

  return (
    <img
      src="/branding/softy name brand.png"
      alt="Softy Code"
      draggable={false}
      loading="eager"
      // @ts-ignore
      fetchPriority="high"
      style={{
        width: 'auto',
        objectFit: 'contain',
        display: 'block',
        filter:
          'drop-shadow(0 1px 3px rgba(15,23,42,0.12))',
        transition: 'opacity 0.3s ease',
      }}
      className={`${dim.nameH} ${className}`}
    />
  );
};
