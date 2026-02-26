import { useEffect, useState } from "react";
import { IUser } from "@/types/user";
import {
  getUsersApi,
  createUserApi,
  updateUserApi,
  deleteUserApi,
} from "@/services/UsersService";
import { toast } from "sonner";

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
  const [users, setUsers] = useState<IUser[]>([]);
  const [search, setSearch] = useState<string>("");
  const [viewMode, setViewMode] = useState<"list" | "form">("list");
  const [editingUser, setEditingUser] = useState<IUser | null>(null);
  const [formData, setFormData] = useState<TUserFormData>(DEFAULT_FORM);
  const [deleteUserId, setDeleteUserId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await getUsersApi();
      setUsers(res);
    };

    fetchUsers();
  }, []);

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

  const handleEdit = (user: IUser) => {
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
    setDeleteUserId(id);
  };

  const confirmDelete = async () => {
    if (!deleteUserId) return;

    try {
      setIsDeleting(true);
      await deleteUserApi(deleteUserId);

      setUsers((prev) => prev.filter((u) => u.id !== deleteUserId));
      toast.success("Delete user successfully");
    } catch (error) {
      toast.error("Delete failed");
    } finally {
      setIsDeleting(false);
      setDeleteUserId(null);
    }
  };
  const cancelDelete = () => {
    setDeleteUserId(null);
  };

  const handleSubmit = async () => {
    if (editingUser) {
      await updateUserApi(editingUser.id, formData);
      setUsers((prev) =>
        prev.map((u) => (u.id === editingUser.id ? { ...u, ...formData } : u)),
      );
      toast.success("Update user successfully");
    } else {
      const res = await createUserApi(formData);
      setUsers((prev) => [...prev, res.data]);
      toast.success("Create user successfully");
    }

    setViewMode("list");
    setEditingUser(null);
    setFormData(DEFAULT_FORM);
  };

  const handleCancel = () => {
    setViewMode("list");
    setEditingUser(null);
    setFormData(DEFAULT_FORM);
  };

  return {
    users: filteredUsers,
    search,
    viewMode,
    editingUser,
    formData,
    deleteUserId,
    isDeleting,

    setSearch,
    setFormData,

    handleAdd,
    handleEdit,
    handleDelete,
    handleSubmit,
    handleCancel,

    confirmDelete,
    cancelDelete,
  };
}
