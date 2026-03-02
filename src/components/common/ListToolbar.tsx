import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/common/SearchInput";
import { UserPlus } from "lucide-react";

type Props = {
  search: string;
  Action: React.ReactNode;
  onSearchChange: (value: string) => void;
  onAdd: () => void;
};

export function ListToolbar({ search, Action, onSearchChange, onAdd }: Props) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-between">
      <div className="relative max-w-sm">
        <SearchInput
          value={search}
          onChange={onSearchChange}
          placeholder="Search users..."
          className="max-w-sm"
        />
      </div>

      <Button
        onClick={onAdd}
        className="bg-green-500 text-white hover:bg-green-600"
      >
        <UserPlus className="h-4 w-4 mr-2" />
        {Action}
      </Button>
    </div>
  );
}
