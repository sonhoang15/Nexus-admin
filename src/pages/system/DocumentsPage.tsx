import { DocumentsHeader } from "@/components/system/documents/DocumentsHeader";
import { DocumentsTable } from "@/components/system/documents/DocumentsTable";
import { UploadDocumentForm } from "@/components/system/documents/UploadDocumentForm";
import { useDocuments } from "@/hooks/useDocuments";

export default function DocumentsPage() {
  const {
    documents,
    viewMode,
    formData,
    setFormData,
    handleUpload,
    handleDelete,
    handleSubmit,
    handleClose,
  } = useDocuments();

  return (
    <div className="space-y-6">
      <DocumentsHeader onUpload={handleUpload} />

      {viewMode === "table" && (
        <DocumentsTable documents={documents} onDelete={handleDelete} />
      )}

      {viewMode === "form" && (
        <UploadDocumentForm
          formData={formData}
          onChange={setFormData}
          onSubmit={handleSubmit}
          onClose={handleClose}
        />
      )}
    </div>
  );
}
