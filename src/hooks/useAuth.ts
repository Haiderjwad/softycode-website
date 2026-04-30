import { auth, db } from '@/config/firebase';
import {
  signOut,
  onAuthStateChanged,
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email: string, password: string) => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    // تحديث وقت آخر تسجيل دخول في Firestore بصمت لتجنب الأخطاء إن لم يكن المستخدم مسجلاً بعد
    if (result.user) {
      try {
        await setDoc(doc(db, 'users', result.user.uid), {
          lastLoginAt: serverTimestamp()
        }, { merge: true });
      } catch (e) {
        console.error('Error updating last login:', e);
      }
    }
    return result;
  };

  const register = async (email: string, password: string, displayName: string) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    if (result.user) {
      await updateProfile(result.user, { displayName });

      // حفظ بيانات المستخدم الجديد في جدول users
      try {
        await setDoc(doc(db, 'users', result.user.uid), {
          uid: result.user.uid,
          name: displayName,
          email: email,
          role: 'user', // الصلاحية الافتراضية
          createdAt: serverTimestamp(),
          lastLoginAt: serverTimestamp(),
          status: 'active'
        });
      } catch (e) {
        console.error('Error creating user document:', e);
      }
    }
    return result;
  };

  const logout = async () => {
    return signOut(auth);
  };

  return { user, loading, login, register, logout };
};
