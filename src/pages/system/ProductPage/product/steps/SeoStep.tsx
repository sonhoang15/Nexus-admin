import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ChevronRight, Search, ShieldCheck, Info } from "lucide-react";

type Props = {
  formData: any;
  setFormData: (data: any) => void;
};

const slugify = (text: string) => {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
};

export function SeoStep({ formData, setFormData }: Props) {
  const metaTitle = formData.metaTitle || "";
  const metaDescription = formData.metaDescription || "";

  const slug = metaTitle ? slugify(metaTitle) : "your-product";

  const previewTitle = metaTitle.slice(0, 60) || "Product Meta Title Preview";

  const previewDescription =
    metaDescription.slice(0, 160) ||
    "Add a compelling description to improve your click-through rate in search results. A good description summarizes the key benefits of your product.";

  return (
    <div className="bg-gray-50 p-6 rounded-xl space-y-6">
      <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <Search className="h-4 w-4 text-indigo-600" />
            Google Search Preview
          </h4>
          <ShieldCheck className="h-4 w-4 text-emerald-500" />
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 max-w-2xl">
          <div className="space-y-1">
            <div className="flex items-center text-[11px] text-slate-500 font-medium truncate mb-1 gap-1">
              <span>https://nexus-admin.com</span>
              <ChevronRight className="h-3 w-3" />
              <span>products</span>
              <ChevronRight className="h-3 w-3" />
              <span className="text-indigo-600 font-semibold truncate">
                {slug}
              </span>
            </div>

            <h3 className="text-xl font-semibold text-[#1a0dab] hover:underline cursor-pointer truncate leading-tight">
              {previewTitle}
            </h3>

            <p className="text-sm text-[#4d5156] leading-relaxed line-clamp-2">
              {previewDescription}
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center space-x-2">
          <div className="p-1.5 bg-indigo-50 rounded-lg">
            <Info className="h-4 w-4 text-indigo-600" />
          </div>
          <p className="text-[10px] text-slate-400 font-medium">
            This is how your product will appear in search engine results.
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <Label className="uppercase">Meta Title *</Label>
          <span
            className={`text-xs ${
              metaTitle.length > 60 ? "text-red-500" : "text-slate-400"
            }`}
          >
            {metaTitle.length}/60
          </span>
        </div>

        <Input
          value={metaTitle}
          onChange={(e) =>
            setFormData({ ...formData, metaTitle: e.target.value })
          }
          placeholder="Enter meta title..."
        />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <Label className="uppercase">Meta Description *</Label>
          <span
            className={`text-xs ${
              metaDescription.length > 160 ? "text-red-500" : "text-slate-400"
            }`}
          >
            {metaDescription.length}/160
          </span>
        </div>

        <Textarea
          rows={4}
          value={metaDescription}
          onChange={(e) =>
            setFormData({ ...formData, metaDescription: e.target.value })
          }
          placeholder="Enter meta description..."
        />
      </div>
    </div>
  );
}
