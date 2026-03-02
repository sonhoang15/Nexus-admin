import { ContentsTable } from "@/pages/system/ContentPage/contents/ContentsTable";
import { ContentsEditor } from "@/pages/system/ContentPage/contents/ContentsForm";
import { ContentPagesHeader } from "@/pages/system/ContentPage/contents/ContentPagesHeader";
import { ContentToolbar } from "@/pages/system/ContentPage/contents/ContentToolbar";
import { useContentPages } from "@/hooks/useContentPages";
import { ConfirmDeleteModal } from "@/components/common/ConfirmDeleteModal";

export default function ContentPagesPage() {
  const {
    pages,
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

      <ConfirmDeleteModal
        open={!!deletingPage}
        loading={isDeleting}
        entityName="page"
        itemName={deletingPage?.title}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
}
