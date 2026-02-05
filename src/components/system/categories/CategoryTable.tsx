import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Layers } from "lucide-react";
import { Category } from "@/types";

interface Props {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (id: string) => void;
}

export function CategoryTable({ categories, onEdit, onDelete }: Props) {
  return (
    <div className="bg-card rounded-lg border">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b text-left">
              <th className="p-4 font-medium text-muted-foreground text-sm">
                CATEGORY NAME
              </th>
              <th className="p-4 font-medium text-muted-foreground text-sm">
                DESCRIPTION
              </th>
              <th className="p-4 font-medium text-muted-foreground text-sm text-center">
                PRODUCTS
              </th>
              <th className="p-4 font-medium text-muted-foreground text-sm text-right">
                ACTIONS
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id} className="border-b last:border-0">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Layers className="h-4 w-4 text-primary" />
                    </div>
                    <span className="font-medium">{category.name}</span>
                  </div>
                </td>
                <td className="p-4 text-muted-foreground">
                  {category.description}
                </td>
                <td className="p-4 text-center">
                  <span className="text-muted-foreground">
                    {category.productCount} Items
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(category)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(category.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
