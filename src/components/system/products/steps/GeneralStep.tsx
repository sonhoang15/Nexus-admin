import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TagIcon, StarIcon } from "lucide-react";
import { TProductFormData } from "@/types/product";

type Props = {
  formData: TProductFormData;
  setFormData: (data: TProductFormData) => void;
  categories: any[];
  errors: Record<string, string>;

  tagInput: string;
  setTagInput: (value: string) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleRemoveTag: (tag: string) => void;
};

export function GeneralStep({
  formData,
  setFormData,
  categories,
  errors = {},
  tagInput,
  setTagInput,
  handleKeyDown,
  handleRemoveTag,
}: Props) {
  const errorStyle = "border-red-500 bg-red-50 focus-visible:ring-red-200";
  return (
    <div className="space-y-6">
      <div className="bg-gray-50 border rounded-lg p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <StarIcon className="h-6 w-6 text-yellow-400" />
          <div>
            <Label className="font-semibold text-sm">Featured Product</Label>
            <p className="text-xs text-gray-500">
              Highlight this product in the store frontend.
            </p>
          </div>
        </div>

        <Switch
          id="featured"
          checked={formData.isFeatured}
          onCheckedChange={(checked) =>
            setFormData({ ...formData, isFeatured: checked })
          }
          className="data-[state=checked]:!bg-success data-[state=unchecked]:!bg-muted"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 uppercase">
        <div className="space-y-2">
          <Label>Product Name *</Label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="MacBook Pro 14"
            className={errors.name ? errorStyle : ""}
          />
          {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
        </div>

        <div className="space-y-2">
          <Label>SKU *</Label>
          <Input
            value={formData.sku}
            onChange={(e) =>
              setFormData({
                ...formData,
                sku: e.target.value.toUpperCase(),
              })
            }
            placeholder="APL-123-MB"
            className={errors.sku ? errorStyle : ""}
          />
          {errors.sku && <p className="text-xs text-red-500">{errors.sku}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 uppercase">
        <div className="space-y-2">
          <Label>Barcode</Label>
          <Input
            value={formData.barcode}
            onChange={(e) =>
              setFormData({ ...formData, barcode: e.target.value })
            }
          />
        </div>

        <div className="space-y-2">
          <Label>Category *</Label>
          <Select
            value={formData.categoryId}
            onValueChange={(value) =>
              setFormData({ ...formData, categoryId: value })
            }
          >
            <SelectTrigger className={errors.categoryId ? errorStyle : ""}>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.categoryId && (
            <p className="text-xs text-red-500">{errors.categoryId}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 uppercase">
        <div className="space-y-2">
          <Label>Brand *</Label>
          <Input
            value={formData.brand}
            onChange={(e) =>
              setFormData({ ...formData, brand: e.target.value })
            }
            className={errors.brand ? errorStyle : ""}
          />
          {errors.brand && (
            <p className="text-xs text-red-500">{errors.brand}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Manufacturer *</Label>
          <Input
            value={formData.manufacturer}
            onChange={(e) =>
              setFormData({ ...formData, manufacturer: e.target.value })
            }
            className={errors.manufacturer ? errorStyle : ""}
          />
          {errors.manufacturer && (
            <p className="text-xs text-red-500">{errors.manufacturer}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 uppercase">
        <div className="space-y-2">
          <Label>Weight</Label>
          <Input
            value={formData.weight}
            onChange={(e) =>
              setFormData({ ...formData, weight: e.target.value })
            }
          />
        </div>

        <div className="space-y-2">
          <Label>Dimensions</Label>
          <Input
            value={formData.dimensions}
            onChange={(e) =>
              setFormData({ ...formData, dimensions: e.target.value })
            }
          />
        </div>
      </div>

      <div className="space-y-2 uppercase">
        <Label>Description</Label>
        <Textarea
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          rows={3}
        />
      </div>

      <div className="space-y-2 uppercase">
        <Label className="text-sm font-semibold tracking-wide text-gray-500">
          Product Tags (1-8) *
        </Label>

        <div
          className={` flex flex-wrap items-center gap-2 min-h-[56px] px-4 py-2 rounded-2xl bg-gray-100 border-2 transition focus-within:border-blue-500
          ${errors.tags ? "border-red-500" : "border-transparent"}`}
        >
          <TagIcon className="w-5 h-5 text-gray-400 mr-1" />

          {formData.tags.map((tag) => (
            <div
              key={tag}
              className="flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-100 text-blue-700 text-sm font-medium"
            >
              {tag}
              <button
                type="button"
                onClick={() => handleRemoveTag(tag)}
                className="text-blue-500 hover:text-blue-700"
              >
                ×
              </button>
            </div>
          ))}

          <input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Press Enter to add tag"
            className="flex-1 bg-transparent outline-none text-sm min-w-[150px] placeholder:text-gray-400"
          />
        </div>

        {errors.tags && <p className="text-xs text-red-500">{errors.tags}</p>}
      </div>
    </div>
  );
}
