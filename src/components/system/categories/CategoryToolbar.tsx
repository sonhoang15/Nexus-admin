import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { SearchInput } from "@/components/common/SearchInput";

interface ICategoryToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  onAdd: () => void;
}

export function CategoryToolbar({
  search,
  onSearchChange,
  onAdd,
}: ICategoryToolbarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-between">
      <div className="relative max-w-md flex-1">
        <SearchInput
          value={search}
          onChange={onSearchChange}
          placeholder="Search users..."
          className="max-w-sm"
        />
      </div>

      <Button
        onClick={onAdd}
        className="shadow-md shadow-black/10 bg-lime-500 hover:bg-lime-700"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Category
      </Button>
    </div>
  );
}
