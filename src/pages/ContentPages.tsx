import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import { mockPages } from "@/data/mockData";
import { TPage, TPageStatus } from "@/types";

import { SearchInput } from "@/components/common/SearchInput";
import { ContentsTable } from "@/components/system/contents/ContentsTable";
import { ContentsEditorDialog } from "@/components/system/contents/ContentsEditorDialog";
import { ContentPagesHeader } from "@/components/system/contents/ContentPagesHeader";

export default function ContentPagesPage() {
  const [pages, setPages] = useState<TPage[]>(mockPages);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
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
    setDialogOpen(true);
  };

  const handleEdit = (page: TPage) => {
    setEditingPage(page);
    setFormData({
      title: page.title,
      slug: page.slug,
      content: page.content ?? "",
      status: page.status,
    });
    setDialogOpen(true);
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

    setDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <ContentPagesHeader />

      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search by title or slug..."
        />

        <Button onClick={handleAdd}>
          <Plus className="h-4 w-4 mr-2" />
          Create Page
        </Button>
      </div>

      <div className="bg-card rounded-lg border">
        <div className="overflow-x-auto">
          <ContentsTable
            pages={filteredPages}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>

      <ContentsEditorDialog
        open={dialogOpen}
        editingPage={editingPage}
        formData={formData}
        onChange={setFormData}
        onClose={() => setDialogOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
