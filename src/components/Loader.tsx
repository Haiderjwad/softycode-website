import { motion } from 'motion/react';
import { Loader2 } from 'lucide-react';

interface LoaderProps {
  size?: number;
  text?: string;
  fullScreen?: boolean;
}

export const Loader = ({ size = 48, text, fullScreen = false }: LoaderProps) => {
  const content = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center gap-6"
    >
      {/* Spinner */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        className="relative"
      >
        {/* Outer ring */}
        <div
          className="rounded-full border-4 border-slate-200"
          style={{ width: size, height: size }}
        />
        {/* Inner spinner */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="absolute top-0 left-0 rounded-full border-4 border-transparent border-t-primary-green border-r-primary-green/30"
          style={{ width: size, height: size }}
        />
        {/* Pulse effect */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute top-0 left-0 rounded-full bg-primary-green/20"
          style={{ width: size, height: size }}
        />
      </motion.div>

      {/* Loading dots */}
      <div className="flex items-center gap-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -8, 0] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.1,
            }}
            className="w-2 h-2 rounded-full bg-primary-green"
          />
        ))}
      </div>

      {/* Optional text */}
      {text && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-slate-600 font-medium text-sm"
        >
          {text}
        </motion.p>
      )}
    </motion.div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/95 backdrop-blur-sm z-50 flex items-center justify-center">
        {content}
      </div>
    );
  }

  return content;
};
