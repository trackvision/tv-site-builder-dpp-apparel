import { useState, useEffect } from "react";
import { useDppItemTraceContext } from "@/hooks/useDppItemTraceContext";
import api from "@/api";

export default function DppProduct() {
  const { product, brand, isLoading, error } = useDppItemTraceContext();
  const [productImage, setProductImage] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState(false);

  useEffect(() => {
    const fetchProductImage = async () => {
      if (product?.primary_image) {
        setImageLoading(true);
        try {
          const base64Image = await api.getBase64(`/assets/${product.primary_image}`);
          setProductImage(base64Image);
        } catch (err) {
          console.error("Failed to load product image:", err);
          setProductImage(null);
        } finally {
          setImageLoading(false);
        }
      }
    };

    fetchProductImage();
  }, [product?.primary_image]);

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-500">Loading product details...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="text-center py-8">
        <div className="text-red-500">Error loading product details</div>
      </div>
    );
  }

  return (
    <div className="text-center py-6 px-6">
      {productImage ? (
        <img
          src={productImage}
          alt={product.product_name || "Product"}
          className="h-48 w-48 object-cover mx-auto mb-4"
        />
      ) : imageLoading ? (
        <div className="h-48 w-48 bg-gray-100 mx-auto mb-4 flex items-center justify-center">
          <span className="text-sm text-gray-500">Loading image...</span>
        </div>
      ) : null}
      <h1 className="text-xl font-semibold uppercase tracking-[0.1em] text-primary mb-1">
        {product.product_name || "Unknown Product"}
      </h1>
      {brand?.brand_name && (
        <p className="text-sm text-gray-600">{brand.brand_name}</p>
      )}
    </div>
  );
}
