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

const newProduct = {
    name: 'نظام إدارة الموارد (ERP)',
    description: 'نظام برمجي متكامل طورته الشركة لإدارة الموارد، المبيعات، والعملاء باحترافية عالية.',
    price: 25000,
    category: 'products',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    duration: 'تفعيل فوري',
    features: ['إدارة المبيعات والمخزون', 'تقارير مالية شاملة', 'لوحة تحكم احترافية', 'دعم فني على مدار الساعة'],
    systemUrl: 'https://software-demo.softycode.com',
    createdAt: new Date()
};

async function addSystemProduct() {
    try {
        console.log('🔄 جاري إضافة نظام برمجي جديد إلى Firestore...');
        const docRef = await addDoc(collection(db, 'products'), newProduct);
        console.log(`✅ تم إضافة النظام البرمجي بنجاح! ID: ${docRef.id}`);

        // Exit only if running in Node.js environment
        if (typeof process !== 'undefined' && process.exit) {
            process.exit(0);
        }
    } catch (error) {
        console.error('❌ خطأ أثناء إضافة المنتج:', error);
        if (typeof process !== 'undefined' && process.exit) {
            process.exit(1);
        }
    }
}

// تشغيل السكريبت
if (typeof process !== 'undefined') {
    addSystemProduct();
}
