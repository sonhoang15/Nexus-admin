import { useEffect, useState } from "react";
import { IUser } from "@/types/user";
import {
  getUsersService,
  createUserService,
  updateUserService,
  deleteUserService,
} from "@/services/users.Service";
import { toast } from "sonner";
import { EUserRole, EUserStatus } from "@/enums/user.enums";

export type TUserFormData = {
  fullName: string;
  email: string;
  password: string;
  role: EUserRole;
  status: EUserStatus;
};

const DEFAULT_FORM: TUserFormData = {
  fullName: "",
  email: "",
  password: "",
  role: EUserRole.ADMIN,
  status: EUserStatus.ACTIVE,
};

export function useUsers() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [search, setSearch] = useState<string>("");
  const [viewMode, setViewMode] = useState<"list" | "form">("list");
  const [editingUser, setEditingUser] = useState<IUser | null>(null);
  const [formData, setFormData] = useState<TUserFormData>(DEFAULT_FORM);
  const [deleteUserId, setDeleteUserId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await getUsersService();
      setUsers(res);
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter((u) => {
    const keyword = search.trim().toLowerCase();
    if (!keyword) return true;

    return u.fullName?.toLowerCase().includes(keyword);
  });

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
      role: EUserRole[user.role],
      status: EUserStatus[user.status],
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
      await deleteUserService(deleteUserId);

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
      await updateUserService(editingUser.id, formData);
      setUsers((prev) =>
        prev.map((u) => (u.id === editingUser.id ? { ...u, ...formData } : u)),
      );
      toast.success("Update user successfully");
    } else {
      const res = await createUserService(formData);
      setUsers((prev) => [...prev, res]);
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
