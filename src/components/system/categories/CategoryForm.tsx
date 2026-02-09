import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ICategory } from "@/types";

interface IProps {
  editingCategory: ICategory | null;
  formData: {
    name: string;
    description: string;
  };
  onChange: (data: { name: string; description: string }) => void;
  onClose: () => void;
  onSubmit: () => void;
}

export function CategoryForm({
  editingCategory,
  formData,
  onChange,
  onClose,
  onSubmit,
}: IProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">
          {editingCategory ? "Edit Category" : "Add Category"}
        </h2>

        <Button
          onClick={onClose}
          className="text-white bg-red-500 hover:bg-red-700"
        >
          ✕
        </Button>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Category Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => onChange({ ...formData, name: e.target.value })}
            placeholder="Electronics"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) =>
              onChange({ ...formData, description: e.target.value })
            }
            rows={3}
            placeholder="Electronic devices and accessories"
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-6 border-t mt-6">
        <Button
          variant="outline"
          onClick={onClose}
          className="bg-red-500 text-white hover:bg-red-700"
        >
          Cancel
        </Button>
        <Button
          onClick={onSubmit}
          className="bg-blue-500 text-white hover:bg-blue-700"
        >
          {editingCategory ? "Update" : "Create"}
        </Button>
      </div>
    </div>
  );
}
