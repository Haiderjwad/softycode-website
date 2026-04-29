# 📊 بنية قاعدة البيانات - Firestore

تم إنشاء قاعدة بيانات Firestore مع المجموعات التالية:

---

## 1️⃣ مجموعة **products** (المنتجات والخدمات)

```typescript
{
  id: string (معرف تلقائي)
  name: string (اسم المنتج)
  description: string (وصف المنتج)
  price: number (السعر بالريال السعودي)
  category: string (النوع: "services" أو "products")
  image?: string (رابط الصورة)
  duration?: string (مدة التنفيذ)
  features?: string[] (المميزات)
  createdAt: timestamp (تاريخ الإنشاء)
}
```

**أمثلة:**
- خدمة تطوير الويب
- تطبيقات الجوال
- استشارات تقنية
- تصميم الواجهات

---

## 2️⃣ مجموعة **services** (الخدمات الإضافية)

```typescript
{
  id: string
  name: string (اسم الخدمة)
  description: string
  price: number (السعر)
  period: string ("شهري" / "سنوي" / إلخ)
  features?: string[]
  createdAt: timestamp
}
```

**أمثلة:**
- استضافة الويب
- صيانة المشاريع
- دعم فني

---

## 3️⃣ مجموعة **users** (المستخدمون)

```typescript
{
  id: string
  email: string
  displayName: string
  role: string ("admin" / "user" / "customer")
  phone?: string
  createdAt: timestamp
  updatedAt?: timestamp
}
```

---

## 4️⃣ مجموعة **orders** (الطلبات)

```typescript
{
  id: string
  userId: string (معرف المستخدم)
  productId: string (معرف المنتج)
  quantity: number (الكمية)
  totalPrice: number (السعر الإجمالي)
  status: string ("pending" / "processing" / "completed" / "cancelled")
  deliveryDate?: string
  notes?: string
  createdAt: timestamp
  updatedAt?: timestamp
}
```

---

## 5️⃣ مجموعة **contacts** (بيانات الاتصال)

```typescript
{
  id: string
  phone: string
  email: string
  address: string
  workingHours: string
  socialMedia: {
    twitter?: string
    instagram?: string
    linkedin?: string
    facebook?: string
  }
  createdAt: timestamp
}
```

---

## 🚀 كيفية استخدام البيانات

### جلب جميع المنتجات
```typescript
import { useProducts } from '@/hooks/useProducts';

function MyComponent() {
  const { products, loading, error } = useProducts();
  
  return (
    <div>
      {products.map(product => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}
```

### إضافة منتج جديد
```typescript
import { addProduct } from '@/utils/firebaseInit';

const newProduct = {
  name: 'منتج جديد',
  description: 'وصف المنتج',
  price: 1000,
  category: 'services',
};

const productId = await addProduct(newProduct);
```

### إضافة طلب جديد
```typescript
import { addOrder } from '@/utils/firebaseInit';

const newOrder = {
  userId: 'user123',
  productId: 'product123',
  quantity: 1,
  totalPrice: 1000,
};

const orderId = await addOrder(newOrder);
```

---

## 🔧 تهيئة قاعدة البيانات

لتهيئة البيانات الأولية:

```typescript
import { initializeFirestoreCollections } from '@/utils/firebaseInit';

// استدعي الدالة مرة واحدة
await initializeFirestoreCollections();
```

أو استخدم صفحة Admin Panel المدمجة:
```typescript
import { AdminPanel } from '@/components/AdminPanel';

function App() {
  return <AdminPanel />;
}
```

---

## 📋 الملفات المرتبطة

- `src/config/firebase.ts` - إعدادات Firebase
- `src/utils/firebaseInit.ts` - دوال التهيئة والإضافة
- `src/hooks/useProducts.ts` - hook لجلب المنتجات
- `src/components/AdminPanel.tsx` - لوحة الإدارة
- `src/components/ProductsList.tsx` - عرض المنتجات

---

✅ **جاهز للاستخدام!** استمتع بـ Firebase 🔥
