import { useState, useEffect } from 'react';
import { db } from '@/config/firebase';
import { collection, onSnapshot, query, where, doc, getDoc } from 'firebase/firestore';

// Hook لجلب الخدمات الإضافية
export const useServices = () => {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'services'),
      (snapshot) => {
        const servicesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          description: doc.data().description,
          price: doc.data().price,
          period: doc.data().period,
          features: doc.data().features,
          createdAt: doc.data().createdAt?.toDate() || new Date(),
        }));
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

// Hook لجلب بيانات الاتصال
export const useContacts = () => {
  const [contact, setContact] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'contacts'),
      (snapshot) => {
        if (!snapshot.empty) {
          const contactData = snapshot.docs[0].data();
          setContact({
            id: snapshot.docs[0].id,
            phone: contactData.phone,
            email: contactData.email,
            address: contactData.address,
            workingHours: contactData.workingHours,
            socialMedia: contactData.socialMedia || {},
            createdAt: contactData.createdAt?.toDate() || new Date(),
          });
        }
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  return { contact, loading, error };
};

// Hook لجلب المستخدمين (للعرض العام)
export const useUsers = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'users'),
      (snapshot) => {
        const usersData = snapshot.docs.map((doc) => ({
          id: doc.id,
          email: doc.data().email,
          displayName: doc.data().displayName,
          role: doc.data().role,
          phone: doc.data().phone,
          createdAt: doc.data().createdAt?.toDate() || new Date(),
        }));
        setUsers(usersData);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  return { users, loading, error };
};

// Hook لجلب الطلبات
export const useOrders = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'orders'),
      (snapshot) => {
        const ordersData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() || new Date(),
        }));
        setOrders(ordersData);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  return { orders, loading, error };
};
