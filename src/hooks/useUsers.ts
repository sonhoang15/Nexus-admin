import { useState } from "react";
import { TUser } from "@/types";
import { mockUsers } from "@/data/mockData";

export type TUserFormData = {
  fullName: string;
  email: string;
  password: string;
  role: "ADMIN" | "SUPER_ADMIN";
  status: "ACTIVE" | "INACTIVE";
};

const DEFAULT_FORM: TUserFormData = {
  fullName: "",
  email: "",
  password: "",
  role: "ADMIN",
  status: "ACTIVE",
};

export function useUsers() {
  const [users, setUsers] = useState<TUser[]>(mockUsers);
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "form">("list");
  const [editingUser, setEditingUser] = useState<TUser | null>(null);
  const [formData, setFormData] = useState<TUserFormData>(DEFAULT_FORM);

  const filteredUsers = users.filter(
    (u) =>
      u.fullName.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()),
  );

  const handleAdd = () => {
    setEditingUser(null);
    setFormData(DEFAULT_FORM);
    setViewMode("form");
  };

  const handleEdit = (user: TUser) => {
    setEditingUser(user);
    setFormData({
      fullName: user.fullName,
      email: user.email,
      password: "",
      role: user.role,
      status: user.status,
    });
    setViewMode("form");
  };

  const handleDelete = (id: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

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

    setViewMode("list");
    setEditingUser(null);
  };

  const handleCancel = () => {
    setViewMode("list");
    setEditingUser(null);
  };

  return {
    users: filteredUsers,
    search,
    viewMode,
    editingUser,
    formData,

    setSearch,
    setFormData,

    handleAdd,
    handleEdit,
    handleDelete,
    handleSubmit,
    handleCancel,
  };
}
