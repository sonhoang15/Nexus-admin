import { TProduct } from "@/types";

export function getStockStatus(product: TProduct) {
  if (product.stockUnits <= (product.lowStockAlert || 10)) {
    return { label: "LOW STOCK", variant: "destructive" as const };
  }
  return { label: "IN STOCK", variant: "default" as const };
}
