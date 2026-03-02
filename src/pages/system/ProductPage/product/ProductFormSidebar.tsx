import {
  SettingsIcon,
  ChartColumnIcon,
  ImageIcon,
  GlobeIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMemo } from "react";
import { calculateMargin } from "@/utils/priceHelpers";
import { ProductStep } from "@/enums/product.enums";

type Props = {
  activeStep: ProductStep;
  setActiveStep: (step: ProductStep) => void;
  errors: Record<string, string>;
  formData: {
    basePrice: number;
    costPrice: number;
    discountPrice?: number;
  };
};

export function ProductFormSidebar({
  activeStep,
  setActiveStep,
  errors,
  formData,
}: Props) {
  const stepHasError = {
    general: ["name", "category", "brand"],
    pricing: ["basePrice", "costPrice"],
    media: ["images"],
    seo: ["metaTitle", "metaDescription"],
  };

  const hasError = (step: keyof typeof stepHasError) =>
    stepHasError[step].some((field) => errors[field]);

  const margin = useMemo(() => {
    return calculateMargin(
      formData.basePrice,
      formData.costPrice,
      formData.discountPrice,
    );
  }, [formData]);

  return (
    <div className="col-span-3 space-y-3">
      {[
        { key: "general", label: "General Info", icon: SettingsIcon },
        { key: "pricing", label: "Pricing & Stock", icon: ChartColumnIcon },
        { key: "media", label: "Product Media", icon: ImageIcon },
        { key: "seo", label: "Search Engine", icon: GlobeIcon },
      ].map((item) => {
        const showError = hasError(item.key as keyof typeof stepHasError);

        return (
          <Button
            key={item.key}
            onClick={() => setActiveStep(item.key as any)}
            className={`w-full flex justify-start gap-2 p-3 rounded-lg opacity-90 transition ${
              activeStep === item.key
                ? "!bg-gray-500 text-black shadow-sm"
                : "bg-transparent hover:!bg-gray-300 text-black"
            }`}
          >
            <item.icon className="h-4 w-4" />
            <span className="text-sm font-medium">{item.label}</span>

            {showError && (
              <span className="ml-auto w-2 h-2 bg-red-500 rounded-full"></span>
            )}
          </Button>
        );
      })}

      <div className="mt-6 p-6 bg-gray-100 rounded-lg text-center">
        <div className="text-xs text-gray-500">EST. MARGIN</div>
        <div
          className={`text-xl font-bold ${
            margin > 20 ? "text-green-600" : "text-red-500"
          }`}
        >
          {margin.toFixed(1)}%
        </div>
      </div>
    </div>
  );
}
