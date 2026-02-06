import { StockBadge } from "@/components/system/products/StockBadge";
import { Card, CardContent } from "@/components/ui/card";
import { TProduct } from "@/types";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, Trash2, Star } from "lucide-react";
import { cn } from "@/libs/utils";

type Props = {
  product: TProduct;
  onView: (product: TProduct) => void;
  onEdit: (product: TProduct) => void;
  onDelete: (product: TProduct) => void;
};

export function ProductCard({ product, onView, onEdit, onDelete }: Props) {
  return (
    <Card className="relative overflow-hidden group transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)]">
      <div className="relative aspect-video bg-muted overflow-hidden">
        {product.images[0] ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex items-center justify-center text-foreground/50">
            No Image
          </div>
        )}

        {product.isFeatured && (
          <div className="absolute top-2 left-2 p-1.5 rounded-full bg-primary text-primary-foreground z-10">
            <Star className="h-3 w-3" />
          </div>
        )}
      </div>

      <StockBadge
        stockUnits={product.stockUnits}
        lowStockAlert={product.lowStockAlert}
      />

      <CardContent className="p-4">
        <p className="text-xs text-primary uppercase font-medium">
          {product.categoryName}
        </p>

        <h3 className="font-semibold mt-1 truncate">{product.name}</h3>

        <div className="flex justify-between items-end mt-4">
          <div>
            <p className="text-xs text-muted-foreground uppercase">Pricing</p>
            <div className="flex items-baseline gap-2">
              <span className="font-bold text-lg">
                ${product.discountPrice || product.basePrice}
              </span>
              {product.discountPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ${product.basePrice}
                </span>
              )}
            </div>
          </div>

          <div className="text-right">
            <p className="text-xs text-muted-foreground uppercase">Stock</p>
            <span
              className={cn(
                "font-medium",
                product.stockUnits <= (product.lowStockAlert || 10)
                  ? "text-destructive"
                  : "",
              )}
            >
              {product.stockUnits}
            </span>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4 pt-4 border-t">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onView(product)}
            className="hover:bg-blue-700 text-blue-500"
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(product)}
            className="hover:bg-yellow-700 text-yellow-500"
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(product)}
            className="hover:bg-red-700 text-red-500"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
