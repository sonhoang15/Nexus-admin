import { ICategory } from "@/types";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Layers } from "lucide-react";

type Handlers = {
  onEdit: (c: ICategory) => void;
  onDelete: (id: string) => void;
};

export const categoryColumns = ({ onEdit, onDelete }: Handlers) => [
  {
    header: "CATEGORY",
    render: (c: ICategory) => (
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <Layers className="h-4 w-4 text-primary" />
        </div>
        <span className="font-medium">{c.name}</span>
      </div>
    ),
  },
  {
    header: "DESCRIPTION",
    render: (c: ICategory) => (
      <span className="text-muted-foreground">{c.description}</span>
    ),
  },
  {
    header: "PRODUCTS",
    align: "center" as const,
    render: (c: ICategory) => (
      <span className="text-muted-foreground">{c.productCount} Items</span>
    ),
  },
  {
    header: "ACTIONS",
    align: "right" as const,
    render: (c: ICategory) => (
      <div className="flex justify-end gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onEdit(c)}
          className="text-yellow-500 hover:!bg-yellow-600"
        >
          <Pencil className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(c.id)}
          className="text-red-500 hover:!bg-red-600"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    ),
  },
];
