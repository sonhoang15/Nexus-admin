import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, ArrowRight } from "lucide-react";
import { TProduct } from "@/types";
import { cn } from "@/libs/utils";

interface LatestProductsProps {
  products: TProduct[];
  onViewAll: () => void;
}

export function LatestProducts({ products, onViewAll }: LatestProductsProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Latest Products</CardTitle>
          <CardDescription>
            New additions to the hardware inventory.
          </CardDescription>
        </div>
        <Button variant="ghost" size="icon" className="hover:bg-black">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {products.map((product) => (
            <div key={product.id} className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
                {product.images[0] ? (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-muted-foreground text-xs">No img</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{product.name}</p>
                <p className="text-xs text-muted-foreground uppercase">
                  {product.brand} • {product.categoryName}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-primary">
                  ${product.discountPrice || product.basePrice}
                </p>
                <p
                  className={cn(
                    "text-xs uppercase font-medium",
                    product.stockUnits <= (product.lowStockAlert || 10)
                      ? "text-destructive"
                      : "text-success",
                  )}
                >
                  {product.stockUnits} IN STOCK
                </p>
              </div>
            </div>
          ))}
        </div>
        <Button
          variant="ghost"
          className="w-full mt-4 text-muted-foreground"
          onClick={onViewAll}
        >
          View All Products
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  );
}
