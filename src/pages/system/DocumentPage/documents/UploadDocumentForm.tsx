import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload, Info } from "lucide-react";

interface IUploadDocumentFormProps {
  open: boolean;
  isEditing?: boolean;
  submitting?: boolean;

  formData: {
    title: string;
    file: File | null;
  };

  existingFileName?: string;

  onChange: (data: { title: string; file: File | null }) => void;
  onClose: () => void;
  onSubmit: () => void;
}

export function UploadDocumentForm({
  open,
  isEditing = false,
  submitting = false,
  formData,
  existingFileName,
  onChange,
  onClose,
  onSubmit,
}: IUploadDocumentFormProps) {
  if (!open) return null;

  return (
    <div className="max-w-xl mx-auto bg-white rounded-2xl border shadow-md shadow-black/10 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          {isEditing ? "Update Document" : "Upload New Document"}
        </h2>

        <Button
          onClick={onClose}
          className="text-white bg-red-500 hover:bg-red-700"
        >
          ✕
        </Button>
      </div>

      <div className="flex gap-3 rounded-xl bg-indigo-50 p-4 text-sm text-indigo-700">
        <Info className="h-5 w-5 mt-0.5" />
        <div>
          <div>Supported formats: PDF, DOCX, XLSX, JPG</div>
          <div>Maximum file size: 5MB</div>
        </div>
      </div>

      <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-muted p-8 text-center hover:bg-muted/30 transition">
        <Upload className="h-8 w-8 text-indigo-500 mb-2" />
        <p className="font-medium">
          {isEditing ? "Replace file (optional)" : "Click to select file"}
        </p>
        <p className="text-sm text-muted-foreground">or drag and drop here</p>

        <input
          type="file"
          className="hidden"
          onChange={(e) =>
            onChange({
              ...formData,
              file: e.target.files?.[0] || null,
            })
          }
        />
      </label>

      {formData.file && (
        <p className="text-sm text-muted-foreground">
          Selected file: <strong>{formData.file.name}</strong>
        </p>
      )}

      {!formData.file && isEditing && existingFileName && (
        <p className="text-sm text-muted-foreground">
          Current file: <strong>{existingFileName}</strong>
        </p>
      )}

      <div className="space-y-1">
        <Label>Document Title *</Label>
        <Input
          value={formData.title}
          onChange={(e) => onChange({ ...formData, title: e.target.value })}
          placeholder="e.g. Q4 Financial Report"
        />
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button
          variant="outline"
          onClick={onClose}
          className="bg-red-500 text-white hover:bg-red-700"
        >
          Cancel
        </Button>

        <Button
          onClick={onSubmit}
          disabled={submitting}
          className="bg-yellow-500 text-white hover:bg-yellow-700"
        >
          {submitting
            ? "Saving..."
            : isEditing
              ? "Update Document"
              : "Upload Document"}
        </Button>
      </div>
    </div>
  );
}
