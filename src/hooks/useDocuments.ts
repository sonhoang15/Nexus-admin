import { useState } from "react";
import { mockDocuments } from "@/data/mockData";
import { TDocument } from "@/types";

type ViewMode = "table" | "form";

export function useDocuments() {
  const [documents, setDocuments] = useState<TDocument[]>(mockDocuments);
  const [viewMode, setViewMode] = useState<ViewMode>("table");

  const [formData, setFormData] = useState<{
    title: string;
    file: File | null;
  }>({
    title: "",
    file: null,
  });

  const handleUpload = () => {
    setFormData({ title: "", file: null });
    setViewMode("form");
  };

  const handleDelete = (id: string) => {
    setDocuments((prev) => prev.filter((d) => d.id !== id));
  };

  const handleSubmit = () => {
    if (!formData.file) return;

    const today = new Date().toISOString().split("T")[0];

    const newDocument: TDocument = {
      id: Date.now().toString(),
      title: formData.title || formData.file.name.replace(/\.[^/.]+$/, ""),
      fileName: formData.file.name,
      fileType: formData.file.name.split(".").pop()?.toUpperCase() || "FILE",
      size: `${(formData.file.size / (1024 * 1024)).toFixed(1)} MB`,
      owner: "Current User",
      createdAt: today,
      updatedAt: today,
    };

    setDocuments((prev) => [...prev, newDocument]);
    setViewMode("table");
  };

  const handleClose = () => {
    setFormData({ title: "", file: null });
    setViewMode("table");
  };

  return {
    documents,
    viewMode,
    formData,

    setFormData,

    handleUpload,
    handleDelete,
    handleSubmit,
    handleClose,
  };
}
