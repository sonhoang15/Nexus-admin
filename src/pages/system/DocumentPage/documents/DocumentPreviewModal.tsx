import { X, Download, FileText, File } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IDocument } from "@/types";
import { API_BASE } from "@/utils/productHelpers";

interface Props {
  document: IDocument | null;
  open: boolean;
  onClose: () => void;
}

const buildUrl = (path?: string) => {
  if (!path) return "";

  if (path.startsWith("http")) return path;

  return `${API_BASE}${path}`;
};

export default function DocumentPreviewModal({
  document,
  open,
  onClose,
}: Props) {
  if (!open || !document) return null;

  const fileType = document.fileType?.toUpperCase() || "";

  const isPdf = fileType === "PDF";
  const isImage = ["JPG", "JPEG", "PNG", "JFIF", "WEBP"].includes(fileType);
  const isOffice = ["DOC", "DOCX", "XLS", "XLSX"].includes(fileType);

  const previewUrl = buildUrl(document.previewUrl || document.url);

  const fileUrl = buildUrl(document.downloadUrl || document.url);

  const downloadUrl = buildUrl(document.downloadUrl || document.url);
  const renderPreview = () => {
    if (isImage && fileUrl) {
      return (
        <img
          src={fileUrl}
          alt={document.title}
          className="max-h-full max-w-full mx-auto object-contain"
        />
      );
    }

    if (isPdf && previewUrl) {
      return (
        <iframe
          src={previewUrl}
          className="w-full h-full"
          title="PDF Preview"
        />
      );
    }

    if (isOffice && fileUrl) {
      return (
        <iframe
          src={`https://docs.google.com/gview?url=${encodeURIComponent(
            fileUrl,
          )}&embedded=true`}
          className="w-full h-full"
          title="Office Preview"
        />
      );
    }

    return (
      <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
        <File className="h-12 w-12 mb-4" />
        <p>Preview not available for this file type.</p>
        {downloadUrl && (
          <Button
            className="mt-4"
            onClick={() => window.open(downloadUrl, "_blank")}
          >
            Download File
          </Button>
        )}
      </div>
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="w-[95%] max-w-6xl h-[90vh] bg-background rounded-3xl shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-8 py-6 border-b">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-muted">
              {isPdf ? (
                <FileText className="h-6 w-6 text-destructive" />
              ) : (
                <File className="h-6 w-6 text-primary" />
              )}
            </div>

            <div>
              <h2 className="text-lg font-semibold">{document.title}</h2>
              <p className="text-sm text-muted-foreground">
                {fileType} • {document.fileSizeFormatted} •{" "}
                {document.owner?.fullName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {downloadUrl && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => window.open(downloadUrl, "_blank")}
              >
                <Download className="h-4 w-4" />
              </Button>
            )}

            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="bg-destructive text-white hover:bg-destructive/80"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex-1 bg-muted/30 p-6 overflow-auto">
          <div className="w-full h-full bg-card rounded-2xl shadow-inner overflow-hidden flex items-center justify-center">
            {renderPreview()}
          </div>
        </div>

        <div className="px-8 py-4 border-t flex justify-between text-xs text-muted-foreground">
          <div>SYSTEM: NEXUS CLOUD STORAGE • REGION: US-EAST-1</div>
          <div className="font-semibold text-indigo-600 tracking-wide">
            CONFIDENTIAL • ENTERPRISE ONLY
          </div>
        </div>
      </div>
    </div>
  );
}
