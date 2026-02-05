import { User } from "@/types";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { cn } from "@/libs/utils";

type Props = {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
};

export function UserRow({ user, onEdit, onDelete }: Props) {
  return (
    <tr className="border-b last:border-0">
      <td className="p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback>{user.fullName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{user.fullName}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>
      </td>

      <td className="p-4">
        <Badge
          variant={user.role === "SUPER_ADMIN" ? "default" : "secondary"}
          className={cn(
            user.role === "SUPER_ADMIN" && "bg-primary/10 text-primary",
          )}
        >
          {user.role.replace("_", " ")}
        </Badge>
      </td>

      <td className="p-4">
        <div className="flex items-center gap-2">
          <div
            className={cn(
              "w-2 h-2 rounded-full",
              user.status === "ACTIVE" ? "bg-success" : "bg-muted-foreground",
            )}
          />
          <span
            className={cn(
              "text-sm",
              user.status === "ACTIVE"
                ? "text-success"
                : "text-muted-foreground",
            )}
          >
            {user.status === "ACTIVE" ? "Active" : "Inactive"}
          </span>
        </div>
      </td>

      <td className="p-4">
        <div className="flex justify-end gap-2">
          <Button variant="ghost" size="icon" onClick={() => onEdit(user)}>
            <Pencil className="h-4 w-4" />
          </Button>

          {user.role !== "SUPER_ADMIN" && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(user.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </td>
    </tr>
  );
}
