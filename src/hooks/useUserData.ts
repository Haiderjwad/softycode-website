import { useState, useEffect } from 'react';
import { db } from '@/config/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { useAuth } from './useAuth';

export interface UserData {
  uid: string;
  name: string;
  email: string;
  role: string;
  createdAt: any;
  lastLoginAt: any;
  status: string;
  trialUsed?: boolean;
  trialExpiresAt?: any;
}

export const useUserData = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setUserData(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    const unsubscribe = onSnapshot(
      doc(db, 'users', user.uid),
      (docSnap) => {
        if (docSnap.exists()) {
          setUserData(docSnap.data() as UserData);
        } else {
          setUserData(null);
        }
        setLoading(false);
      },
      (err) => {
        console.error('Error fetching user data:', err);
        setError(err.message);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [user]);

  return { userData, loading, error };
};
