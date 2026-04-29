import { useProducts } from '@/hooks/useProducts';

export const ProductsList = () => {
  const { products, loading, error } = useProducts();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">جاري تحميل المنتجات...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          حدث خطأ: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-900">
          منتجاتنا وخدماتنا
        </h1>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">لا توجد منتجات حالياً</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                {product.image && (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                )}

                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-2 text-gray-900">
                    {product.name}
                  </h2>

                  <p className="text-gray-600 mb-4 text-sm">
                    {product.description}
                  </p>

                  {product.duration && (
                    <p className="text-sm text-gray-500 mb-2">
                      ⏱️ المدة: {product.duration}
                    </p>
                  )}

                  {product.features && product.features.length > 0 && (
                    <div className="mb-4">
                      <h3 className="font-semibold text-sm mb-2 text-gray-900">
                        المميزات:
                      </h3>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {product.features.map((feature, index) => (
                          <li key={index}>✓ {feature}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex items-center justify-between mt-6">
                    <span className="text-2xl font-bold text-blue-600">
                      {product.price.toLocaleString('ar-SA')} ر.س
                    </span>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                      اطلب الآن
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
