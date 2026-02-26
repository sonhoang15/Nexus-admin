import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
  formData: any;
  setFormData: (data: any) => void;
  errors?: Record<string, string>;
};

export function PricingStep({ formData, setFormData, errors }: Props) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4 uppercase">
        <div className="space-y-2">
          <Label htmlFor="basePrice">Base Price *</Label>
          <Input
            id="basePrice"
            type="number"
            value={formData.basePrice}
            onChange={(e) => {
              const value = e.target.value;
              setFormData({
                ...formData,
                basePrice: value === "" ? "" : Number(value),
              });
            }}
            className={errors?.basePrice ? "border-red-500" : ""}
          />
          {errors?.basePrice && (
            <p className="text-xs text-red-500">{errors.basePrice}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="costPrice">Cost Price *</Label>
          <Input
            id="costPrice"
            type="number"
            value={formData.costPrice}
            onChange={(e) => {
              const value = e.target.value;
              setFormData({
                ...formData,
                costPrice: value === "" ? "" : Number(value),
              });
            }}
            className={errors?.costPrice ? "border-red-500" : ""}
          />
          {errors?.costPrice && (
            <p className="text-xs text-red-500">{errors.costPrice}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="discountPrice">Discount Price</Label>
          <Input
            id="discountPrice"
            type="number"
            value={formData.discountPrice}
            onChange={(e) => {
              const value = e.target.value;
              setFormData({
                ...formData,
                discountPrice: value === "" ? "" : Number(value),
              });
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 uppercase">
        <div className="space-y-2">
          <Label htmlFor="stockUnits">Stock Units *</Label>
          <Input
            id="stockUnits"
            type="number"
            value={formData.stockUnits}
            onChange={(e) => {
              const value = e.target.value;
              setFormData({
                ...formData,
                stockUnits: value === "" ? "" : Number(value),
              });
            }}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="lowStockAlert">Low Stock Alert</Label>
          <Input
            id="lowStockAlert"
            type="number"
            value={formData.lowStockAlert}
            onChange={(e) => {
              const value = e.target.value;
              setFormData({
                ...formData,
                lowStockAlert: value === "" ? "" : Number(value),
              });
            }}
          />
        </div>
      </div>
    </div>
  );
}
