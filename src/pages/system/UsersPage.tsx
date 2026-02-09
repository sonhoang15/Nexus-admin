import { UserHeader } from "@/components/system/users/UserHeader";
import { UserToolbar } from "@/components/system/users/UserToolbar";
import { UserTable } from "@/components/system/users/UserTable";
import { UserForm } from "@/components/system/users/UserForm";
import { useUsers } from "@/hooks/useUsers";

export default function UsersPage() {
  const {
    users,
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
  } = useUsers();

  return (
    <div className="space-y-6">
      <UserHeader />

      {viewMode === "list" && (
        <>
          <UserToolbar
            search={search}
            onSearchChange={setSearch}
            onAdd={handleAdd}
          />

          <UserTable
            users={users}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </>
      )}

      {viewMode === "form" && (
        <UserForm
          editingUser={editingUser}
          formData={formData}
          onChange={setFormData}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
}
