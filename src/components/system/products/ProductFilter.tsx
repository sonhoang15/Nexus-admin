import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown } from "lucide-react";
import { TProductFilters } from "@/types/product";
import { EStatus, EPromotion, ESort } from "@/enums/filters.enums";

const CATEGORY_OPTIONS = [
  "Electronics",
  "Accessories",
  "Audio",
  "Home Appliances",
  "Wearables",
];

export function ProductFilters({
  value,
  onChange,
}: {
  value: TProductFilters;
  onChange: (value: TProductFilters) => void;
}) {
  const update = <K extends keyof TProductFilters>(
    key: K,
    val: TProductFilters[K],
  ) => {
    onChange({ ...value, [key]: val });
  };

  const toggleCategory = (category: string) => {
    const exists = value.categories.includes(category);
    update(
      "categories",
      exists
        ? value.categories.filter((c) => c !== category)
        : [...value.categories, category],
    );
  };

  return (
    <div className="rounded-2xl border bg-background p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="space-y-2">
        <label className="text-xs font-semibold text-muted-foreground">
          CATEGORIES
        </label>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-between font-normal"
            >
              {value.categories.length
                ? `${value.categories.length} Categories Selected`
                : "Select Categories"}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-64 space-y-3">
            <Button
              variant="ghost"
              size="sm"
              className="text-primary px-0"
              onClick={() => update("categories", [])}
            >
              Clear selection
            </Button>

            {CATEGORY_OPTIONS.map((c) => (
              <div key={c} className="flex items-center gap-2">
                <Checkbox
                  checked={value.categories.includes(c)}
                  onCheckedChange={() => toggleCategory(c)}
                />
                <span className="text-sm">{c}</span>
              </div>
            ))}
          </PopoverContent>
        </Popover>
      </div>

      <FilterSelect
        label="STATUS"
        value={value.status}
        onChange={(v) => update("status", v as TProductFilters["status"])}
        options={Object.values(EStatus)}
      />

      <FilterSelect
        label="PROMOTION"
        value={value.promotion}
        onChange={(v) => update("promotion", v as TProductFilters["promotion"])}
        options={Object.values(EPromotion)}
      />

      <FilterInput
        label="MIN PRICE ($)"
        value={value.minPrice}
        onChange={(v) => update("minPrice", v)}
      />

      <FilterInput
        label="MAX PRICE ($)"
        value={value.maxPrice}
        onChange={(v) => update("maxPrice", v)}
      />

      <FilterSelect
        label="SORT RESULTS BY"
        value={value.sort}
        onChange={(v) => update("sort", v as TProductFilters["sort"])}
        options={Object.values(ESort)}
      />
    </div>
  );
}

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-semibold text-muted-foreground">
        {label}
      </label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((o) => (
            <SelectItem key={o} value={o}>
              {o}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

function FilterInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-semibold text-muted-foreground">
        {label}
      </label>
      <Input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}
