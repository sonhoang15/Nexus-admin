import { useEffect, useMemo, useState } from "react";
import { pageService } from "@/services/PagesService";
import { IPage, TPageStatus, ICreatePageDto, IUpdatePageDto } from "@/types";

type ViewMode = "table" | "form";

const mapToIPage = (data: any): IPage => ({
  id: String(data.id),
  title: data.title,
  slug: data.slug,
  content: data.content,
  status: data.status,
  featuredImage: data.thumbnail,
  createdAt: data.createdAt,
  updatedAt: data.updatedAt,
});

export const useContentPages = () => {
  const [pages, setPages] = useState<IPage[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("table");
  const [editingPage, setEditingPage] = useState<IPage | null>(null);

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

  // =============================
  // Load data
  // =============================
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

  // =============================
  // Filter
  // =============================
  const filteredPages = useMemo(() => {
    const q = search.toLowerCase();
    return pages.filter(
      (p) =>
        p.title.toLowerCase().includes(q) || p.slug.toLowerCase().includes(q),
    );
  }, [pages, search]);

  // =============================
  // Actions
  // =============================
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

  const handleEdit = (page: IPage) => {
    setEditingPage(page);
    setFormData({
      title: page.title,
      slug: page.slug,
      content: page.content ?? "",
      status: page.status,
    });
    setViewMode("form");
  };

  const handleDelete = async (id: string) => {
    await pageService.delete(Number(id));
    setPages((prev) => prev.filter((p) => p.id !== id));
  };

  const handleSubmit = async () => {
    try {
      if (editingPage) {
        const payload: IUpdatePageDto = {
          title: formData.title,
          slug: formData.slug,
          content: formData.content,
          status: formData.status,
          featuredImage: formData.featuredImage,
        };

        const updated = await pageService.update(
          Number(editingPage.id),
          payload as any, // do service đang nhận PagePayload
        );

        setPages((prev) =>
          prev.map((p) => (p.id === editingPage.id ? mapToIPage(updated) : p)),
        );
      } else {
        const payload: ICreatePageDto = {
          title: formData.title,
          slug: formData.slug,
          content: formData.content,
          status: formData.status,
          featuredImage: formData.featuredImage,
        };

        const created = await pageService.create(payload as any);

        setPages((prev) => [...prev, mapToIPage(created)]);
      }

      setEditingPage(null);
      setViewMode("table");
    } catch (error) {
      console.error(error);
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

    setSearch,
    setFormData,

    handleAdd,
    handleEdit,
    handleDelete,
    handleSubmit,
    handleCancel,
  };
};
