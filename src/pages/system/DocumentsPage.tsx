import { DocumentsHeader } from "@/components/system/documents/DocumentsHeader";
import { DocumentsTable } from "@/components/system/documents/DocumentsTable";
import { UploadDocumentForm } from "@/components/system/documents/UploadDocumentForm";
import { useDocuments } from "@/hooks/useDocuments";
import DocumentPreviewModal from "@/components/system/documents/DocumentPreviewModal";
import { ConfirmDeleteModal } from "@/components/common/ConfirmDeleteModal";

export default function DocumentsPage() {
  const {
    documents,
    viewMode,
    formData,
    deleteDocumentId,
    isDeleting,
    selectedDocument,
    setFormData,
    handleUpload,
    handleDelete,
    handleSubmit,
    handleClose,
    handleView,
    handleDownload,

    confirmDelete,
    cancelDelete,
  } = useDocuments();

  return (
    <div className="space-y-6">
      <DocumentsHeader onUpload={handleUpload} />

      {viewMode === "table" && (
        <DocumentsTable
          documents={documents}
          onDelete={handleDelete}
          onView={handleView}
          onDownload={handleDownload}
        />
      )}

      {viewMode === "form" && (
        <UploadDocumentForm
          open={viewMode === "form"}
          formData={formData}
          onChange={setFormData}
          onSubmit={handleSubmit}
          onClose={handleClose}
        />
      )}
      {viewMode === "preview" && (
        <DocumentPreviewModal
          document={selectedDocument}
          open={viewMode === "preview"}
          onClose={handleClose}
        />
      )}

      <ConfirmDeleteModal
        open={!!deleteDocumentId}
        loading={isDeleting}
        entityName="document"
        itemName={documents.find((d) => d.id === deleteDocumentId)?.title}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
}
