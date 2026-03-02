import { Button } from "@/components/ui/button";
import { Plus, Filter } from "lucide-react";
import { SearchInput } from "@/components/common/SearchInput";

type Props = {
  search: string;
  onSearchChange: (search: string) => void;
  onAdd: () => void;
  showFilters: boolean;
  onToggleFilters: () => void;
};

export function ProductToolbar({
  search,
  onSearchChange,
  onAdd,
  showFilters,
  onToggleFilters,
}: Props) {
  return (
    <>
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex gap-2 flex-1 max-w-lg">
          <div className="relative flex-1">
            <SearchInput
              placeholder="Search name, SKU..."
              value={search}
              onChange={onSearchChange}
              className="max-w-sm"
            />
          </div>
          <Button
            variant={showFilters ? "secondary" : "outline"}
            onClick={onToggleFilters}
            className="bg-black text-white hover:bg-black/80"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>
        <Button onClick={onAdd} className="bg-lime-500 hover:bg-lime-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </div>
    </>
  );
}
