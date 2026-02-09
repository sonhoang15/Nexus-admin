import { useCategories } from "@/hooks/useCategories";
import { CategoryToolbar } from "@/components/system/categories/CategoryToolbar";
import { CategoryTable } from "@/components/system/categories/CategoryTable";
import { CategoryForm } from "@/components/system/categories/CategoryForm";
import { CategoryHeader } from "@/components/system/categories/CategoryHeader";

const CategoriesPage = () => {
  const {
    categories,
    search,
    viewMode,
    editingCategory,
    formData,

    setSearch,
    setFormData,

    handleAdd,
    handleEdit,
    handleDelete,
    handleSubmit,
    handleCancel,
  } = useCategories();

  return (
    <div className="space-y-6">
      <CategoryHeader />

      {viewMode === "table" && (
        <>
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
    </div>
  );
};

export default CategoriesPage;
