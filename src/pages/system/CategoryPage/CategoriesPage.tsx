import { PageHeader } from "@/components/common/PageHeader";
import { ListToolbar } from "@/components/common/ListToolbar";
import { DataTable } from "@/components/common/DataTable";
import { CategoryForm } from "@/components/system/categories/CategoryForm";
import { categoryColumns } from "@/components/system/categories/Category.columns";
import { useCategories } from "@/hooks/useCategories";
import { ConfirmDeleteModal } from "@/components/common/ConfirmDeleteModal";
import { Loading } from "@/components/common/Loading";

const CategoriesPage = () => {
  const {
    categories,
    search,
    viewMode,
    editingCategory,
    formData,
    deleteCategoryId,
    isDeleting,
    categoriesLoading,

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
        <>
          {categoriesLoading ? (
            <Loading />
          ) : categories.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              No categories found.
            </div>
          ) : (
            <CategoryForm
              editingCategory={editingCategory}
              formData={formData}
              onChange={setFormData}
              onClose={handleCancel}
              onSubmit={handleSubmit}
            />
          )}
        </>
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
