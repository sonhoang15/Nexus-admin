import { useState } from "react";
import { mockCategories } from "@/data/mockData";
import { TCategory } from "@/types";

type ViewMode = "table" | "form";

export const useCategories = () => {
  const [categories, setCategories] = useState<TCategory[]>(mockCategories);
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("table");

  const [editingCategory, setEditingCategory] = useState<TCategory | null>(
    null,
  );

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(search.toLowerCase()),
  );
  const handleAdd = () => {
    setEditingCategory(null);
    setFormData({ name: "", description: "" });
    setViewMode("form");
  };
  const handleEdit = (category: TCategory) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description || "",
    });
    setViewMode("form");
  };

  const handleDelete = (id: string) => {
    setCategories(categories.filter((c) => c.id !== id));
  };

  const handleSubmit = () => {
    if (editingCategory) {
      setCategories(
        categories.map((c) =>
          c.id === editingCategory.id ? { ...c, ...formData } : c,
        ),
      );
    } else {
      const newCategory: TCategory = {
        id: Date.now().toString(),
        ...formData,
        productCount: 0,
        createdAt: new Date().toISOString().split("T")[0],
      };
      setCategories([...categories, newCategory]);
    }

    setEditingCategory(null);
    setFormData({ name: "", description: "" });
    setViewMode("table");
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

    setSearch,
    setFormData,

    handleAdd,
    handleEdit,
    handleDelete,
    handleSubmit,
    handleCancel,
  };
};
