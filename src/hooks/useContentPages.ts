import { useEffect, useMemo, useState } from "react";
import { pageService } from "@/services/PagesService";
import { IPage, TPageStatus } from "@/types";

type ViewMode = "table" | "form";

const mapToIPage = (data: any): IPage => ({
  id: data.id,
  title: data.title,
  slug: data.slug,
  content: data.content ?? "",
  status: data.status,
  featuredImage: data.featuredImage ?? undefined,
  createdAt: data.createdAt,
  updatedAt: data.updatedAt ?? data.createdAt,
});

export const useContentPages = () => {
  const [pages, setPages] = useState<IPage[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("table");
  const [editingPage, setEditingPage] = useState<IPage | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState<{
    title: string;
    slug: string;
    content: string;
    status: TPageStatus;
    featuredImage?: File;
  }>({
    title: "",
    slug: "",
    content: "",
    status: "DRAFT",
  });

  const fetchPages = async () => {
    try {
      setLoading(true);
      const res = await pageService.getAll();
      setPages(res.map(mapToIPage));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

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

  const handleEdit = async (page: IPage) => {
    try {
      const detail = await pageService.getById(page.id);

      setEditingPage(detail);

      setFormData({
        title: detail.title,
        slug: detail.slug,
        content: detail.content ?? "",
        status: detail.status,
      });

      setViewMode("form");
    } catch (error) {
      console.error("Failed to fetch page detail:", error);
    }
  };
  const handleDelete = async (id: string) => {
    await pageService.delete(id);
    setPages((prev) => prev.filter((p) => p.id !== id));
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);

      if (editingPage) {
        const updated = await pageService.update(editingPage.id, {
          ...formData,
        });

        setPages((prev) =>
          prev.map((p) => (p.id === editingPage.id ? mapToIPage(updated) : p)),
        );
      } else {
        const created = await pageService.create({
          ...formData,
        });

        setPages((prev) => [...prev, mapToIPage(created)]);
      }

      setEditingPage(null);
      setViewMode("table");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    setEditingPage(null);
    setViewMode("table");
  };

  return {
    pages: filteredPages,
    loading,
    search,
    viewMode,
    editingPage,
    formData,
    submitting,

    setSearch,
    setFormData,

    handleAdd,
    handleEdit,
    handleDelete,
    handleSubmit,
    handleCancel,
  };
};
