import { IPage, TPageStatus } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/libs/utils";
import { X, FileText, Image as ImageIcon, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { API_BASE } from "@/utils/productHelpers";

type Props = {
  open: boolean;
  editingPage: IPage | null;
  formData: {
    title: string;
    slug: string;
    content: string;
    status: TPageStatus;
    featuredImage?: File;
  };
  featuredImageUrl?: string;
  onClose: () => void;
  onChange: (data: Props["formData"]) => void;
  onSubmit: () => void;
  submitting?: boolean;
};

export function ContentsEditor({
  open,
  editingPage,
  formData,
  onClose,
  onChange,
  onSubmit,
  submitting = false,
}: Props) {
  if (!open) return null;
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (formData.featuredImage) {
      const url = URL.createObjectURL(formData.featuredImage);
      setPreview(url);

      return () => URL.revokeObjectURL(url);
    }
  }, [formData.featuredImage]);

  useEffect(() => {
    if (editingPage?.featuredImage) {
      setPreview(`${API_BASE}${editingPage.featuredImage}`);
    }
  }, [editingPage]);

  return (
    <div className="rounded-2xl border bg-background shadow-md shadow-black/10">
      <div className="flex items-start justify-between px-6 py-5 border-b">
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <FileText className="w-5 h-5 text-primary" />
          </div>

          <div>
            <h2 className="text-lg font-semibold">
              {editingPage ? "Edit Page" : "Create New Page"}
            </h2>
            <p className="text-sm text-muted-foreground">
              Design and publish custom HTML pages for your platform.
            </p>
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className=" bg-red-500 hover:bg-red-700"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 px-6 py-6">
        <div className="space-y-4">
          <div>
            <Label>Page title</Label>
            <Input
              value={formData.title}
              onChange={(e) => onChange({ ...formData, title: e.target.value })}
            />
          </div>

          <div>
            <Label>Content</Label>
            <Textarea
              value={formData.content}
              onChange={(e) =>
                onChange({ ...formData, content: e.target.value })
              }
              className="min-h-[420px]"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-xl border p-4 space-y-4">
            <Label>Status</Label>

            <div className="flex gap-2">
              {(["PUBLISHED", "DRAFT"] as TPageStatus[]).map((s) => (
                <Button
                  key={s}
                  size="sm"
                  variant={formData.status === s ? "default" : "outline"}
                  className={cn(
                    formData.status === s &&
                      s === "PUBLISHED" &&
                      "!bg-success !text-white !border-success !hover:bg-success",

                    formData.status === s &&
                      s === "DRAFT" &&
                      "!bg-slate-600 !text-white !border-slate-600 !hover:bg-slate-600/80",
                  )}
                  onClick={() => onChange({ ...formData, status: s })}
                >
                  {s === "PUBLISHED" ? "Published" : "Draft"}
                </Button>
              ))}
            </div>

            <div className="pt-2 text-sm text-muted-foreground space-y-1">
              <div className="flex justify-between">
                <span>Created at</span>
                <span>Now</span>
              </div>
              <div className="flex justify-between">
                <span>Last modified</span>
                <span>Now</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border p-4 space-y-3">
            <Label className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide">
              <ImageIcon className="w-4 h-4 text-primary" />
              Featured Image
            </Label>

            <input
              type="file"
              accept="image/*"
              id="featuredImage"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  onChange({ ...formData, featuredImage: file });
                }
              }}
            />

            <label htmlFor="featuredImage" className="block cursor-pointer">
              {preview ? (
                <div className="relative group">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-xl"
                  />

                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition rounded-xl flex items-center justify-center text-white text-sm">
                    Click to change image
                  </div>
                </div>
              ) : (
                <div className="h-48 rounded-xl border border-dashed flex flex-col items-center justify-center gap-2 text-sm text-muted-foreground hover:bg-muted transition">
                  <Upload className="w-6 h-6" />
                  <span>Click to upload image</span>
                </div>
              )}
            </label>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 px-6 py-4 border-t bg-muted/40">
        <Button
          variant="outline"
          onClick={onClose}
          className="bg-yellow-500 text-white hover:bg-yellow-700"
        >
          Discard Changes
        </Button>

        <Button
          onClick={onSubmit}
          disabled={submitting}
          className="bg-blue-500 text-white hover:bg-blue-700"
        >
          {submitting
            ? "Saving..."
            : formData.status === "PUBLISHED"
              ? "Publish Now"
              : "Save Draft"}
        </Button>
      </div>
    </div>
  );
}
