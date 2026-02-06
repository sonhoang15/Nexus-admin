import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { SearchInput } from "@/components/common/SearchInput";

interface Props {
  search: string;
  onSearchChange: (v: string) => void;
  onAdd: () => void;
}

export function SettingsSearchBar({ search, onSearchChange, onAdd }: Props) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-between">
      <SearchInput
        value={search}
        onChange={onSearchChange}
        placeholder="Search keys or descriptions..."
        className="max-w-md flex-1"
      />
      <Button
        onClick={onAdd}
        className="bg-green-500 text-white hover:bg-green-600"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Setting
      </Button>
    </div>
  );
}
