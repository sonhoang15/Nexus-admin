import { useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import { ProductToolbar } from "@/components/system/products/ProductToolbar";
import { ProductCard } from "@/components/system/products/ProductCard";
import { ProductForm } from "@/components/system/products/ProductForm";
import { ProductViewDialog } from "@/components/system/products/ProductViewDialog";
import { ProductFilters } from "@/components/system/products/ProductFilter";
import { TProductFilters } from "@/types/product";
import { EStatus, EPromotion, ESort } from "@/enums/filters.enum";

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
      <ProductToolbar
        search={search}
        onSearchChange={setSearch}
        onAdd={handleAdd}
        showFilters={showFilters}
        onToggleFilters={() => setShowFilters((v) => !v)}
      />

      {showFilters && <ProductFilters value={filters} onChange={setFilters} />}

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
          editing={!!editingProduct}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          onClose={handleCancel}
        />
      )}

      <ProductViewDialog
        open={viewMode === "view"}
        product={selectedProduct}
        onClose={handleCancel}
      />
    </div>
  );
};

export default ProductsPage;
