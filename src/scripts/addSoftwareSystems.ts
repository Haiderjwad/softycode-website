import { db } from '../config/firebase';
import { collection, addDoc, getDocs, query, where, updateDoc, doc } from 'firebase/firestore';

// أنظمة برمجية جاهزة مع روابط تجريبية
const softwareSystems = [
  {
    name: 'نظام المحاسبة السحابي',
    nameEn: 'Cloud Accounting System',
    description: 'نظام محاسبة سحابي متكامل لإدارة المالية والمخزون والمبيعات',
    descriptionEn: 'Comprehensive cloud accounting system for finance, inventory, and sales management',
    price: 2500,
    category: 'products',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800',
    duration: 'جاهز للاستخدام',
    features: [
      'إدارة الفواتير',
      'تقارير مالية',
      'إدارة المخزون',
      'دعم فني 24/7'
    ],
    systemUrl: 'https://demo.example.com/accounting', // رابط تجريبي
    createdAt: new Date(),
  },
  {
    name: 'نظام إدارة المطاعم',
    nameEn: 'Restaurant Management System',
    description: 'حل متكامل لإدارة الطلبات والمخزون والموظفين في المطاعم',
    descriptionEn: 'Integrated solution for managing orders, inventory, and staff in restaurants',
    price: 1800,
    category: 'products',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800',
    duration: 'جاهز للاستخدام',
    features: [
      'إدارة الطاولات',
      'نقطة بيع POS',
      'تقارير المبيعات',
      'تطبيق للطلبات'
    ],
    systemUrl: 'https://demo.example.com/restaurant',
    createdAt: new Date(),
  },
  {
    name: 'منصة التجارة الإلكترونية',
    nameEn: 'E-commerce Platform',
    description: 'منصة متكاملة لإنشاء متاجر إلكترونية احترافية',
    descriptionEn: 'Integrated platform for creating professional online stores',
    price: 3500,
    category: 'products',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=800',
    duration: 'جاهز للاستخدام',
    features: [
      'متجر إلكتروني',
      'بوابات دفع',
      'إدارة المنتجات',
      'تتبع الطلبات'
    ],
    systemUrl: 'https://demo.example.com/ecommerce',
    createdAt: new Date(),
  },
  {
    name: 'نظام إدارة العيادات',
    nameEn: 'Clinic Management System',
    description: 'نظام متكامل لإدارة العيادات الطبية وحجز المواعيد',
    descriptionEn: 'Integrated system for managing medical clinics and appointments',
    price: 2200,
    category: 'products',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd9d24eaa?auto=format&fit=crop&q=80&w=800',
    duration: 'جاهز للاستخدام',
    features: [
      'حجز المواعيد',
      'ملفات المرضى',
      'الوصفات الطبية',
      'الفواتير والتأمين'
    ],
    systemUrl: 'https://demo.example.com/clinic',
    createdAt: new Date(),
  }
];

// دالة لإضافة الأنظمة البرمجية
export const addSoftwareSystems = async () => {
  try {
    console.log('🔄 جاري إضافة الأنظمة البرمجية...');
    
    for (const system of softwareSystems) {
      // التحقق مما إذا كان النظام موجوداً بالفعل
      const q = query(
        collection(db, 'products'),
        where('name', '==', system.name)
      );
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        // إضافة النظام
        await addDoc(collection(db, 'products'), {
          ...system,
          createdAt: new Date()
        });
        console.log(`✅ تم إضافة: ${system.name}`);
      } else {
        // تحديث النظام الموجود بإضافة systemUrl
        const docId = querySnapshot.docs[0].id;
        await updateDoc(doc(db, 'products', docId), {
          systemUrl: system.systemUrl
        });
        console.log(`🔄 تم تحديث: ${system.name}`);
      }
    }
    
    console.log('✅ اكتملت إضافة الأنظمة البرمجية بنجاح!');
    return true;
  } catch (error) {
    console.error('❌ خطأ في إضافة الأنظمة:', error);
    throw error;
  }
};

// تشغيل الدالة
if (typeof window !== 'undefined') {
  (window as any).addSoftwareSystems = addSoftwareSystems;
  console.log('📦 تم تحميل script إضافة الأنظمة البرمجية');
  console.log('👉 لتنفيذ: addSoftwareSystems()');
}

export default addSoftwareSystems;
