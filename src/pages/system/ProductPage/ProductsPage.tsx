import { useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import { ProductToolbar } from "@/pages/system/ProductPage/product/ProductToolbar";
import { ProductCard } from "@/pages/system/ProductPage/product/ProductCard";
import { ProductForm } from "@/pages/system/ProductPage/product/ProductForm";
import { ProductDetail } from "@/pages/system/ProductPage/product/ProductDetail";
import { ProductFilters } from "@/pages/system/ProductPage/product/ProductFilter";
import { useCategoryOptions } from "@/hooks/useCategoryOptions";
import { PageHeader } from "@/components/common/PageHeader";
import { ConfirmDeleteModal } from "@/components/common/ConfirmDeleteModal";
import { Loading } from "@/components/common/Loading";

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
    productsLoading,
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
        <>
          {productsLoading ? (
            <Loading />
          ) : products.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              No products found.
            </div>
          ) : (
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
        </>
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
