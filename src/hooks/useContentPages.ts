import { useEffect, useMemo, useState } from "react";
import {
  getPagesService,
  getPageByIdService,
  createPageService,
  updatePageService,
  deletePageService,
} from "@/services/PagesService";
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
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [viewMode, setViewMode] = useState<ViewMode>("table");
  const [editingPage, setEditingPage] = useState<IPage | null>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);

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

  const [deletingPage, setDeletingPage] = useState<IPage | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const fetchPages = async () => {
    try {
      setLoading(true);
      const res = await getPagesService();
      setPages(res.map(mapToIPage));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const filteredPages = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    if (!keyword) return pages;

    return pages.filter((p) =>
      [p.title, p.slug]
        .filter(Boolean)
        .some((field) => field!.toLowerCase().includes(keyword)),
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

  useEffect(() => {
    if (!editingPage) {
      const generatedSlug = formData.title
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");

      setFormData((prev) => ({
        ...prev,
        slug: generatedSlug,
      }));
    }
  }, [formData.title, editingPage]);

  const handleEdit = async (page: IPage) => {
    try {
      const detail = await getPageByIdService(page.id);

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

  const handleDelete = (id: string) => {
    setDeletingPage(pages.find((p) => p.id === id) || null);
  };

  const confirmDelete = async () => {
    if (!deletingPage) return;

    try {
      setIsDeleting(true);

      await deletePageService(deletingPage.id);

      setPages((prev) => prev.filter((p) => p.id !== deletingPage.id));

      setDeletingPage(null);
    } catch (error) {
      console.error("Delete failed:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const cancelDelete = () => {
    setDeletingPage(null);
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);

      if (editingPage) {
        const updated = await updatePageService(editingPage.id, {
          ...formData,
        });

        setPages((prev) =>
          prev.map((p) => (p.id === editingPage.id ? mapToIPage(updated) : p)),
        );
      } else {
        const created = await createPageService({
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
    deletingPage,
    isDeleting,

    setSearch,
    setFormData,

    handleAdd,
    handleEdit,
    handleDelete,
    handleSubmit,
    handleCancel,
    confirmDelete,
    cancelDelete,
  };
};
