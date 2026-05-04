# 📚 دليل إضافة المنتجات مع روابط النظام

## مثال بسيط للمنتج الكامل

```javascript
// مثال: نظام إدارة المطاعم
{
  id: "restaurant-system-001",
  name: "نظام إدارة المطاعم الذكي Pro",
  description: "نظام متكامل لإدارة المطاعم والمقاهي مع إمكانيات متقدمة للطلبات والفواتير والموارد البشرية",
  price: 4999,
  category: "restaurant",
  image: "https://images.unsplash.com/photo-1555939594-58d7cb561621?w=500&h=500&fit=crop",
  duration: "30 يوم تجربة مجانية",
  features: [
    "إدارة الطلبات والحجوزات",
    "نظام الفواتير والمدفوعات",
    "إدارة الموظفين والرواتب",
    "تقارير وإحصائيات متقدمة",
    "التكامل مع تطبيقات التوصيل",
    "نسخ احتياطية آمنة",
    "دعم فني 24/7"
  ],
  systemUrl: "https://restaurant.softycode.com/demo", // ← رابط النظام
  createdAt: "2026-05-04"
}
```

---

## مثال آخر: نظام إدارة العيادات

```javascript
{
  id: "clinic-system-001",
  name: "نظام إدارة العيادات الطبية",
  description: "نظام شامل لإدارة العيادات والمستشفيات مع إمكانيات للمرضى والمواعيد والملفات الطبية",
  price: 3999,
  category: "clinics",
  image: "https://images.unsplash.com/photo-1576091160550-112173f7f869?w=500&h=500&fit=crop",
  duration: "14 يوم تجربة مجانية",
  features: [
    "إدارة بيانات المرضى",
    "جدولة المواعيد",
    "الملفات الطبية الإلكترونية",
    "وصفات الأدوية الرقمية",
    "الفواتير والمدفوعات",
    "تقارير المرضى",
    "الأرشفة الآمنة"
  ],
  systemUrl: "https://clinic.softycode.com/dashboard", // ← رابط النظام
  createdAt: "2026-05-04"
}
```

---

## مثال ثالث: نظام التوصيل

```javascript
{
  id: "delivery-system-001",
  name: "منصة التوصيل المتكاملة",
  description: "منصة توصيل متقدمة تربط الطلب مع المندوبين وتتبع الطلبات في الوقت الفعلي",
  price: 5999,
  category: "delivery",
  image: "https://images.unsplash.com/photo-1594642632823-71af186901d4?w=500&h=500&fit=crop",
  duration: "45 يوم تجربة مجانية",
  features: [
    "تتبع الطلبات في الوقت الفعلي",
    "إدارة المندوبين والمسارات",
    "نظام الدفع المتقدم",
    "تقييم الخدمة والتقارير",
    "تكامل مع APIs خارجية",
    "دعم لغات متعددة",
    "تطبيق موبايل للمستخدمين"
  ],
  systemUrl: "https://delivery.softycode.com/admin", // ← رابط النظام
  createdAt: "2026-05-04"
}
```

---

## 🔐 معايير إدخال البيانات

### الحقول المطلوبة:
- ✅ `id` - معرّف فريد للمنتج
- ✅ `name` - اسم المنتج (2-100 حرف)
- ✅ `description` - الوصف (10-500 حرف)
- ✅ `price` - السعر (أكبر من 0)
- ✅ `category` - الفئة (restaurant, clinics, delivery)

### الحقول الاختيارية:
- 📌 `image` - صورة المنتج (رابط صالح)
- 📌 `duration` - المدة الزمنية
- 📌 `features` - المميزات (مصفوفة نصوص)
- 📌 `systemUrl` - رابط النظام (جديد - اختياري)

---

## 🎯 صيغة رابط النظام المقترحة

```
https://[subdomain].softycode.com/[page]
```

**أمثلة:**
- `https://restaurant.softycode.com/demo`
- `https://clinic.softycode.com/dashboard`
- `https://delivery.softycode.com/admin`
- `https://app.softycode.com/system/[id]`

---

## 📝 طرق الإضافة إلى Firebase

### الطريقة الأولى: عبر Firebase Console
1. اذهب إلى [Firebase Console](https://console.firebase.google.com)
2. اختر المشروع الخاص بك
3. انقر على **Firestore Database**
4. اختر مجموعة **products**
5. انقر **Add document**
6. أضف البيانات كما في الأمثلة أعلاه
7. تأكد من إضافة حقل `systemUrl`

### الطريقة الثانية: عبر Admin SDK
```javascript
const admin = require('firebase-admin');

admin.firestore().collection('products').add({
  name: "نظام إدارة المطاعم",
  description: "...",
  price: 4999,
  category: "restaurant",
  image: "...",
  duration: "30 يوم",
  features: [...],
  systemUrl: "https://restaurant.softycode.com/demo",
  createdAt: admin.firestore.FieldValue.serverTimestamp()
});
```

### الطريقة الثالثة: عبر API Custom
```bash
curl -X POST https://your-server.com/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "نظام إدارة المطاعم",
    "description": "...",
    "price": 4999,
    "category": "restaurant",
    "systemUrl": "https://restaurant.softycode.com/demo"
  }'
```

---

## ✅ قائمة التحقق قبل النشر

- [ ] تم إدخال جميع البيانات الأساسية
- [ ] تم اختبار رابط النظام وهو يعمل
- [ ] الصورة تظهر بشكل صحيح
- [ ] السعر صحيح ومعقول
- [ ] المميزات موضحة بشكل واضح
- [ ] الفئة محددة بشكل صحيح
- [ ] تم اختبار الزر على الواجهة
- [ ] الرابط يفتح في نافذة جديدة

---

## 🐛 استكشاف الأخطاء

### الزر لا يظهر؟
- ✓ تحقق من أن حقل `systemUrl` موجود
- ✓ تحقق من أن الرابط ليس فارغاً
- ✓ تحقق من أن البيانات تم تحديثها

### الرابط لا يعمل؟
- ✓ تحقق من صحة الرابط (http/https)
- ✓ تأكد من أن الموقع متاح
- ✓ اختبر الرابط مباشرة في المتصفح

### الزر يبدو غريباً؟
- ✓ امسح ذاكرة التخزين المؤقت
- ✓ أعد تحميل الصفحة
- ✓ جرب متصفح مختلف

---

## 📊 نموذج JSON كامل

```json
{
  "id": "product-001",
  "name": "اسم المنتج",
  "description": "وصف تفصيلي للمنتج",
  "price": 2999,
  "category": "restaurant",
  "image": "https://example.com/image.jpg",
  "duration": "30 يوم",
  "features": [
    "مميزة 1",
    "مميزة 2",
    "مميزة 3"
  ],
  "systemUrl": "https://example.com/system",
  "createdAt": "2026-05-04T12:00:00Z"
}
```

---

## 🎨 الألوان المستخدمة للزر

| الحالة | اللون |
|--------|-------|
| Normal | Teal (#14b8a6) |
| Hover | Teal أفتح |
| Dark Mode | Teal مع خلفية داكنة |

---

## 🔍 اختبر التكامل

```bash
# تحقق من أن المنتج يحتوي على systemUrl
curl "https://your-api.com/products/product-001" | jq '.systemUrl'

# يجب أن تظهر النتيجة:
# "https://example.com/system"
```

---

**تم إنشاء الدليل بنجاح! 📚**

للمزيد من المساعدة، اتصل بنا على:
- 📧 Email: support@softycode.com
- 💬 Chat: في التطبيق
- 📞 Phone: +966-XXX-XXXX
