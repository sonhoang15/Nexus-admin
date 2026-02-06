import { useMemo, useState } from "react";
import { mockPages } from "@/data/mockData";
import { TPage, TPageStatus } from "@/types";

type ViewMode = "table" | "form";

export const useContentPages = () => {
  const [pages, setPages] = useState<TPage[]>(mockPages);
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("table");
  const [editingPage, setEditingPage] = useState<TPage | null>(null);

  const [formData, setFormData] = useState<{
    title: string;
    slug: string;
    content: string;
    status: TPageStatus;
  }>({
    title: "",
    slug: "",
    content: "",
    status: "DRAFT",
  });

  const filteredPages = useMemo(() => {
    const q = search.toLowerCase();
    return pages.filter(
      (p) =>
        p.title.toLowerCase().includes(q) || p.slug.toLowerCase().includes(q),
    );
  }, [pages, search]);

  const handleAdd = () => {
    setEditingPage(null);
    setFormData({
      title: "",
      slug: "",
      content: "",
      status: "DRAFT",
    });
    setViewMode("form");
  };

  const handleEdit = (page: TPage) => {
    setEditingPage(page);
    setFormData({
      title: page.title,
      slug: page.slug,
      content: page.content ?? "",
      status: page.status,
    });
    setViewMode("form");
  };

  const handleDelete = (id: string) => {
    setPages((prev) => prev.filter((p) => p.id !== id));
  };

  const handleSubmit = () => {
    const today = new Date().toISOString().split("T")[0];

    if (editingPage) {
      setPages((prev) =>
        prev.map((p) =>
          p.id === editingPage.id ? { ...p, ...formData, updatedAt: today } : p,
        ),
      );
    } else {
      const newPage: TPage = {
        id: Date.now().toString(),
        ...formData,
        slug:
          formData.slug || formData.title.toLowerCase().replace(/\s+/g, "-"),
        createdAt: today,
        updatedAt: today,
      };
      setPages((prev) => [...prev, newPage]);
    }

    setEditingPage(null);
    setViewMode("table");
  };

  const handleCancel = () => {
    setEditingPage(null);
    setViewMode("table");
  };

  return {
    pages: filteredPages,
    search,
    viewMode,
    editingPage,
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
