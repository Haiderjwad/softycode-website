import React from 'react';
import { motion } from 'motion/react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false
  };

  constructor(props: Props) {
    super(props);
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  public render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center pt-32 pb-20 bg-gradient-to-b from-slate-50 via-white to-slate-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-center max-w-md"
          >
            <motion.div
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mb-6"
            >
              <AlertTriangle size={80} className="text-red-500 mx-auto" />
            </motion.div>

            <h2 className="text-4xl font-display font-bold text-slate-900 mb-4">
              حدث خطأ ما! 😕
            </h2>

            <p className="text-lg text-slate-600 mb-4 leading-relaxed">
              آسفين، حدث خطأ غير متوقع في التطبيق. يرجى محاولة تحديث الصفحة.
            </p>

            {import.meta.env.DEV && this.state.error && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-left mb-6">
                <p className="text-red-700 font-mono text-sm break-words">
                  {this.state.error.message}
                </p>
              </div>
            )}

            <div className="flex gap-4 justify-center mt-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.reload()}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-gradient text-white rounded-xl font-bold hover-scale-up hover-glow shadow-lg"
              >
                <RefreshCw size={20} />
                إعادة تحميل
              </motion.button>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-100 text-slate-900 rounded-xl font-bold hover:bg-slate-200 transition-colors"
                >
                  <Home size={20} />
                  الرئيسية
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}
