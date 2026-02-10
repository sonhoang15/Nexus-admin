import { PageHeader } from "@/components/common/PageHeader";
import { ListToolbar } from "@/components/common/ListToolbar";
import { DataTable } from "@/components/common/DataTable";
import { CategoryForm } from "@/components/system/categories/CategoryForm";
import { categoryColumns } from "@/components/system/categories/category.columns";
import { useCategories } from "@/hooks/useCategories";
import { ConfirmDeleteModal } from "@/components/common/ConfirmDeleteModal";

const CategoriesPage = () => {
  const {
    categories,
    search,
    viewMode,
    editingCategory,
    formData,
    deleteCategoryId,
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
  } = useCategories();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Category Management"
        description="System management and detailed overview."
      />
      {viewMode === "table" && (
        <>
          <ListToolbar
            search={search}
            Action="Add Category"
            onSearchChange={setSearch}
            onAdd={handleAdd}
          />

          <DataTable
            data={categories}
            columns={categoryColumns({
              onEdit: handleEdit,
              onDelete: handleDelete,
            })}
          />
        </>
      )}

      {viewMode === "form" && (
        <CategoryForm
          editingCategory={editingCategory}
          formData={formData}
          onChange={setFormData}
          onClose={handleCancel}
          onSubmit={handleSubmit}
        />
      )}
      <ConfirmDeleteModal
        open={!!deleteCategoryId}
        loading={isDeleting}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
};

export default CategoriesPage;
