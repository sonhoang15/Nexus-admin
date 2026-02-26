import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  formData: any;
  setFormData: (data: any) => void;
};

export function SeoStep({ formData, setFormData }: Props) {
  return (
    <div className="bg-gray-50 p-6 rounded-xl space-y-4">
      <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-search mr-2 text-indigo-600"
              aria-hidden="true"
            >
              <path d="m21 21-4.34-4.34"></path>
              <circle cx="11" cy="11" r="8"></circle>
            </svg>{" "}
            Google Search Preview
          </h4>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-shield-check text-emerald-500"
            aria-hidden="true"
          >
            <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
            <path d="m9 12 2 2 4-4"></path>
          </svg>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 max-w-2xl">
          <div className="space-y-1">
            <div className="flex items-center text-[10px] text-slate-500 font-medium truncate mb-1">
              <span>https://nexus-admin.com</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="8"
                height="8"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-chevron-right mx-1"
                aria-hidden="true"
              >
                <path d="m9 18 6-6-6-6"></path>
              </svg>
              <span>products</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="8"
                height="8"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-chevron-right mx-1"
                aria-hidden="true"
              >
                <path d="m9 18 6-6-6-6"></path>
              </svg>
              <span className="text-indigo-600 font-bold">your-product</span>
            </div>
            <h3 className="text-xl font-bold text-[#1a0dab] hover:underline cursor-pointer truncate leading-tight">
              Product Meta Title Preview
            </h3>
            <p className="text-sm text-[#4d5156] leading-relaxed line-clamp-2">
              Add a compelling description to improve your click-through rate in
              search results. A good description summarizes the key benefits of
              your product.
            </p>
          </div>
        </div>
        <div className="mt-4 flex items-center space-x-2">
          <div className="p-1.5 bg-indigo-50 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-info text-indigo-600"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 16v-4"></path>
              <path d="M12 8h.01"></path>
            </svg>
          </div>
          <p className="text-[10px] text-slate-400 font-medium">
            This is how your product will appear in search engine results.
          </p>
        </div>
      </div>
      <div className="space-y-2 uppercase">
        <Label>Meta Title *</Label>
        <Input
          value={formData.metaTitle}
          onChange={(e) =>
            setFormData({ ...formData, metaTitle: e.target.value })
          }
        />
      </div>

      <div className="space-y-2 uppercase">
        <Label>Meta Description *</Label>
        <Textarea
          rows={4}
          value={formData.metaDescription}
          onChange={(e) =>
            setFormData({ ...formData, metaDescription: e.target.value })
          }
        />
      </div>
    </div>
  );
}
