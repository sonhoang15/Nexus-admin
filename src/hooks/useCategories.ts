import { useEffect, useState } from "react";
import {
  getCategoriesService,
  createCategoryService,
  updateCategoryService,
  deleteCategoryService,
} from "@/services/categories.Service";
import { ICategory } from "@/types/category";
import { toast } from "sonner";

type ViewMode = "table" | "form";

export const useCategories = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [search, setSearch] = useState<string>("");
  const [viewMode, setViewMode] = useState<ViewMode>("table");
  const [editingCategory, setEditingCategory] = useState<ICategory | null>(
    null,
  );
  const [deleteCategoryId, setDeleteCategoryId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [categoriesLoading, setCategoriesLoading] = useState<boolean>(false);

  const [formData, setFormData] = useState<{
    name: string;
    description: string;
  }>({
    name: "",
    description: "",
  });

  const fetchCategories = async () => {
    try {
      setCategoriesLoading(true);
      const data = await getCategoriesService();
      setCategories(data);
    } catch (error) {
      console.error("Fetch categories failed:", error);
    } finally {
      setCategoriesLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const filteredCategories = categories.filter((category) => {
    const keyword = search.trim().toLowerCase();
    if (!keyword) return true;

    return [category.name, category.description]
      .filter(Boolean)
      .some((field) => field!.toLowerCase().includes(keyword));
  });

  const handleAdd = () => {
    setEditingCategory(null);
    setFormData({ name: "", description: "" });
    setViewMode("form");
  };

  const handleEdit = (category: ICategory) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description || "",
    });
    setViewMode("form");
  };

  const handleDelete = (id: string) => {
    setDeleteCategoryId(id);
  };

  const confirmDelete = async () => {
    if (!deleteCategoryId) return;

    try {
      setIsDeleting(true);
      await deleteCategoryService(deleteCategoryId);

      setCategories((prev) => prev.filter((c) => c.id !== deleteCategoryId));
      toast.success("Delete category successfully");
    } catch (error) {
      toast.error("Delete failed");
    } finally {
      setIsDeleting(false);
      setDeleteCategoryId(null);
    }
  };
  const cancelDelete = () => {
    setDeleteCategoryId(null);
  };

  const handleSubmit = async () => {
    try {
      if (editingCategory) {
        await updateCategoryService(editingCategory.id, formData);

        setCategories((prev) =>
          prev.map((c) =>
            c.id === editingCategory.id ? { ...c, ...formData } : c,
          ),
        );
        toast.success("Update category successfully");
      } else {
        const res = await createCategoryService(formData);

        if (res) {
          setCategories((prev) => [res, ...prev]);
        } else {
          await fetchCategories();
        }
        toast.success("Create category successfully");
      }

      setEditingCategory(null);
      setFormData({ name: "", description: "" });
      setViewMode("table");
    } catch (error) {
      console.error("Submit category failed:", error);
    }
  };

  const handleCancel = () => {
    setEditingCategory(null);
    setFormData({ name: "", description: "" });
    setViewMode("table");
  };

  return {
    categories: filteredCategories,
    search,
    viewMode,
    editingCategory,
    formData,
    isDeleting,
    deleteCategoryId,
    categoriesLoading,

    setSearch,
    setFormData,

    confirmDelete,
    cancelDelete,

    handleAdd,
    handleEdit,
    handleDelete,
    handleSubmit,
    handleCancel,
    refetch: fetchCategories,
  };
};
