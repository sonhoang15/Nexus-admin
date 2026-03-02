import { IProduct } from "@/types/product";
import { ProductCard } from "@/pages/system/ProductPage/product/ProductCard";

type Props = {
  products: IProduct[];
  onView: (product: IProduct) => void;
  onEdit: (product: IProduct) => void;
  onDelete: (id: string) => void;
};

export function ProductGrid({ products, onView, onEdit, onDelete }: Props) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onView={() => onView(product)}
          onEdit={() => onEdit(product)}
          onDelete={() => onDelete(product.id)}
        />
      ))}
    </div>
  );
}
