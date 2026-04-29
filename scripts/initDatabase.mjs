import { db } from '../src/config/firebase.ts';
import { collection, addDoc, writeBatch } from 'firebase/firestore';

// بيانات المنتجات
const productsData = [
  {
    name: 'خدمة تطوير الويب',
    description: 'تطوير مواقع احترافية وسريعة باستخدام أحدث التقنيات',
    price: 5000,
    category: 'services',
    duration: '4-6 أسابيع',
    features: ['تصميم مستجيب', 'تحسين SEO', 'أمان عالي'],
    createdAt: new Date(),
  },
  {
    name: 'تطوير تطبيقات الجوال',
    description: 'تطبيقات iOS و Android احترافية',
    price: 8000,
    category: 'services',
    duration: '8-12 أسابيع',
    features: ['iOS و Android', 'واجهة سهلة', 'قاعدة بيانات قوية'],
    createdAt: new Date(),
  },
  {
    name: 'استشارات تقنية',
    description: 'استشارات متخصصة في اختيار التقنيات المناسبة',
    price: 500,
    category: 'services',
    duration: 'حسب الحاجة',
    features: ['تقييم المشروع', 'اختيار التقنيات', 'خطة التنفيذ'],
    createdAt: new Date(),
  },
  {
    name: 'تصميم الواجهات (UI/UX)',
    description: 'تصميم واجهات مستخدم احترافية وجذابة',
    price: 3000,
    category: 'services',
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
    description: 'صيانة وتحديث دوري للمشاريع',
    price: 500,
    period: 'شهري',
    features: ['تحديثات أمان', 'إصلاح الأخطاء', 'دعم فني 24/7'],
    createdAt: new Date(),
  },
];

// بيانات الاتصال
const contactsData = {
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
};

// دالة لإضافة البيانات
async function initializeDatabase() {
  try {
    console.log('🔄 جاري إضافة البيانات إلى Firestore...\n');

    // إضافة المنتجات
    console.log('📦 إضافة المنتجات...');
    for (const product of productsData) {
      const docRef = await addDoc(collection(db, 'products'), product);
      console.log(`✓ تم إضافة: ${product.name} (ID: ${docRef.id})`);
    }
    console.log('✅ تم إضافة جميع المنتجات\n');

    // إضافة الخدمات الإضافية
    console.log('🛠️ إضافة الخدمات الإضافية...');
    for (const service of servicesData) {
      const docRef = await addDoc(collection(db, 'services'), service);
      console.log(`✓ تم إضافة: ${service.name} (ID: ${docRef.id})`);
    }
    console.log('✅ تم إضافة جميع الخدمات\n');

    // إضافة بيانات الاتصال
    console.log('📞 إضافة بيانات الاتصال...');
    const contactRef = await addDoc(collection(db, 'contacts'), contactsData);
    console.log(`✓ تم إضافة بيانات الاتصال (ID: ${contactRef.id})`);
    console.log('✅ تم إضافة بيانات الاتصال\n');

    // إنشاء مثال مستخدم
    console.log('👤 إضافة مستخدم تجريبي...');
    const userRef = await addDoc(collection(db, 'users'), {
      email: 'admin@softycode.com',
      displayName: 'مسؤول النظام',
      role: 'admin',
      phone: '+966XXXXXXXXX',
      createdAt: new Date(),
    });
    console.log(`✓ تم إضافة المستخدم (ID: ${userRef.id})`);
    console.log('✅ تم إضافة المستخدم\n');

    console.log('═══════════════════════════════════════════');
    console.log('🎉 تم إنشاء جميع الجداول بنجاح!');
    console.log('═══════════════════════════════════════════');
    console.log('\n📊 الجداول المُنشأة:');
    console.log('  ✓ products - المنتجات والخدمات (4 عناصر)');
    console.log('  ✓ services - الخدمات الإضافية (2 عنصر)');
    console.log('  ✓ contacts - بيانات الاتصال (1 عنصر)');
    console.log('  ✓ users - المستخدمون (1 مستخدم)');
    console.log('  ✓ orders - الطلبات (جاهز للاستخدام)\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ خطأ:', error);
    process.exit(1);
  }
}

initializeDatabase();
