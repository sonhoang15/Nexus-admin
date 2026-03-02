import { useState } from "react";
import { FormActions } from "@/components/common/FormActions";
import { useCategoryOptions } from "@/hooks/useCategoryOptions";
import { ProductFormSidebar } from "./ProductFormSidebar";
import { GeneralStep } from "@/pages/system/ProductPage/product/steps/GeneralStep";
import { PricingStep } from "@/pages/system/ProductPage/product/steps/PricingStep";
import {
  TImageItem,
  MediaStep,
} from "@/pages/system/ProductPage/product/steps/MediaStep";
import { SeoStep } from "@/pages/system/ProductPage/product/steps/SeoStep";
import { Package } from "lucide-react";
import { useMemo } from "react";
import { TProductFormData } from "@/types/product";
import { ProductStep } from "@/enums/product.enums";

type Props = {
  editingProduct: boolean;
  formData: TProductFormData;
  setFormData: (data: TProductFormData) => void;
  onClose: () => void;
  onSubmit: () => void;
  errors?: any;
  tagInput: string;
  setTagInput: (value: string) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleRemoveTag: (tag: string) => void;
  handleRemoveImage: (image: any) => void;
};

export function ProductForm({
  editingProduct,
  formData,
  setFormData,
  onClose,
  onSubmit,
  tagInput,
  setTagInput,
  handleKeyDown,
  handleRemoveTag,
  handleRemoveImage,
}: Props) {
  const [activeStep, setActiveStep] = useState<ProductStep>(
    ProductStep.GENERAL,
  );

  const { categories } = useCategoryOptions();

  const errors = useMemo(() => {
    const newErrors: Record<string, string> = {};
    const base = Number(formData.basePrice);
    const cost = Number(formData.costPrice);
    const discount = Number(formData.discountPrice);

    if (!formData?.name?.trim()) {
      newErrors.name = "Product name is required";
    }

    if (!formData?.sku || !formData.sku.trim()) {
      newErrors.sku = "SKU is required";
    } else if (!/^[A-Z]{3}-\d{3}-[A-Z]{2}$/.test(formData.sku)) {
      newErrors.sku = "SKU must follow format: APL-123-MB";
    }
    if (!formData?.categoryId) {
      newErrors.categoryId = "Category selection is required";
    }

    if (!formData?.brand?.trim()) {
      newErrors.brand = "Brand is required";
    }

    if (!formData?.manufacturer?.trim()) {
      newErrors.manufacturer = "Manufacturer is required";
    }

    const tagsArray =
      formData?.tags.map((t: string) => t.trim()).filter(Boolean) || [];

    if (tagsArray.length < 1) {
      newErrors.tags = "At least 1 tag is required";
    }

    if (!base || base <= 0) {
      newErrors.basePrice = "Base price must be greater than 0";
    }

    if (
      formData.costPrice === undefined ||
      formData.costPrice === null ||
      cost <= 0
    ) {
      newErrors.costPrice = "Cost price must be greater than 0";
    } else if (cost >= base) {
      newErrors.costPrice = "Cost must be lower than Base Price";
    }

    if (
      formData.discountPrice !== undefined &&
      formData.discountPrice !== null &&
      discount > 0
    ) {
      if (discount >= base) {
        newErrors.discountPrice =
          "Discount price must be lower than Base Price";
      } else if (discount <= cost) {
        newErrors.discountPrice =
          "Discount price must be greater than Cost Price";
      }
    }

    if (
      formData.stockUnits === undefined ||
      formData.stockUnits === null ||
      formData.stockUnits < 0
    ) {
      newErrors.stockUnits = "Stock units cannot be negative";
    }

    if (!formData?.images || formData.images.length < 1) {
      newErrors.images = "At least 1 product image is required";
    }

    return newErrors;
  }, [formData]);

  const isValid = Object.keys(errors).length === 0;

  return (
    <div className="bg-card border rounded-xl p-6 max-w-6xl mx-auto shadow-md shadow-black/10">
      <div className="flex items-center gap-3 mb-8">
        <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center text-white">
          <Package className="h-6 w-6" />
        </div>
        <div>
          <h3 className="text-xl font-black text-slate-900">
            {editingProduct ? "Edit Product" : "Create New Product"}
          </h3>
          <p className="text-slate-500 text-xs font-medium">
            Configure all product specifications and market details.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-6">
        <ProductFormSidebar
          formData={formData}
          activeStep={ProductStep.GENERAL}
          setActiveStep={setActiveStep}
          errors={errors}
        />

        <div className="col-span-9 space-y-6">
          {activeStep === "general" && (
            <GeneralStep
              tagInput={tagInput}
              setTagInput={setTagInput}
              handleKeyDown={handleKeyDown}
              handleRemoveTag={handleRemoveTag}
              errors={errors}
              formData={formData}
              setFormData={setFormData}
              categories={categories}
            />
          )}

          {activeStep === "pricing" && (
            <PricingStep
              errors={errors}
              formData={formData}
              setFormData={setFormData}
            />
          )}

          {activeStep === "media" && (
            <MediaStep
              errors={errors}
              images={formData?.images}
              setImages={(files: TImageItem[]) =>
                setFormData({ ...formData, images: files })
              }
              onRemoveImage={handleRemoveImage}
            />
          )}

          {activeStep === "seo" && (
            <SeoStep formData={formData} setFormData={setFormData} />
          )}

          <FormActions
            submitText={editingProduct ? "Update" : "Create"}
            onCancel={onClose}
            onSubmit={onSubmit}
            isDisabled={!isValid}
            CancelText="Cancel"
          />
        </div>
      </div>
    </div>
  );
}
