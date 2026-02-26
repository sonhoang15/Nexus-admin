import { FormActions } from "@/components/common/FormActions";
import { FormCard } from "@/components/common/FormCard";
import { FormField } from "@/components/common/FormField";
import { Textarea } from "@/components/ui/textarea";
import { ICategory } from "@/types";
import { Input } from "@/components/ui/input";

type FormData = {
  name: string;
  description: string;
};

interface Props {
  editingCategory: ICategory | null;
  formData: FormData;
  onChange: (data: FormData) => void;
  onClose: () => void;
  onSubmit: () => void;
}

export function CategoryForm({
  editingCategory,
  formData,
  onChange,
  onClose,
  onSubmit,
}: Props) {
  return (
    <FormCard
      title={editingCategory ? "Edit Category" : "Add Category"}
      onClose={onClose}
      onSubmit={onSubmit}
      submitLabel={editingCategory ? "Update" : "Create"}
    >
      <FormField label="Category Name">
        <Input
          className="input "
          value={formData.name}
          onChange={(e) => onChange({ ...formData, name: e.target.value })}
          placeholder="Electronics"
        />
      </FormField>

      <FormField label="Description">
        <Textarea
          rows={3}
          value={formData.description}
          onChange={(e) =>
            onChange({ ...formData, description: e.target.value })
          }
          placeholder="Electronic devices and accessories"
        />
      </FormField>
      <FormActions
        isDisabled={!(formData.name && formData.description)}
        submitText={editingCategory ? "Update" : "Create"}
        onCancel={onClose}
        CancelText="Cancel"
        onSubmit={onSubmit}
      />
    </FormCard>
  );
}
