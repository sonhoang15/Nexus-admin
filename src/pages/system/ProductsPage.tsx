import { useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import { ProductToolbar } from "@/components/system/products/ProductToolbar";
import { ProductCard } from "@/components/system/products/ProductCard";
import { ProductForm } from "@/components/system/products/ProductForm";
import { ProductDetail } from "@/components/system/products/ProductDetail";
import { ProductFilters } from "@/components/system/products/ProductFilter";
import { TProductFilters } from "@/types/product";
import { EStatus, EPromotion, ESort } from "@/enums/filters.enums";
import { PageHeader } from "@/components/common/PageHeader";

const ProductsPage = () => {
  const {
    products,
    search,
    viewMode,
    selectedProduct,
    editingProduct,
    formData,
    setSearch,
    setFormData,
    handleAdd,
    handleEdit,
    handleView,
    handleDelete,
    handleSubmit,
    handleCancel,
    tagInput,
    setTagInput,
    handleKeyDown,
    handleRemoveTag,
    handleRemoveImage,
  } = useProducts();
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<TProductFilters>({
    categories: [],
    status: EStatus.ALL_STATUS,
    promotion: EPromotion.ALL_PRODUCTS,
    minPrice: 0,
    maxPrice: 0,
    sort: ESort.NEWEST_ADDITIONS,
  });

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
            <ProductFilters value={filters} onChange={setFilters} />
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
        open={viewMode === "view"}
        productId={selectedProduct?.id || ""}
        onClose={handleCancel}
      />
    </div>
  );
};

export default ProductsPage;
