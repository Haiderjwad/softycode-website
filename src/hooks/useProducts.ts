import { useState, useEffect } from 'react';
import { db } from '@/config/firebase';
import { collection, getDocs, onSnapshot, query, where } from 'firebase/firestore';

export type ProductState = 'active' | 'inactive' | 'updating';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  duration?: string;
  features?: string[];
  systemUrl?: string; // رابط النظام
  state?: ProductState; // حالة النظام: active, inactive, updating
  createdAt: Date;
}

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'products'),
      (snapshot) => {
        let productsData = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name,
            description: data.description,
            price: data.price,
            category: data.category,
            image: data.image,
            duration: data.duration,
            features: data.features,
            systemUrl: data.systemUrl,
            state: data.state || 'active', // default to active if not set
            createdAt: data.createdAt?.toDate() || new Date(),
          } as Product;
        });

        // ============================================
        // حقن المنتجات الجديدة افتراضياً في حال لم يتم إضافتها 
        // لقاعدة البيانات بعد لضمان ظهورها الفوري
        // ============================================
        const newSystems: Product[] = [
          {
            id: 'softy-logistic-sys',
            name: 'سوفتي لوجستك',
            description: 'نظام متكامل واحترافي لإدارة شركات التوصيل والخدمات اللوجستية، يتيح تتبع الطلبات المباشر، إدارة المندوبين بكفاءة، ومتابعة الحسابات بدقة.',
            price: 15000,
            category: 'products',
            image: 'https://images.unsplash.com/photo-1586528116311-ad8ed7c80a30?auto=format&fit=crop&q=80&w=800',
            duration: 'تفعيل فوري',
            features: ['تتبع مباشر للطلبات', 'تطبيق خاص للمندوبين', 'إدارة حسابات وعمولات', 'لوحة تحكم ذكية للعملاء'],
            systemUrl: 'https://logistic.softycode.com',
            state: 'active',
            createdAt: new Date(),
          },
          {
            id: 'softy-qcode-sys',
            name: 'سوفتي كيو كود',
            description: 'حل تقني متطور وشامل لإدارة العيادات والمجمعات الطبية باحترافية، يضمن سلاسة حجز المواعيد وإدارة السجلات الطبية.',
            price: 18000,
            category: 'products',
            image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&q=80&w=800',
            duration: 'تفعيل فوري',
            features: ['حجز ذكي للمواعيد', 'سجلات طبية إلكترونية', 'إدارة التأمين والمطالبات', 'وصفة طبية إلكترونية'],
            systemUrl: 'https://clinics.softycode.com',
            state: 'active',
            createdAt: new Date(),
          },
          {
            id: 'softy-mawjoud-sys',
            name: 'سوفتي موجود',
            description: 'نظام احترافي لإدارة الحضور والانصراف بالبصمة الإلكترونية وإدارة الموارد البشرية مع تقارير مفصلة للرواتب والموظفين.',
            price: 9000,
            category: 'products',
            image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800',
            duration: 'تفعيل فوري',
            features: ['ربط مباشر بأجهزة البصمة', 'إدارة الإجازات والغياب', 'الربط مع أنظمة الرواتب', 'تقارير أداء شاملة'],
            systemUrl: 'https://mawjoud.softycode.com',
            state: 'active',
            createdAt: new Date(),
          }
        ];

        newSystems.forEach(sys => {
          if (!productsData.some(p => p.name === sys.name)) {
            productsData.push(sys);
          }
        });

        // Sort products by state: active first, then updating, then inactive
        const statePriority: Record<ProductState, number> = {
          active: 0,
          updating: 1,
          inactive: 2,
        };
        productsData.sort((a, b) => {
          const priorityA = statePriority[(a.state || 'active') as ProductState];
          const priorityB = statePriority[(b.state || 'active') as ProductState];
          return priorityA - priorityB;
        });

        setProducts(productsData);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  return { products, loading, error };
};

export const useServiceProducts = () => {
  const [services, setServices] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, 'products'), where('category', '==', 'services')),
      (snapshot) => {
        const servicesData = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name,
            description: data.description,
            price: data.price,
            category: data.category,
            image: data.image,
            duration: data.duration,
            features: data.features,
            systemUrl: data.systemUrl,
            createdAt: data.createdAt?.toDate() || new Date(),
          } as Product;
        });
        setServices(servicesData);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  return { services, loading, error };
};

export const getProductById = async (productId: string) => {
  try {
    const snapshot = await getDocs(
      query(collection(db, 'products'), where('__name__', '==', productId))
    );
    if (snapshot.empty) {
      return null;
    }
    const doc = snapshot.docs[0];
    const data = doc.data();
    return {
      id: doc.id,
      name: data.name,
      description: data.description,
      price: data.price,
      category: data.category,
      image: data.image,
      duration: data.duration,
      features: data.features,
      systemUrl: data.systemUrl,
      state: data.state || 'active',
      createdAt: data.createdAt?.toDate() || new Date(),
    } as Product;
  } catch (error) {
    console.error('خطأ في جلب المنتج:', error);
    throw error;
  }
};
