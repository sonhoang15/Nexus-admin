import { DocumentsHeader } from "@/pages/system/DocumentPage/documents/DocumentsHeader";
import { DocumentsTable } from "@/pages/system/DocumentPage/documents/DocumentsTable";
import { UploadDocumentForm } from "@/pages/system/DocumentPage/documents/UploadDocumentForm";
import { useDocuments } from "@/hooks/useDocuments";
import DocumentPreviewModal from "@/pages/system/DocumentPage/documents/DocumentPreviewModal";
import { ConfirmDeleteModal } from "@/components/common/ConfirmDeleteModal";
import { Loading } from "@/components/common/Loading";

export default function DocumentsPage() {
  const {
    documents,
    viewMode,
    formData,
    deleteDocumentId,
    isDeleting,
    selectedDocument,
    documentsLoading,
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
        <>
          {documentsLoading ? (
            <Loading />
          ) : documents.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              No documents found.
            </div>
          ) : (
            <DocumentsTable
              documents={documents}
              onDelete={handleDelete}
              onView={handleView}
              onDownload={handleDownload}
            />
          )}
        </>
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
