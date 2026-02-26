import {
  SettingsIcon,
  ChartColumnIcon,
  ImageIcon,
  GlobeIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  activeStep: "general" | "pricing" | "media" | "seo";
  setActiveStep: (step: any) => void;
  errors: Record<string, string>;
};

export function ProductFormSidebar({
  activeStep,
  setActiveStep,
  errors,
}: Props) {
  const stepHasError = {
    general: ["name", "category", "brand"],
    pricing: ["basePrice", "costPrice"],
    media: ["images"],
    seo: ["metaTitle", "metaDescription"],
  };

  const hasError = (step: keyof typeof stepHasError) =>
    stepHasError[step].some((field) => errors[field]);

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

      <div className="mt-6 p-6 bg-gray-100 rounded-lg text-center ">
        <div className="text-xs text-gray-500">EST. MARGIN</div>
        <div className="text-xl font-bold text-red-500">0%</div>
      </div>
    </div>
  );
}
