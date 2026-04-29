import { db } from '@/config/firebase';
import { collection, addDoc, writeBatch } from 'firebase/firestore';

// بيانات المنتجات الأولية
const productsData = [
  {
    name: 'خدمة تطوير الويب',
    description: 'تطوير مواقع احترافية وسريعة باستخدام أحدث التقنيات',
    price: 5000,
    category: 'services',
    image: 'https://via.placeholder.com/300x200?text=Web+Development',
    duration: '4-6 أسابيع',
    features: ['تصميم مستجيب', 'تحسين SEO', 'أمان عالي'],
    createdAt: new Date(),
  },
  {
    name: 'تطوير تطبيقات الجوال',
    description: 'تطبيقات iOS و Android احترافية',
    price: 8000,
    category: 'services',
    image: 'https://via.placeholder.com/300x200?text=Mobile+App',
    duration: '8-12 أسابيع',
    features: ['iOS و Android', 'واجهة سهلة', 'قاعدة بيانات قوية'],
    createdAt: new Date(),
  },
  {
    name: 'استشارات تقنية',
    description: 'استشارات متخصصة في اختيار التقنيات المناسبة',
    price: 500,
    category: 'services',
    image: 'https://via.placeholder.com/300x200?text=Consulting',
    duration: 'حسب الحاجة',
    features: ['تقييم المشروع', 'اختيار التقنيات', 'خطة التنفيذ'],
    createdAt: new Date(),
  },
  {
    name: 'تصميم الواجهات (UI/UX)',
    description: 'تصميم واجهات مستخدم احترافية وجذابة',
    price: 3000,
    category: 'services',
    image: 'https://via.placeholder.com/300x200?text=UI+UX+Design',
    duration: '2-3 أسابيع',
    features: ['تصميم فريد', 'نموذج أولي', 'أدلة التصميم'],
    createdAt: new Date(),
  },
];

// بيانات الخدمات الإضافية
const servicesData = [
  {
    name: 'استضافة الويب',
    description: 'استضافة موثوقة وسريعة',
    price: 100,
    period: 'شهري',
    features: ['سرعة عالية', 'أمان 24/7', 'نسخ احتياطية يومية'],
    createdAt: new Date(),
  },
  {
    name: 'صيانة المشاريع',
    description: 'صيانة وتحديث دوري',
    price: 500,
    period: 'شهري',
    features: ['تحديثات أمان', 'إصلاح الأخطاء', 'دعم فني 24/7'],
    createdAt: new Date(),
  },
];

// بيانات المستخدمين
const usersData = [
  {
    email: 'admin@softycode.com',
    displayName: 'مسؤول النظام',
    role: 'admin',
    phone: '+966XXXXXXXXX',
    createdAt: new Date(),
  },
];

// بيانات الاتصال
const contactsData = [
  {
    phone: '+966XXXXXXXXX',
    email: 'info@softycode.com',
    address: 'المملكة العربية السعودية',
    workingHours: 'من 9 صباحاً إلى 5 مساءً',
    socialMedia: {
      twitter: 'https://twitter.com/softycode',
      instagram: 'https://instagram.com/softycode',
      linkedin: 'https://linkedin.com/company/softycode',
    },
    createdAt: new Date(),
  },
];

// وظيفة لإضافة البيانات الأولية
export const initializeFirestoreCollections = async () => {
  try {
    const batch = writeBatch(db);

    // إضافة المنتجات
    for (const product of productsData) {
      const docRef = collection(db, 'products');
      await addDoc(docRef, product);
    }
    console.log('✅ تم إضافة المنتجات بنجاح');

    // إضافة الخدمات
    for (const service of servicesData) {
      const docRef = collection(db, 'services');
      await addDoc(docRef, service);
    }
    console.log('✅ تم إضافة الخدمات بنجاح');

    // إضافة المستخدمين
    for (const user of usersData) {
      const docRef = collection(db, 'users');
      await addDoc(docRef, user);
    }
    console.log('✅ تم إضافة المستخدمين بنجاح');

    // إضافة بيانات الاتصال
    for (const contact of contactsData) {
      const docRef = collection(db, 'contacts');
      await addDoc(docRef, contact);
    }
    console.log('✅ تم إضافة بيانات الاتصال بنجاح');

    console.log('✅ تم تهيئة قاعدة البيانات بنجاح!');
    return true;
  } catch (error) {
    console.error('❌ خطأ في تهيئة قاعدة البيانات:', error);
    throw error;
  }
};

// وظيفة مساعدة لإضافة منتج جديد
export const addProduct = async (productData: any) => {
  try {
    const docRef = await addDoc(collection(db, 'products'), {
      ...productData,
      createdAt: new Date(),
    });
    console.log('✅ تم إضافة المنتج بنجاح:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('❌ خطأ في إضافة المنتج:', error);
    throw error;
  }
};

// وظيفة مساعدة لإضافة طلب جديد
export const addOrder = async (orderData: any) => {
  try {
    const docRef = await addDoc(collection(db, 'orders'), {
      ...orderData,
      status: 'pending',
      createdAt: new Date(),
    });
    console.log('✅ تم إضافة الطلب بنجاح:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('❌ خطأ في إضافة الطلب:', error);
    throw error;
  }
};
