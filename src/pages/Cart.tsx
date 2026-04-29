import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Trash2, Plus, Minus, ShoppingBag, Check, CreditCard, Truck, Shield, ChevronRight } from 'lucide-react';
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
      <div className="min-h-screen flex items-center justify-center pt-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <ShoppingBag size={80} className="text-slate-300 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            سلة المشتريات فارغة
          </h2>
          <p className="text-slate-600 mb-8">
            أضف منتجاتك المفضلة للبدء في التسوق
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-8 py-4 bg-brand-gradient text-white rounded-2xl font-bold text-lg hover:scale-105 transition-transform"
          >
            تصفح المنتجات <ArrowLeft size={20} />
          </Link>
        </motion.div>
      </div>
    );
  }

   return (
     <div className="min-h-screen bg-slate-50 pt-32 pb-20">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-slate-500 hover:text-primary-green transition-colors">
              الرئيسية
            </Link>
            <ChevronRight size={16} className="text-slate-300" />
            <span className="text-slate-900 font-medium">سلة المشتريات</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            <h1 className="text-3xl font-display font-bold text-slate-900 mb-8">
              سلة المشتريات ({cart.length} منتج)
            </h1>

            {cart.map((item, index) => (
              <motion.div
                key={item.productId}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100"
              >
                <div className="flex gap-6">
                  <div className="w-32 h-32 bg-slate-100 rounded-2xl overflow-hidden flex-shrink-0">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.productName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-green/10 to-blue-500/10">
                        <span className="text-3xl text-primary-green/50">📦</span>
                      </div>
                    )}
                  </div>

                  <div className="flex-1 space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">
                          {item.productName}
                        </h3>
                        <p className="text-slate-600">
                          {item.price.toLocaleString('ar-SA')} ر.س
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.productId)}
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 transition-all font-bold"
                        >
                          <Minus size={20} />
                        </button>
                        <span className="text-xl font-bold text-slate-900 w-12 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 transition-all font-bold"
                        >
                          <Plus size={20} />
                        </button>
                      </div>
                      <p className="text-xl font-bold text-primary-green">
                        {(item.price * item.quantity).toLocaleString('ar-SA')} ر.س
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 sticky top-24"
            >
              <h2 className="text-2xl font-bold text-slate-900 mb-6">ملخص الطلب</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-slate-600">
                  <span>المجموع الفرعي</span>
                  <span>{total.toLocaleString('ar-SA')} ر.س</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>الضريبة (15%)</span>
                  <span>{(total * 0.15).toLocaleString('ar-SA')} ر.س</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>الشحن</span>
                  <span className="text-green-600">مجاني</span>
                </div>
                <div className="border-t border-slate-200 pt-4">
                  <div className="flex justify-between text-xl font-bold text-slate-900">
                    <span>الإجمالي</span>
                    <span>{(total * 1.15).toLocaleString('ar-SA')} ر.س</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isProcessing}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-5 bg-brand-gradient text-white rounded-2xl font-bold text-xl shadow-xl shadow-primary-green/20 hover:shadow-2xl transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? 'جاري المعالجة...' : 'إتمام الطلب'}
                <CreditCard size={24} />
              </button>

              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 text-slate-600">
                  <Truck size={20} className="text-primary-green flex-shrink-0" />
                  <span className="text-sm">شحن مجاني للطلبات فوق 500 ر.س</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <Shield size={20} className="text-primary-green flex-shrink-0" />
                  <span className="text-sm">دفع آمن 100%</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};