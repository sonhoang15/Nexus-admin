import { ReactNode } from "react";
import { Label } from "@/components/ui/label";

type Props = {
  label: string;
  error?: string;
  children: ReactNode;
};

export function FormField({ label, error, children }: Props) {
  return (
    <div className="space-y-2">
      <Label className="text-xs uppercase tracking-wide text-muted-foreground">
        {label}
      </Label>
      {children}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
