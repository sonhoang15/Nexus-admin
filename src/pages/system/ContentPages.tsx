import { ContentsTable } from "@/components/system/contents/ContentsTable";
import { ContentsEditor } from "@/components/system/contents/ContentsForm";
import { ContentPagesHeader } from "@/components/system/contents/ContentPagesHeader";
import { ContentToolbar } from "@/components/system/contents/ContentToolbar";
import { useContentPages } from "@/hooks/useContentPages";

export default function ContentPagesPage() {
  const {
    pages,
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
  } = useContentPages();

  return (
    <div className="space-y-6">
      <ContentPagesHeader />

      {viewMode === "table" && (
        <>
          <ContentToolbar
            search={search}
            onSearchChange={setSearch}
            handleAdd={handleAdd}
          />

          <div className="bg-card rounded-lg border">
            <div className="overflow-x-auto">
              <ContentsTable
                pages={pages}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </div>
          </div>
        </>
      )}

      <ContentsEditor
        open={viewMode === "form"}
        editingPage={editingPage}
        formData={formData}
        onChange={setFormData}
        onSubmit={handleSubmit}
        submitting={submitting}
        onClose={handleCancel}
      />
    </div>
  );
}
