import { db } from '../config/firebase';
import { collection, addDoc, getDocs, query, where, updateDoc, doc } from 'firebase/firestore';

// أنظمة برمجية جديدة تضاف لقاعدة البيانات
const newSoftwareSystems = [
  {
    name: 'نظام إدارة الموارد (ERP)',
    nameEn: 'ERP Resource Management',
    description: 'نظام برمجي متكامل طورته الشركة لإدارة الموارد، المبيعات، والعملاء باحترافية عالية.',
    descriptionEn: 'Comprehensive ERP for resource, sales, and customer management.',
    price: 25000,
    category: 'products',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    duration: 'جاهز للاستخدام',
    features: [
      'إدارة المبيعات والمخزون',
      'تقارير مالية شاملة',
      'لوحة تحكم احترافية',
      'دعم فني على مدار الساعة'
    ],
  systemUrl: 'https://software-demo.softycode.com',
  state: 'active', // active, inactive, updating
  createdAt: new Date(),
},
  {
    name: 'سوفتي لوجستك',
    nameEn: 'Softy Logistic',
    description: 'نظام متكامل واحترافي لإدارة شركات التوصيل والخدمات اللوجستية، يتيح تتبع الطلبات المباشر، إدارة المندوبين بكفاءة، ومتابعة الحسابات بدقة.',
    descriptionEn: 'Integrated system for delivery and logistics management with live tracking and account management.',
    price: 15000,
    category: 'products',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8ed7c80a30?auto=format&fit=crop&q=80&w=800',
    duration: 'تفعيل فوري',
    features: [
      'تتبع مباشر للطلبات',
      'تطبيق خاص للمندوبين',
      'إدارة حسابات وعمولات',
      'لوحة تحكم ذكية للعملاء'
    ],
  systemUrl: 'https://logistic.softycode.com',
  state: 'active',
  createdAt: new Date(),
},
  {
    name: 'سوفتي كيو كود',
    nameEn: 'Softy Q-Code',
    description: 'حل تقني متطور وشامل لإدارة العيادات والمجمعات الطبية باحترافية، يضمن سلاسة حجز المواعيد وإدارة السجلات الطبية.',
    descriptionEn: 'Advanced tech solution for medical clinics management ensuring smooth booking and records.',
    price: 18000,
    category: 'products',
    image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&q=80&w=800',
    duration: 'تفعيل فوري',
    features: [
      'حجز ذكي للمواعيد',
      'سجلات طبية إلكترونية',
      'إدارة التأمين والمطالبات',
      'وصفة طبية إلكترونية'
    ],
  systemUrl: 'https://clinics.softycode.com',
  state: 'active',
  createdAt: new Date(),
},
  {
    name: 'سوفتي موجود',
    nameEn: 'Softy Mawjoud',
    description: 'نظام احترافي لإدارة الحضور والانصراف بالبصمة الإلكترونية وإدارة الموارد البشرية مع تقارير مفصلة للرواتب والموظفين.',
    descriptionEn: 'Professional biometric attendance and HR management system with detailed reports.',
    price: 9000,
    category: 'products',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800',
    duration: 'تفعيل فوري',
    features: [
      'ربط مباشر بأجهزة البصمة',
      'إدارة الإجازات والغياب',
      'الربط مع أنظمة الرواتب',
      'تقارير أداء شاملة'
    ],
  systemUrl: 'https://mawjoud.softycode.com',
  state: 'active',
  createdAt: new Date(),
}
];

// دالة لإضافة الأنظمة البرمجية
export const addSoftwareSystems = async () => {
  try {
    console.log('🔄 جاري إضافة الأنظمة البرمجية...');

    for (const system of newSoftwareSystems) {
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
        // تحديث النظام الموجود
  const docId = querySnapshot.docs[0].id;
  await updateDoc(doc(db, 'products', docId), {
    systemUrl: system.systemUrl,
    description: system.description,
    features: system.features,
    state: system.state || 'active'
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
