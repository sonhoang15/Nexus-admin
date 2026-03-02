import { useEffect, useState } from "react";
import { documentService } from "@/services/document.Service";
import { IDocument } from "@/types";

type ViewMode = "table" | "form" | "preview";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "image/jpeg",
  "image/jpg",
  "image/png",
];

export function useDocuments() {
  const [documents, setDocuments] = useState<IDocument[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>("table");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<IDocument | null>(
    null,
  );

  const [formData, setFormData] = useState<{
    title: string;
    file: File | null;
  }>({
    title: "",
    file: null,
  });

  const [deleteDocumentId, setDeleteDocumentId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [documentsLoading, setDocumentsLoading] = useState<boolean>(false);

  const formatSize = (bytes: number) => {
    if (!bytes) return "0 B";

    if (bytes < 1024) {
      return `${bytes} B`;
    }

    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const formatDate = (iso: string) => (iso ? iso.split("T")[0] : "");

  const mapToDocument = (doc: any): IDocument => ({
    id: doc.id,
    title: doc.title ?? "",
    fileName: doc.fileName,
    fileType: doc.fileType,
    fileSize: doc.fileSize,
    fileSizeFormatted: formatSize(doc.fileSize),
    owner: doc.owner?.fullName ?? "You",
    createdAt: formatDate(doc.createdAt),
    updatedAt: formatDate(doc.updatedAt ?? doc.createdAt),
    url: doc.url,

    previewUrl: doc.previewUrl,
    downloadUrl: doc.downloadUrl,
    fileUrl: doc.fileUrl,
  });

  const validate = (): string | null => {
    if (!formData.file) return "File is required";

    if (formData.file) {
      if (!ALLOWED_TYPES.includes(formData.file.type))
        return "Invalid file type";

      if (formData.file.size > MAX_FILE_SIZE) return "File must be under 5MB";
    }

    return null;
  };

  const fetchDocuments = async () => {
    try {
      setDocumentsLoading(true);
      setError(null);

      const res = await documentService.getAll();
      setDocuments(res.map(mapToDocument));
    } catch (err) {
      console.error("Failed to fetch documents:", err);
      setDocuments([]);
      setError("Failed to load documents");
    } finally {
      setDocumentsLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleView = async (doc: IDocument) => {
    try {
      setLoading(true);
      setError(null);

      const fullDoc = await documentService.preview(doc.id);

      setSelectedDocument(mapToDocument(fullDoc));
      setViewMode("preview");
    } catch (err) {
      setError("Failed to load document");
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = () => {
    setFormData({ title: "", file: null });
    setViewMode("form");
  };

  const handleSubmit = async () => {
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const title =
        formData.title || formData.file!.name.replace(/\.[^/.]+$/, "");

      const created = await documentService.create({
        file: formData.file!,
        title,
      });

      setDocuments((prev) => [...prev, mapToDocument(created)]);

      setViewMode("table");
      setFormData({ title: "", file: null });
    } catch (err) {
      console.error("Upload failed:", err);
      setError("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (doc: IDocument) => {
    try {
      const blob = await documentService.download(doc.id);

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = doc.fileName;

      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError("Download failed");
    }
  };

  const handleDelete = (doc: IDocument) => {
    setDeleteDocumentId(doc.id);
  };
  const confirmDelete = async () => {
    if (!deleteDocumentId) return;

    try {
      setIsDeleting(true);

      await documentService.delete(deleteDocumentId);

      setDocuments((prev) => prev.filter((doc) => doc.id !== deleteDocumentId));

      setDeleteDocumentId(null);
    } catch (error) {
      console.error("Delete failed:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const cancelDelete = () => {
    setDeleteDocumentId(null);
  };

  const handleClose = () => {
    setSelectedDocument(null);
    setFormData({ title: "", file: null });
    setViewMode("table");
    setError(null);
  };

  return {
    documents,
    loading,
    viewMode,
    formData,
    error,
    selectedDocument,
    documentsLoading,
    deleteDocumentId,
    isDeleting,
    setFormData,

    handleUpload,
    handleSubmit,
    handleClose,
    handleDelete,

    confirmDelete,
    cancelDelete,

    handleView,
    handleDownload,
    refetch: fetchDocuments,
  };
}
