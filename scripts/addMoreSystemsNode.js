import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBfY7sTR7BnRRGqzOmHOiSX4r8lLPzXgmk", // public mock key
  authDomain: "softy-code-app.firebaseapp.com",
  projectId: "softy-code-app",
  storageBucket: "softy-code-app.appspot.com",
  messagingSenderId: "588825121288",
  appId: "1:588825121288:web:75fabe2fa5ac8572b22bb8",
  measurementId: "G-DFK61RXTFT"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const newProducts = [
    {
        name: 'سوفتي لوجستك',
        description: 'نظام متكامل واحترافي لإدارة شركات التوصيل والخدمات اللوجستية، يتيح تتبع الطلبات المباشر، إدارة المندوبين بكفاءة عالية، ومتابعة الحسابات بدقة تامة.',
        price: 15000,
        category: 'products',
        image: 'https://images.unsplash.com/photo-1586528116311-ad8ed7c80a30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        duration: 'تفعيل فوري',
        features: ['تتبع مسار الطلبات المباشر', 'تطبيق خاص للمندوبين', 'إدارة الحسابات والعمولات', 'لوحة تحكم للمتجر والعملاء'],
        systemUrl: 'https://logistic.softycode.com',
        createdAt: new Date().toISOString()
    },
    {
        name: 'سوفتي كيو كود',
        description: 'حل تقني متطور وشامل لإدارة العيادات والمجمعات الطبية باحترافية، يضمن سلاسة حجز المواعيد وإدارة السجلات الطبية بكفاءة وأمان تام ومعايير عالمية.',
        price: 18000,
        category: 'products',
        image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        duration: 'تفعيل فوري',
        features: ['حجز المواعيد وتنظيم الطابور', 'سجلات طبية إلكترونية', 'إدارة شركات التأمين', 'الوصفة الطبية التفاعلية'],
        systemUrl: 'https://clinics.softycode.com',
        createdAt: new Date().toISOString()
    },
    {
        name: 'سوفتي موجود',
        description: 'نظام احترافي لإدارة الحضور والانصراف بالبصمة الإلكترونية وإدارة الموارد البشرية، يوفر تقارير مفصلة ودقيقة لحركة الموظفين ورواتبهم بكل احترافية.',
        price: 9000,
        category: 'products',
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        duration: 'تفعيل فوري',
        features: ['ربط مباشر مع أجهزة البصمة', 'إدارة الإجازات والمغادرات', 'احتساب الرواتب والعمل الإضافي', 'تقارير أداء الموظفين الشاملة'],
        systemUrl: 'https://mawjoud.softycode.com',
        createdAt: new Date().toISOString()
    }
];

async function addMoreSystems() {
    try {
        console.log('🔄 جاري إضافة الأنظمة البرمجية الجديدة إلى Firestore...');
        for (const product of newProducts) {
            const docRef = await addDoc(collection(db, 'products'), product);
            console.log(`✅ تم إضافة النظام: ${product.name} (ID: ${docRef.id})`);
        }
        console.log('🎉 اكتملت عملية الإضافة بنجاح!');
        process.exit(0);
    } catch (error) {
        console.error('❌ خطأ أثناء إضافة المنتجات:', error);
        process.exit(1);
    }
}

addMoreSystems();
