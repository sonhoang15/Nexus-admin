import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus, Filter } from "lucide-react";

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
      <div>
        <h1 className="text-2xl font-bold">Product Management</h1>
        <p className="text-muted-foreground">
          System management and detailed overview.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex gap-2 flex-1 max-w-lg">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search name, SKU..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            variant={showFilters ? "secondary" : "outline"}
            onClick={onToggleFilters}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>
        <Button onClick={onAdd}>
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </div>
    </>
  );
}
