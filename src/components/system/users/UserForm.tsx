import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TUser } from "@/types";

type FormData = {
  fullName: string;
  email: string;
  password: string;
  role: "ADMIN" | "SUPER_ADMIN";
  status: "ACTIVE" | "INACTIVE";
};

type Props = {
  editingUser: TUser | null;
  formData: FormData;
  onChange: (data: FormData) => void;
  onSubmit: () => void;
  onCancel: () => void;
};

export function UserForm({
  editingUser,
  formData,
  onChange,
  onSubmit,
  onCancel,
}: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{editingUser ? "Edit User" : "Add User"}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6 shadow-md shadow-black/10">
        <div className="space-y-2">
          <Label>Full Name</Label>
          <Input
            value={formData.fullName}
            onChange={(e) =>
              onChange({ ...formData, fullName: e.target.value })
            }
          />
        </div>

        <div className="space-y-2">
          <Label>Email</Label>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => onChange({ ...formData, email: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label>Password</Label>
          <Input
            type="password"
            value={formData.password}
            onChange={(e) =>
              onChange({ ...formData, password: e.target.value })
            }
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Role</Label>
            <Select
              value={formData.role}
              onValueChange={(v: "ADMIN" | "SUPER_ADMIN") =>
                onChange({ ...formData, role: v })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ADMIN">Admin</SelectItem>
                <SelectItem value="SUPER_ADMIN">Super Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Status</Label>
            <Select
              value={formData.status}
              onValueChange={(v: "ACTIVE" | "INACTIVE") =>
                onChange({ ...formData, status: v })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ACTIVE">Active</SelectItem>
                <SelectItem value="INACTIVE">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button
            variant="outline"
            onClick={onCancel}
            className="bg-red-500 text-white hover:bg-red-600"
          >
            Cancel
          </Button>
          <Button
            onClick={onSubmit}
            className="bg-green-500 text-white hover:bg-green-600"
          >
            {editingUser ? "Update" : "Create"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
