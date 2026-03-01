import { useEffect, useState, useMemo } from "react";
import { IProduct, TProductFilters } from "@/types";
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
import { EStatus, EPromotion, ESort } from "@/enums/filters.enums";

type ViewMode = "table" | "form" | "view";

export function useProducts() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [search, setSearch] = useState<string>("");
  const [viewMode, setViewMode] = useState<ViewMode>("table");

  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [editingProduct, setEditingProduct] = useState<IProduct | null>(null);

  const [tagInput, setTagInput] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<TProductFormData>({
    ...DEFAULT_PRODUCT_FORM,
    tags: [],
    images: [],
  });

  const [deletedImageIds, setDeletedImageIds] = useState<string[]>([]);

  const [filters, setFilters] = useState<TProductFilters>({
    categories: [],
    status: EStatus.ALL,
    promotion: EPromotion.ALL,
    minPrice: 0,
    maxPrice: 0,
    sort: ESort.NEWEST,
  });

  const [deleteProductId, setDeleteProductId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(
        data?.items?.map((p) => ({
          ...p,
          basePrice: Number(p.basePrice),
          discountPrice: p.discountPrice ? Number(p.discountPrice) : undefined,
          tags: p.tags ?? [],
        })) || [],
      );
    };

    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    const keyword = search.trim().toLowerCase();
    if (keyword) {
      result = result.filter((p) =>
        [p.name, p.sku, p.brand, p.category?.name]
          .filter(Boolean)
          .some((field) => field!.toLowerCase().includes(keyword)),
      );
    }

    if (filters.categories.length) {
      result = result.filter((p) =>
        filters.categories.includes(p.category?.id ?? ""),
      );
    }

    if (filters.status !== EStatus.ALL) {
      result = result.filter((p) => {
        const lowAlert =
          p.lowStockAlert && p.lowStockAlert > 0 ? p.lowStockAlert : 10;

        if (filters.status === EStatus.IN_STOCK) return p.stockUnits > lowAlert;

        if (filters.status === EStatus.LOW_STOCK)
          return p.stockUnits > 0 && p.stockUnits <= lowAlert;

        if (filters.status === EStatus.OUT_OF_STOCK) return p.stockUnits === 0;

        return true;
      });
    }

    if (filters.promotion !== EPromotion.ALL) {
      result = result.filter((p) => {
        if (filters.promotion === EPromotion.FEATURED) return p.isFeatured;

        if (filters.promotion === EPromotion.STANDARD) return !p.isFeatured;

        return true;
      });
    }

    if (filters.minPrice > 0 || filters.maxPrice > 0) {
      result = result.filter((p) => {
        const price =
          p.discountPrice && p.discountPrice > 0
            ? p.discountPrice
            : p.basePrice;

        if (filters.minPrice > 0 && price < filters.minPrice) return false;

        if (filters.maxPrice > 0 && price > filters.maxPrice) return false;

        return true;
      });
    }

    const getFinalPrice = (p: IProduct) =>
      p.discountPrice && p.discountPrice > 0 ? p.discountPrice : p.basePrice;

    switch (filters.sort) {
      case ESort.PRICE_LOW:
        result.sort((a, b) => getFinalPrice(a) - getFinalPrice(b));
        break;

      case ESort.PRICE_HIGH:
        result.sort((a, b) => getFinalPrice(b) - getFinalPrice(a));
        break;

      case ESort.STOCK_LOW:
        result.sort((a, b) => a.stockUnits - b.stockUnits);
        break;

      case ESort.STOCK_HIGH:
        result.sort((a, b) => b.stockUnits - a.stockUnits);
        break;

      case ESort.NAME_ASC:
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;

      case ESort.NAME_DESC:
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;

      case ESort.NEWEST:
      default:
        result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
    }

    return result;
  }, [products, search, filters]);

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
        categoryId: fullProduct.category?.id || "",
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

  const handleDelete = (id: string) => {
    setDeleteProductId(id);
  };

  const confirmDelete = async () => {
    if (!deleteProductId) return;

    try {
      setIsDeleting(true);

      await deleteProduct(deleteProductId);

      setProducts((prev) => prev.filter((p) => p.id !== deleteProductId));

      setDeleteProductId(null);
    } catch (error) {
      console.error("Delete failed:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const cancelDelete = () => {
    setDeleteProductId(null);
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
        console.log("Submitting data:", formData);
        await createProduct({
          ...formData,
          tags: Array.isArray(formData.tags)
            ? formData.tags
            : formData.tags
              ? [formData.tags]
              : [],
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
    filters,
    viewMode,
    selectedProduct,
    editingProduct,
    formData,
    tagInput,
    errors,
    deleteProductId,
    isDeleting,

    setSearch,
    setFilters,
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

    confirmDelete,
    cancelDelete,
  };
}
