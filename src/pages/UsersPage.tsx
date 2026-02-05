import { useState } from "react";
import { mockUsers } from "@/data/mockData";
import { User } from "@/types";

import { UserHeader } from "@/components/system/users/UserHeader";
import { UserToolbar } from "@/components/system/users/UserToolbar";
import { UserTable } from "@/components/system/users/UserTable";
import { UserDialog } from "@/components/system/users/UserDialog";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "ADMIN" as "ADMIN" | "SUPER_ADMIN",
    status: "ACTIVE" as "ACTIVE" | "INACTIVE",
  });

  const filteredUsers = users.filter(
    (u) =>
      u.fullName.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()),
  );

  const handleSubmit = () => {
    if (editingUser) {
      setUsers((prev) =>
        prev.map((u) => (u.id === editingUser.id ? { ...u, ...formData } : u)),
      );
    } else {
      setUsers((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          ...formData,
          createdAt: new Date().toISOString().split("T")[0],
        },
      ]);
    }
    setDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <UserHeader />

      <UserToolbar
        search={search}
        onSearchChange={setSearch}
        onAdd={() => {
          setEditingUser(null);
          setFormData({
            fullName: "",
            email: "",
            password: "",
            role: "ADMIN",
            status: "ACTIVE",
          });
          setDialogOpen(true);
        }}
      />

      <UserTable
        users={filteredUsers}
        onEdit={(u) => {
          setEditingUser(u);
          setFormData({
            fullName: u.fullName,
            email: u.email,
            password: "",
            role: u.role,
            status: u.status,
          });
          setDialogOpen(true);
        }}
        onDelete={(id) => setUsers((prev) => prev.filter((u) => u.id !== id))}
      />

      <UserDialog
        open={dialogOpen}
        editingUser={editingUser}
        formData={formData}
        onOpenChange={setDialogOpen}
        onChange={setFormData}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
