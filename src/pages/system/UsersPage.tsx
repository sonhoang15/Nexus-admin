import { PageHeader } from "@/components/common/PageHeader";
import { ListToolbar } from "@/components/common/ListToolbar";
import { userColumns } from "@/components/system/users/UsersColumns";
import { UserForm } from "@/components/system/users/UserForm";
import { useUsers } from "@/hooks/useUsers";
import { ConfirmDeleteModal } from "@/components/common/ConfirmDeleteModal";
import { DataTable } from "@/components/common/DataTable";

export default function UsersPage() {
  const {
    users,
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
  } = useUsers();

  return (
    <div className="space-y-6">
      <PageHeader
        title="User Management"
        description="System management and detailed overview."
      />

      {viewMode === "list" && (
        <>
          <ListToolbar
            search={search}
            Action="Add User"
            onSearchChange={setSearch}
            onAdd={handleAdd}
          />

          <DataTable
            data={users}
            columns={userColumns({
              onEdit: handleEdit,
              onDelete: handleDelete,
            })}
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
      <ConfirmDeleteModal
        open={!!deleteUserId}
        loading={isDeleting}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
}
