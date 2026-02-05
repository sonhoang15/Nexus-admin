import { Badge } from "@/components/ui/badge";
import { cn } from "@/libs/utils";

type Props = {
  stockUnits: number;
  lowStockAlert?: number;
};

export function StockBadge({ stockUnits, lowStockAlert = 10 }: Props) {
  const isLowStock = stockUnits <= lowStockAlert;

  return (
    <Badge
      className={cn(
        "absolute top-2 right-2",
        isLowStock
          ? "!bg-destructive text-destructive-foreground"
          : "!bg-success text-success-foreground",
      )}
    >
      {isLowStock ? "LOW STOCK" : "IN STOCK"}
    </Badge>
  );
}
