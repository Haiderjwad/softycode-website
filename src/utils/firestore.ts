import { db } from '@/config/firebase';
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from 'firebase/firestore';

// إضافة مستند جديد
export const addToFirestore = async (collectionName: string, data: any) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), {
      ...data,
      createdAt: new Date(),
    });
    return docRef.id;
  } catch (error) {
    console.error('خطأ في إضافة المستند:', error);
    throw error;
  }
};

// الحصول على جميع المستندات
export const getFromFirestore = async (collectionName: string) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error('خطأ في الحصول على البيانات:', error);
    throw error;
  }
};

// البحث في البيانات
export const queryFirestore = async (
  collectionName: string,
  field: string,
  operator: any,
  value: any
) => {
  try {
    const q = query(collection(db, collectionName), where(field, operator, value));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error('خطأ في البحث:', error);
    throw error;
  }
};

// تحديث مستند
export const updateFirestore = async (
  collectionName: string,
  docId: string,
  data: any
) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, {
      ...data,
      updatedAt: new Date(),
    });
  } catch (error) {
    console.error('خطأ في التحديث:', error);
    throw error;
  }
};

// حذف مستند
export const deleteFromFirestore = async (
  collectionName: string,
  docId: string
) => {
  try {
    await deleteDoc(doc(db, collectionName, docId));
  } catch (error) {
    console.error('خطأ في الحذف:', error);
    throw error;
  }
};
