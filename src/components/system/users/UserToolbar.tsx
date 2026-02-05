import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { SearchInput } from "@/components/common/SearchInput";

type Props = {
  search: string;
  onSearchChange: (value: string) => void;
  onAdd: () => void;
};

export function UserToolbar({ search, onSearchChange, onAdd }: Props) {
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

      <Button onClick={onAdd}>
        <UserPlus className="h-4 w-4 mr-2" />
        Add User
      </Button>
    </div>
  );
}
