import { TUser } from "@/types";
import { UserRow } from "./UserRow";

type Props = {
  users: TUser[];
  onEdit: (user: TUser) => void;
  onDelete: (id: string) => void;
};

export function UserTable({ users, onEdit, onDelete }: Props) {
  return (
    <div className="bg-card rounded-lg border shadow-md shadow-black/10">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b text-left">
              <th className="p-4 text-sm text-muted-foreground">USER</th>
              <th className="p-4 text-sm text-muted-foreground">ROLE</th>
              <th className="p-4 text-sm text-muted-foreground">STATUS</th>
              <th className="p-4 text-sm text-muted-foreground text-right">
                ACTIONS
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <UserRow
                key={u.id}
                user={u}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
