import { config } from 'dotenv';
config();

// Mock import.meta.env for Node.js scripts
if (typeof process !== 'undefined' && !((globalThis as any).import)) {
    (globalThis as any).import = {
        meta: {
            env: process.env
        }
    };
} else if (!(globalThis as any).import?.meta?.env) {
    (globalThis as any).import = {
        ...(globalThis as any).import,
        meta: {
            ...((globalThis as any).import?.meta || {}),
            env: process.env || {}
        }
    }
}

import { db } from '../src/config/firebase';
import { collection, addDoc } from 'firebase/firestore';

const newProducts = [
    {
        name: 'سوفتي لوجستك - لإدارة شركات التوصيل',
        description: 'نظام متكامل واحترافي لإدارة شركات التوصيل والخدمات اللوجستية، يتيح تتبع الطلبات المباشر، إدارة المندوبين بكفاءة عالية، ومتابعة الحسابات بدقة تامة.',
        price: 15000,
        category: 'products',
        image: 'https://images.unsplash.com/photo-1586528116311-ad8ed7c80a30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        duration: 'تفعيل فوري',
        features: ['تتبع مسار الطلبات المباشر', 'تطبيق خاص للمندوبين', 'إدارة الحسابات والعمولات', 'لوحة تحكم للمتجر والعملاء'],
        systemUrl: 'https://logistic.softycode.com',
        createdAt: new Date()
    },
    {
        name: 'سوفتي كيو كود - لإدارة العيادات الطبية',
        description: 'حل تقني متطور وشامل لإدارة العيادات والمجمعات الطبية باحترافية، يضمن سلاسة حجز المواعيد وإدارة السجلات الطبية بكفاءة وأمان تام ومعايير عالمية.',
        price: 18000,
        category: 'products',
        image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        duration: 'تفعيل فوري',
        features: ['حجز المواعيد وتنظيم الطابور', 'سجلات طبية إلكترونية', 'إدارة شركات التأمين', 'الوصفة الطبية التفاعلية'],
        systemUrl: 'https://clinics.softycode.com',
        createdAt: new Date()
    },
    {
        name: 'سوفتي موجود - لإدارة الحضور بالبصمة',
        description: 'نظام احترافي لإدارة الحضور والانصراف بالبصمة الإلكترونية وإدارة الموارد البشرية، يوفر تقارير مفصلة ودقيقة لحركة الموظفين ورواتبهم بكل احترافية.',
        price: 9000,
        category: 'products',
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        duration: 'تفعيل فوري',
        features: ['ربط مباشر مع أجهزة البصمة', 'إدارة الإجازات والمغادرات', 'احتساب الرواتب والعمل الإضافي', 'تقارير أداء الموظفين الشاملة'],
        systemUrl: 'https://mawjoud.softycode.com',
        createdAt: new Date()
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

        // Exit only if running in Node.js environment
        if (typeof process !== 'undefined' && process.exit) {
            process.exit(0);
        }
    } catch (error) {
        console.error('❌ خطأ أثناء إضافة المنتجات:', error);
        if (typeof process !== 'undefined' && process.exit) {
            process.exit(1);
        }
    }
}

// تشغيل السكريبت
if (typeof process !== 'undefined') {
    addMoreSystems();
}
