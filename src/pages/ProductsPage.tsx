import { useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import { ProductToolbar } from "@/components/system/products/ProductToolbar";
import { ProductCard } from "@/components/system/products/ProductCard";
import { ProductFormDialog } from "@/components/system/products/ProductFormDialog";
import { ProductViewDialog } from "@/components/system/products/ProductViewDialog";
import { TProductFilters } from "@/types/product";
import { ProductFilters } from "@/components/system/products/ProductFilter";
import { EStatus, EPromotion, ESort } from "@/enums/filters.enum";

const ProductsPage = () => {
  const {
    products,
    search,
    dialogOpen,
    viewDialogOpen,
    selectedProduct,
    editingProduct,
    formData,
    setSearch,
    setDialogOpen,
    setViewDialogOpen,
    setFormData,
    handleAdd,
    handleEdit,
    handleView,
    handleDelete,
    handleSubmit,
  } = useProducts();

  const [showFilters, setShowFilters] = useState<boolean>(false);
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
      {showFilters && (
        <div className="mt-6">
          <ProductFilters value={filters} onChange={setFilters} />
        </div>
      )}

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

      <ProductFormDialog
        open={dialogOpen}
        editing={!!editingProduct}
        formData={formData}
        setFormData={setFormData}
        onClose={() => setDialogOpen(false)}
        onSubmit={handleSubmit}
      />

      <ProductViewDialog
        open={viewDialogOpen}
        product={selectedProduct}
        onClose={() => setViewDialogOpen(false)}
      />
    </div>
  );
};

export default ProductsPage;
