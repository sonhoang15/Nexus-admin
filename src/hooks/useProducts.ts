import { useState } from "react";
import { TProduct } from "@/types";
import { mockProducts, mockCategories } from "@/data/mockData";
import { DEFAULT_PRODUCT_FORM } from "@/constants/productDefaults";

type ViewMode = "table" | "form" | "view";

export function useProducts() {
  const [products, setProducts] = useState<TProduct[]>(mockProducts);
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("table");

  const [selectedProduct, setSelectedProduct] = useState<TProduct | null>(null);
  const [editingProduct, setEditingProduct] = useState<TProduct | null>(null);

  const [formData, setFormData] =
    useState<typeof DEFAULT_PRODUCT_FORM>(DEFAULT_PRODUCT_FORM);

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase()),
  );

  const handleAdd = () => {
    setEditingProduct(null);
    setFormData(DEFAULT_PRODUCT_FORM);
    setViewMode("form");
  };

  const handleEdit = (product: TProduct) => {
    setEditingProduct(product);
    setFormData({
      sku: product.sku,
      barcode: product.barcode || "",
      name: product.name,
      description: product.description || "",
      categoryId: product.categoryId,
      brand: product.brand,
      manufacturer: product.manufacturer,
      weight: product.weight || "",
      dimensions: product.dimensions || "",
      tags: product.tags.join(", "),
      isFeatured: product.isFeatured,
      basePrice: product.basePrice,
      costPrice: product.costPrice || 0,
      discountPrice: product.discountPrice || 0,
      stockUnits: product.stockUnits,
      lowStockAlert: product.lowStockAlert || 10,
      metaTitle: product.metaTitle || "",
      metaDescription: product.metaDescription || "",
    });
    setViewMode("form");
  };

  const handleView = (product: TProduct) => {
    setSelectedProduct(product);
    setViewMode("view");
  };

  const handleDelete = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const handleSubmit = () => {
    const category = mockCategories.find((c) => c.id === formData.categoryId);

    if (editingProduct) {
      setProducts(
        products.map((p) =>
          p.id === editingProduct.id
            ? {
                ...p,
                ...formData,
                categoryName: category?.name,
                tags: formData.tags.split(",").map((t) => t.trim()),
              }
            : p,
        ),
      );
    } else {
      setProducts([
        ...products,
        {
          id: Date.now().toString(),
          ...formData,
          categoryName: category?.name,
          tags: formData.tags.split(",").map((t) => t.trim()),
          images: [],
          createdAt: new Date().toISOString().split("T")[0],
        },
      ]);
    }

    setEditingProduct(null);
    setFormData(DEFAULT_PRODUCT_FORM);
    setViewMode("table");
  };

  const handleCancel = () => {
    setEditingProduct(null);
    setSelectedProduct(null);
    setFormData(DEFAULT_PRODUCT_FORM);
    setViewMode("table");
  };

  return {
    products: filteredProducts,
    search,
    viewMode,
    selectedProduct,
    editingProduct,
    formData,

    setSearch,
    setFormData,

    handleAdd,
    handleEdit,
    handleView,
    handleDelete,
    handleSubmit,
    handleCancel,
  };
}
