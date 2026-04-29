import { useState, useEffect } from 'react';
import { db } from '@/config/firebase';
import { collection, getDocs, onSnapshot, query, where } from 'firebase/firestore';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  duration?: string;
  features?: string[];
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
        const productsData = snapshot.docs.map((doc) => {
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
            createdAt: data.createdAt?.toDate() || new Date(),
          } as Product;
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
      createdAt: data.createdAt?.toDate() || new Date(),
    } as Product;
  } catch (error) {
    console.error('خطأ في جلب المنتج:', error);
    throw error;
  }
};
