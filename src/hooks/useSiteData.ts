import { useState, useEffect } from 'react';
import { db } from '@/config/firebase';
import { collection, onSnapshot, query, orderBy, limit } from 'firebase/firestore';

// Site Settings Interface
export interface SiteStat {
  id?: string;
  label: string;
  value: string;
  icon?: string;
  color?: string;
  order: number;
}

export interface SiteFeature {
  id?: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  bgColor: string;
  order: number;
}

export interface SiteSystem {
  id?: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  bgColor: string;
  category: string;
  order: number;
}

export interface GeneralSettings {
  siteName: string;
  tagline: string;
  description: string;
  updatedAt?: Date;
}

// Hook لجلب إحصائيات الموقع
export const useSiteStats = () => {
  const [stats, setStats] = useState<SiteStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, 'siteStats'), orderBy('order', 'asc')),
      (snapshot) => {
        const statsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        } as SiteStat));
        setStats(statsData);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  return { stats, loading, error };
};

// Hook لجلب ميزات الموقع
export const useSiteFeatures = () => {
  const [features, setFeatures] = useState<SiteFeature[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, 'siteFeatures'), orderBy('order', 'asc')),
      (snapshot) => {
        const featuresData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        } as SiteFeature));
        setFeatures(featuresData);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  return { features, loading, error };
};

// Hook لجلب أنظمة الشركة
export const useSiteSystems = () => {
  const [systems, setSystems] = useState<SiteSystem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, 'siteSystems'), orderBy('order', 'asc')),
      (snapshot) => {
        const systemsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        } as SiteSystem));
        setSystems(systemsData);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  return { systems, loading, error };
};

// Hook لجلب الإعدادات العامة
export const useGeneralSettings = () => {
  const [settings, setSettings] = useState<GeneralSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'generalSettings'),
      (snapshot) => {
        if (!snapshot.empty) {
          const data = snapshot.docs[0].data();
          setSettings({
            siteName: data.siteName || 'SoftyCode',
            tagline: data.tagline || '',
            description: data.description || '',
            updatedAt: data.updatedAt?.toDate(),
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

  return { settings, loading, error };
};

export interface ConnectInfo {
  id?: string;
  label: string;
  value: string;
  icon: string;
  order?: number;
}

export interface SocialMedia {
  id?: string;
  label: string;
  url: string;
  icon: string;
  order?: number;
}

export const useConnectData = () => {
  const [connectInfo, setConnectInfo] = useState<ConnectInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, 'connect')),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        } as ConnectInfo));
        // Sort in client side if order is available
        data.sort((a, b) => (a.order || 0) - (b.order || 0));
        setConnectInfo(data);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  return { connectInfo, loading, error };
};

export const useSocialMedia = () => {
  const [socialMedia, setSocialMedia] = useState<SocialMedia[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, 'social_media')),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        } as SocialMedia));
        // Sort in client side if order is available
        data.sort((a, b) => (a.order || 0) - (b.order || 0));
        setSocialMedia(data);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  return { socialMedia, loading, error };
};
