import { useState } from 'react';
import { initializeFirestoreCollections } from '@/utils/firebaseInit';

export const AdminPanel = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleInitializeDatabase = async () => {
    setLoading(true);
    try {
      await initializeFirestoreCollections();
      setMessage('✅ تم تهيئة قاعدة البيانات بنجاح!');
    } catch (error) {
      setMessage('❌ حدث خطأ أثناء تهيئة قاعدة البيانات');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-900">
          لوحة الإدارة
        </h1>
        
        <div className="space-y-4">
          <button
            onClick={handleInitializeDatabase}
            disabled={loading}
            className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {loading ? 'جاري التهيئة...' : 'تهيئة قاعدة البيانات'}
          </button>

          {message && (
            <div className={`p-4 rounded-lg text-center ${
              message.includes('✅')
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {message}
            </div>
          )}
        </div>

        <div className="mt-8 pt-8 border-t">
          <h2 className="text-lg font-semibold mb-4 text-gray-900">
            المجموعات التي سيتم إنشاؤها:
          </h2>
          <ul className="space-y-2 text-gray-700">
            <li>✓ <strong>products</strong> - المنتجات والخدمات</li>
            <li>✓ <strong>services</strong> - الخدمات الإضافية</li>
            <li>✓ <strong>users</strong> - المستخدمون</li>
            <li>✓ <strong>orders</strong> - الطلبات</li>
            <li>✓ <strong>contacts</strong> - بيانات الاتصال</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
