import { useEffect, useState } from "react";
import { IProduct } from "@/types";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  uploadProductImages,
  deleteProductImage,
} from "@/services/ProductsService";
import { DEFAULT_PRODUCT_FORM } from "@/constants/productDefaults";
import { TProductFormData } from "@/types/product";

type ViewMode = "table" | "form" | "view";

export function useProducts() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("table");

  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [editingProduct, setEditingProduct] = useState<IProduct | null>(null);

  const [tagInput, setTagInput] = useState("");
  const [errors, setErrors] = useState<{ tags?: string }>({});

  const [formData, setFormData] = useState<TProductFormData>({
    ...DEFAULT_PRODUCT_FORM,
    tags: [],
    images: [],
  });

  const [deletedImageIds, setDeletedImageIds] = useState<string[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(
        data?.items?.map((p) => ({
          ...p,
          tags: p.tags ?? [],
        })) || [],
      );
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase()),
  );

  const handleAdd = () => {
    setEditingProduct(null);
    setFormData({
      ...DEFAULT_PRODUCT_FORM,
      tags: [],
      images: [],
    });
    setViewMode("form");
  };

  const handleEdit = async (product: IProduct) => {
    try {
      const fullProduct = await getProductById(product.id);

      const mappedImages =
        fullProduct.images?.map((img) => ({
          type: "old" as const,
          id: img.id,
          url: img.url,
        })) ?? [];

      const formData = {
        sku: fullProduct.sku,
        barcode: fullProduct.barcode || "",
        name: fullProduct.name,
        description: fullProduct.description || "",
        categoryId: fullProduct.categoryId,
        brand: fullProduct.brand,
        manufacturer: fullProduct.manufacturer,
        weight: fullProduct.weight || "",
        dimensions: fullProduct.dimensions || "",
        tags: fullProduct.tags ?? [],
        isFeatured: fullProduct.isFeatured,
        basePrice: fullProduct.basePrice,
        costPrice: fullProduct.costPrice || 0,
        discountPrice: fullProduct.discountPrice || 0,
        stockUnits: fullProduct.stockUnits,
        lowStockAlert: fullProduct.lowStockAlert || 10,
        metaTitle: fullProduct.metaTitle || "",
        metaDescription: fullProduct.metaDescription || "",
        images: mappedImages,
      };

      setEditingProduct(fullProduct);
      setFormData(formData);
      setViewMode("form");

      console.log("Form data set for editing:", formData);
    } catch (error) {
      console.error("Failed to load product detail:", error);
    }
  };
  const handleView = (product: IProduct) => {
    setSelectedProduct(product);
    setViewMode("view");
  };

  const handleDelete = async (id: string) => {
    await deleteProduct(id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleSubmit = async () => {
    if (formData.tags.length < 1 || formData.tags.length > 8) {
      setErrors({ tags: "Tags must be between 1 and 8" });
      return;
    }

    try {
      const newFiles = formData.images
        .filter((img) => img.type === "new")
        .map((img) => img.file);

      if (editingProduct) {
        const { images, ...payload } = formData;

        if (deletedImageIds.length > 0) {
          for (const imageId of deletedImageIds) {
            await deleteProductImage(editingProduct.id, imageId);
          }
        }

        if (newFiles.length > 0) {
          await uploadProductImages(editingProduct.id, newFiles);
        }

        await updateProduct(editingProduct.id, payload);

        setDeletedImageIds([]);
      } else {
        if (newFiles.length === 0) {
          alert("Product must have at least one image");
          return;
        }

        await createProduct({
          ...formData,
          images: newFiles.map((file) => ({ type: "new", file })),
        });
      }

      const data = await getProducts();
      setProducts(data.items);

      setEditingProduct(null);
      setFormData({
        ...DEFAULT_PRODUCT_FORM,
        tags: [],
        images: [],
      });

      setViewMode("table");
    } catch (error) {
      console.error("Submit failed:", error);
    }
  };

  const handleRemoveImage = (image: any) => {
    if (image.type === "old") {
      setDeletedImageIds((prev) => [...prev, image.id]);
    }

    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((img) => img !== image),
    }));
    console.log("Image object:", image);
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;

    e.preventDefault();

    const value = tagInput.trim();
    if (!value) return;

    if (formData.tags.length >= 8) {
      setErrors({ tags: "Maximum 8 tags allowed" });
      return;
    }

    if (formData.tags.includes(value)) return;

    setFormData((prev) => ({
      ...prev,
      tags: [...prev.tags, value],
    }));

    setTagInput("");
    setErrors({});
  };

  return {
    products: filteredProducts,
    search,
    viewMode,
    selectedProduct,
    editingProduct,
    formData,
    tagInput,
    errors,

    setSearch,
    setFormData,
    setTagInput,

    handleAdd,
    handleEdit,
    handleView,
    handleDelete,
    handleSubmit,
    handleCancel: () => {
      setEditingProduct(null);
      setSelectedProduct(null);
      setFormData({
        ...DEFAULT_PRODUCT_FORM,
        tags: [],
        images: [],
      });
      setViewMode("table");
    },

    handleRemoveTag,
    handleKeyDown,
    handleRemoveImage,
  };
}
