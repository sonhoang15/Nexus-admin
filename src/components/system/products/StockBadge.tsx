import { Badge } from "@/components/ui/badge";
import { cn } from "@/libs/utils";

type Props = {
  label: string;
  variant: "success" | "destructive" | "secondary";
};

export function StockBadge({ label, variant }: Props) {
  return (
    <Badge
      className={cn(
        "absolute top-2 right-2",
        variant === "destructive" &&
          "!bg-destructive text-destructive-foreground",
        variant === "success" && "!bg-success text-success-foreground",
        variant === "secondary" && "!bg-secondary text-secondary-foreground",
      )}
    >
      {label}
    </Badge>
  );
}
