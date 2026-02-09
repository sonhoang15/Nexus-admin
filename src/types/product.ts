import { EStatus, EPromotion, ESort } from "@/enums/filters.enums";

export type TProductFilters = {
  categories: string[];
  status: EStatus;
  promotion: EPromotion;
  minPrice: number;
  maxPrice: number;
  sort: ESort;
};

export interface IProduct {
  id: string;
  sku: string;
  barcode?: string;
  name: string;
  description?: string;
  categoryId: string;
  categoryName?: string;
  brand: string;
  manufacturer: string;
  weight?: string;
  dimensions?: string;
  tags: string[];
  isFeatured: boolean;
  basePrice: number;
  costPrice?: number;
  discountPrice?: number;
  stockUnits: number;
  lowStockAlert?: number;
  metaTitle?: string;
  metaDescription?: string;
  images: string[];
  createdAt: string;
}

export interface ICreateProductDto {
  sku: string;
  barcode?: string;
  name: string;
  description?: string;
  categoryId: string;
  brand: string;
  manufacturer: string;
  weight?: string;
  dimensions?: string;
  tags: string[];
  isFeatured?: boolean;
  basePrice: number;
  costPrice?: number;
  discountPrice?: number;
  stockUnits: number;
  lowStockAlert?: number;
  metaTitle?: string;
  metaDescription?: string;
  images: File[];
}

export interface IUpdateProductDto {
  sku?: string;
  barcode?: string;
  name?: string;
  description?: string;
  categoryId?: string;
  brand?: string;
  manufacturer?: string;
  weight?: string;
  dimensions?: string;
  tags?: string[];
  isFeatured?: boolean;
  basePrice?: number;
  costPrice?: number;
  discountPrice?: number;
  stockUnits?: number;
  lowStockAlert?: number;
  metaTitle?: string;
  metaDescription?: string;
  images?: File[];
}
