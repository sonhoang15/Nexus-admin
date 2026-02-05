import { useCategories } from "@/hooks/useCategories";
import { CategoryToolbar } from "@/components/system/categories/CategoryToolbar";
import { CategoryTable } from "@/components/system/categories/CategoryTable";
import { CategoryFormDialog } from "@/components/system/categories/CategoryFormDialog";

const CategoriesPage = () => {
  const {
    categories,
    search,
    dialogOpen,
    editingCategory,
    formData,
    setSearch,
    setDialogOpen,
    setFormData,
    handleAdd,
    handleEdit,
    handleDelete,
    handleSubmit,
  } = useCategories();

  return (
    <div className="space-y-6">
      <CategoryToolbar
        search={search}
        onSearchChange={setSearch}
        onAdd={handleAdd}
      />

      <CategoryTable
        categories={categories}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <CategoryFormDialog
        open={dialogOpen}
        editingCategory={editingCategory}
        formData={formData}
        onChange={setFormData}
        onClose={() => setDialogOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default CategoriesPage;
