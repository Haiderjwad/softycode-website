import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';

// إعدادات Firebase
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBfY7sTR7BnRRGqzOmHOiSX4r8lLPzXgmk",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "softy-code-website.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "softy-code-website",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "softy-code-website.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "400975157445",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:400975157445:web:979da2509f26c87e5a38ac",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-7EM9LDS24K"
};

// تهيئة Firebase
const app = initializeApp(firebaseConfig);

// الخدمات
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const realtimeDb = getDatabase(app);

// Analytics - فقط في المتصفح
let analytics: any;
if (typeof window !== 'undefined') {
  import('firebase/analytics').then(({ getAnalytics }) => {
    analytics = getAnalytics(app);
  });
}

export { analytics };
export default app;
