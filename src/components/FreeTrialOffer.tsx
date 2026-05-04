import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gift, X, CheckCircle2, Zap } from 'lucide-react';
import { useUserData } from '../hooks/useUserData';
import { updateFirestore } from '../utils/firestore';
import { serverTimestamp } from 'firebase/firestore';

export const FreeTrialOffer = () => {
  const { userData, loading } = useUserData();
  const [isVisible, setIsVisible] = useState(true);
  const [isActivating, setIsActivating] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (loading || !userData || userData.trialUsed) {
    return null;
  }

  const handleActivateTrial = async () => {
    setIsActivating(true);
    try {
      const expirationDate = new Date();
      expirationDate.setMonth(expirationDate.getMonth() + 1);

      await updateFirestore('users', userData.uid, {
        trialUsed: true,
        trialStartedAt: serverTimestamp(),
        trialExpiresAt: expirationDate,
        status: 'trial'
      });
      
      setIsSuccess(true);
      setTimeout(() => {
        setIsVisible(false);
      }, 3000);
    } catch (error) {
      console.error('Error activating trial:', error);
      alert('حدث خطأ أثناء تفعيل التجربة المجانية. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsActivating(false);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          className="fixed bottom-6 left-6 right-6 z-50 md:left-auto md:right-8 md:max-w-md"
        >
          <div className="bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-100 overflow-hidden">
            <div className="absolute top-4 left-4">
              <button 
                onClick={() => setIsVisible(false)}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-8">
              {!isSuccess ? (
                <>
                  <div className="w-16 h-16 bg-primary-green/10 text-primary-green rounded-2xl flex items-center justify-center mb-6">
                    <Gift size={32} />
                  </div>
                  
                  <h3 className="text-2xl font-display font-black text-slate-900 mb-3">
                    هدية ترحيبية لك! 🎁
                  </h3>
                  
                  <p className="text-slate-600 mb-8 leading-relaxed font-medium">
                    استمتع بتجربة كاملة لجميع مميزات النظام <span className="text-primary-green font-bold">لمدة شهر كامل مجاناً</span>. اكتشف كيف يمكن لـ SoftyCode تطوير أعمالك.
                  </p>

                  <button
                    onClick={handleActivateTrial}
                    disabled={isActivating}
                    className="w-full py-4.5 bg-brand-gradient text-white rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl hover:shadow-primary-green/20 transition-all flex items-center justify-center gap-3 disabled:opacity-70 active:scale-[0.98]"
                  >
                    {isActivating ? (
                      <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Zap size={20} />
                        تفعيل التجربة المجانية
                      </>
                    )}
                  </button>
                  
                  <p className="text-center mt-4 text-xs text-slate-400 font-medium">
                    * يسري هذا العرض لمرة واحدة فقط للمشتركين الجدد
                  </p>
                </>
              ) : (
                <div className="text-center py-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <CheckCircle2 size={48} />
                  </motion.div>
                  
                  <h3 className="text-2xl font-display font-black text-slate-900 mb-2">
                    تم التفعيل بنجاح!
                  </h3>
                  <p className="text-slate-600 font-medium">
                    مبروك! يمكنك الآن البدء في استخدام كافة ميزات النظام مجاناً لمدة 30 يوماً.
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
