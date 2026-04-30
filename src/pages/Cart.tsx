import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Trash2, Plus, Minus, ShoppingBag, Check, CreditCard, Truck, Shield, ChevronRight, AlertCircle, Heart, Tag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useProducts } from '@/hooks/useProducts';
import { addToFirestore } from '@/utils/firestore';

interface CartItem {
  id: string;
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  image?: string;
}

export const Cart = () => {
  const navigate = useNavigate();
  const { products } = useProducts();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const removeFromCart = (productId: string) => {
    setCart(cart.filter((item) => item.productId !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    setCart(
      cart.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    if (cart.length === 0) return;

    setIsProcessing(true);

    try {
      for (const item of cart) {
        await addToFirestore('orders', {
          productId: item.productId,
          productName: item.productName,
          quantity: item.quantity,
          price: item.price,
          status: 'pending',
          createdAt: new Date(),
        });
      }

      setCart([]);
      localStorage.removeItem('cart');
      navigate('/order-success');
    } catch (err) {
      console.error('Error processing checkout:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-32 pb-20 bg-gradient-to-b from-slate-50 via-white to-slate-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center max-w-md"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="mb-6"
          >
            <ShoppingBag size={80} className="text-slate-200 mx-auto" />
          </motion.div>
          <h2 className="text-display-lg text-slate-900 mb-4">
            سلة المشتريات فارغة
          </h2>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            لم تضف أي منتجات بعد. ابدأ التسوق الآن واكتشف منتجاتنا الرائعة
          </p>
          <Link
            to="/products"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-brand-gradient text-white rounded-2xl font-bold text-lg hover-scale-up hover-glow shadow-xl shadow-primary-green/20"
          >
            تصفح المنتجات <ArrowLeft size={20} />
          </Link>
        </motion.div>
      </div>
    );
  }

   return (
     <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 pt-32 pb-20">
      {/* Breadcrumb */}
      <div className="sticky top-32 bg-white/80 backdrop-blur-xl border-b border-slate-100 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-slate-500 hover:text-primary-green transition-colors font-medium">
              الرئيسية
            </Link>
            <ChevronRight size={16} className="text-slate-300" />
            <span className="text-slate-900 font-bold text-primary-green">سلة المشتريات</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h1 className="text-4xl font-display font-bold text-slate-900 mb-2">
                سلة المشتريات
              </h1>
              <p className="text-lg text-slate-600">
                لديك <span className="font-bold text-primary-green">{cart.length}</span> منتج في السلة
              </p>
            </motion.div>

            {cart.map((item, index) => (
              <motion.div
                key={item.productId}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
                className="group card-elevated hover:border-primary-green/30"
              >
                <div className="flex gap-6 p-6">
                  {/* Product Image */}
                  <div className="w-40 h-40 bg-gradient-to-br from-slate-100 to-slate-50 rounded-2xl overflow-hidden flex-shrink-0 border border-slate-100 group-hover:border-primary-green/20 transition-colors">
                    {item.image ? (
                      <motion.img
                        whileHover={{ scale: 1.1 }}
                        src={item.image}
                        alt={item.productName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-green/5 to-blue-500/5">
                        <span className="text-5xl">📦</span>
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-2xl font-display font-bold text-slate-900 mb-2 group-hover:text-primary-green transition-colors">
                            {item.productName}
                          </h3>
                          <div className="flex items-center gap-2">
                            <span className="text-xl font-bold text-primary-green">
                              {item.price.toLocaleString('ar-SA')} ر.س
                            </span>
                            <Tag size={16} className="text-slate-400" />
                          </div>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => removeFromCart(item.productId)}
                          className="p-3 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300 border border-transparent hover:border-red-100"
                        >
                          <Trash2 size={22} />
                        </motion.button>
                      </div>
                    </div>

                    {/* Quantity Control */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <div className="flex items-center gap-3 bg-slate-50 rounded-xl p-2 border border-slate-100">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className="w-12 h-12 rounded-lg bg-white hover:bg-slate-100 transition-colors font-bold text-slate-900 flex items-center justify-center hover:text-primary-green"
                        >
                          <Minus size={18} />
                        </motion.button>
                        <span className="text-xl font-bold text-slate-900 w-12 text-center">
                          {item.quantity}
                        </span>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="w-12 h-12 rounded-lg bg-white hover:bg-slate-100 transition-colors font-bold text-slate-900 flex items-center justify-center hover:text-primary-green"
                        >
                          <Plus size={18} />
                        </motion.button>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-slate-600 mb-1">السعر الإجمالي</p>
                        <p className="text-2xl font-bold text-primary-green">
                          {(item.price * item.quantity).toLocaleString('ar-SA')} ر.س
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="card-elevated sticky top-40 overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-primary-green to-primary-teal p-6 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                <h2 className="text-2xl font-bold relative z-10 font-display">ملخص الطلب</h2>
              </div>

              <div className="p-8 space-y-6">
                {/* Order Details */}
                <div className="space-y-4 pb-6 border-b border-slate-100">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex justify-between items-center"
                  >
                    <span className="text-slate-600 font-medium">المجموع الفرعي</span>
                    <span className="text-lg font-bold text-slate-900">{total.toLocaleString('ar-SA')} ر.س</span>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex justify-between items-center"
                  >
                    <span className="text-slate-600 font-medium">الضريبة (15%)</span>
                    <span className="text-lg font-bold text-slate-900">{(total * 0.15).toLocaleString('ar-SA')} ر.س</span>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex justify-between items-center"
                  >
                    <span className="text-slate-600 font-medium">الشحن</span>
                    <span className="text-lg font-bold text-emerald-600">مجاني ✓</span>
                  </motion.div>
                </div>

                {/* Total */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 }}
                  className="bg-gradient-to-r from-primary-green/5 to-primary-teal/5 p-4 rounded-2xl border border-primary-green/20"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 font-semibold">الإجمالي النهائي</span>
                    <span className="text-3xl font-bold bg-clip-text text-transparent bg-linear-to-r from-primary-green to-primary-teal">
                      {(total * 1.15).toLocaleString('ar-SA')} ر.س
                    </span>
                  </div>
                </motion.div>

                {/* Checkout Button */}
                <motion.button
                  onClick={handleCheckout}
                  disabled={isProcessing}
                  whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(16, 185, 129, 0.3)" }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-brand-gradient text-white rounded-2xl font-bold text-lg shadow-xl shadow-primary-green/30 hover:shadow-2xl transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isProcessing ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <CreditCard size={24} />
                      </motion.div>
                      جاري المعالجة...
                    </>
                  ) : (
                    <>
                      إتمام الطلب
                      <CreditCard size={24} />
                    </>
                  )}
                </motion.button>

                {/* Trust Badges */}
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-4 text-slate-600 hover:text-primary-green transition-colors p-3 rounded-xl hover:bg-slate-50">
                    <Truck size={22} className="text-primary-green flex-shrink-0" />
                    <span className="text-sm font-medium">شحن مجاني للطلبات فوق 500 ر.س</span>
                  </div>
                  <div className="flex items-center gap-4 text-slate-600 hover:text-primary-green transition-colors p-3 rounded-xl hover:bg-slate-50">
                    <Shield size={22} className="text-primary-green flex-shrink-0" />
                    <span className="text-sm font-medium">دفع آمن 100% مع التشفير</span>
                  </div>
                  <div className="flex items-center gap-4 text-slate-600 hover:text-primary-green transition-colors p-3 rounded-xl hover:bg-slate-50">
                    <Check size={22} className="text-primary-green flex-shrink-0" />
                    <span className="text-sm font-medium">ضمان استرجاع الأموال 30 يوم</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};