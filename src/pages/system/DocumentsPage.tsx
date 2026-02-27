import { DocumentsHeader } from "@/components/system/documents/DocumentsHeader";
import { DocumentsTable } from "@/components/system/documents/DocumentsTable";
import { UploadDocumentForm } from "@/components/system/documents/UploadDocumentForm";
import { useDocuments } from "@/hooks/useDocuments";
import DocumentPreviewModal from "@/components/system/documents/DocumentPreviewModal";

export default function DocumentsPage() {
  const {
    documents,
    viewMode,
    formData,
    selectedDocument,
    setFormData,
    handleUpload,
    handleDelete,
    handleSubmit,
    handleClose,
    handleView,
    handleDownload,
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
    </div>
  );
}
