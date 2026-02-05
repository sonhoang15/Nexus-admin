import { useState } from "react";
import { mockDocuments } from "@/data/mockData";
import { TDocument } from "@/types";
import { DocumentsHeader } from "@/components/system/documents/DocumentsHeader";
import { DocumentsTable } from "@/components/system/documents/DocumentsTable";
import { UploadDocumentDialog } from "@/components/system/documents/UploadDocumentDialog";

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<TDocument[]>(mockDocuments);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState<{
    title: string;
    file: File | null;
  }>({
    title: "",
    file: null,
  });

  const handleUpload = () => {
    setFormData({ title: "", file: null });
    setDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setDocuments(documents.filter((d) => d.id !== id));
  };

  const handleSubmit = () => {
    if (!formData.file) return;

    const newDocument: TDocument = {
      id: Date.now().toString(),
      title: formData.title || formData.file.name.replace(/\.[^/.]+$/, ""),
      fileName: formData.file.name,
      fileType: formData.file.name.split(".").pop()?.toUpperCase() || "FILE",
      size: `${(formData.file.size / (1024 * 1024)).toFixed(1)} MB`,
      owner: "Current User",
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
    };

    setDocuments([...documents, newDocument]);
    setDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <DocumentsHeader onUpload={handleUpload} />

      <DocumentsTable documents={documents} onDelete={handleDelete} />

      <UploadDocumentDialog
        open={dialogOpen}
        formData={formData}
        onChange={setFormData}
        onClose={() => setDialogOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
