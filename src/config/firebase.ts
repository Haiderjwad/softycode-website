import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';

// إعدادات Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBfY7sTR7BnRRGqzOmHOiSX4r8lLPzXgmk",
  authDomain: "softy-code-website.firebaseapp.com",
  projectId: "softy-code-website",
  storageBucket: "softy-code-website.firebasestorage.app",
  messagingSenderId: "400975157445",
  appId: "1:400975157445:web:979da2509f26c87e5a38ac",
  measurementId: "G-7EM9LDS24K"
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
  const { getAnalytics } = require('firebase/analytics');
  analytics = getAnalytics(app);
}

export { analytics };
export default app;
