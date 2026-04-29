# إعداد Firebase

تم ربط مشروعك بـ Firebase بنجاح! إليك الخطوات التالية:

## 1️⃣ الحصول على بيانات Firebase

1. اذهب إلى [Firebase Console](https://console.firebase.google.com/)
2. أنشئ مشروع جديد أو استخدم مشروع موجود
3. انقر على "Add app" واختر "Web"
4. نسخ بيانات الاعدادات (SDK credentials)

## 2️⃣ إضافة المتغيرات البيئية

عدّل ملف `.env.local` وأضف البيانات الخاصة بك:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## 3️⃣ استخدام الخدمات

### المصادقة (Authentication)
```typescript
import { useAuth } from '@/hooks/useAuth';

function MyComponent() {
  const { user, loading, login, register, logout } = useAuth();
  
  const handleLogin = async () => {
    await login('user@example.com', 'password123');
  };

  return (
    <div>
      {user ? <span>مرحباً {user.displayName}</span> : <span>غير مسجل</span>}
    </div>
  );
}
```

### Firestore
```typescript
import { 
  addToFirestore, 
  getFromFirestore, 
  updateFirestore, 
  deleteFromFirestore 
} from '@/utils/firestore';

// إضافة بيانات
const id = await addToFirestore('users', { name: 'أحمد', email: 'ahmed@example.com' });

// الحصول على البيانات
const users = await getFromFirestore('users');

// تحديث
await updateFirestore('users', id, { name: 'محمد' });

// حذف
await deleteFromFirestore('users', id);
```

## 📁 ملفات مهمة

- `src/config/firebase.ts` - إعدادات Firebase الرئيسية
- `src/hooks/useAuth.ts` - hook للمصادقة
- `src/utils/firestore.ts` - دوال Firestore المساعدة
- `.env.local` - متغيرات البيئة

## 🚀 الآن جاهز!

شغّل المشروع:
```bash
npm run dev
```

استمتع بـ Firebase! 🔥
