import { useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import { ProductToolbar } from "@/components/system/products/ProductToolbar";
import { ProductCard } from "@/components/system/products/ProductCard";
import { ProductForm } from "@/components/system/products/ProductForm";
import { ProductDetail } from "@/components/system/products/ProductDetail";
import { ProductFilters } from "@/components/system/products/ProductFilter";
import { useCategoryOptions } from "@/hooks/useCategoryOptions";
import { PageHeader } from "@/components/common/PageHeader";
import { ConfirmDeleteModal } from "@/components/common/ConfirmDeleteModal";

const ProductsPage = () => {
  const {
    products,
    search,
    viewMode,
    selectedProduct,
    editingProduct,
    formData,
    filters,
    tagInput,
    deleteProductId,
    isDeleting,
    setFilters,
    setSearch,
    setFormData,
    handleAdd,
    handleEdit,
    handleView,
    handleDelete,
    handleSubmit,
    handleCancel,
    setTagInput,
    handleKeyDown,
    handleRemoveTag,
    handleRemoveImage,
    confirmDelete,
    cancelDelete,
  } = useProducts();
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const { categories, loading } = useCategoryOptions();
  return (
    <div className="space-y-6">
      <PageHeader
        title="Product Management"
        description="System management and detailed overview."
      />

      {viewMode === "table" && (
        <>
          <ProductToolbar
            search={search}
            onSearchChange={setSearch}
            onAdd={handleAdd}
            showFilters={showFilters}
            onToggleFilters={() => setShowFilters((v) => !v)}
          />

          {showFilters && (
            <ProductFilters
              value={filters}
              onChange={setFilters}
              categories={categories}
            />
          )}
        </>
      )}

      {viewMode === "table" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={(p) => handleDelete(p.id)}
            />
          ))}
        </div>
      )}

      {viewMode === "form" && (
        <ProductForm
          tagInput={tagInput}
          setTagInput={setTagInput}
          handleKeyDown={handleKeyDown}
          handleRemoveTag={handleRemoveTag}
          editingProduct={!!editingProduct}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          onClose={handleCancel}
          handleRemoveImage={handleRemoveImage}
        />
      )}

      <ProductDetail
        onEdit={handleEdit}
        open={viewMode === "view"}
        productId={selectedProduct?.id || ""}
        onClose={handleCancel}
      />
      <ConfirmDeleteModal
        open={!!deleteProductId}
        loading={isDeleting}
        entityName="product"
        itemName={products.find((p) => p.id === deleteProductId)?.name}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
};

export default ProductsPage;
