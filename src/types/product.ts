import { ImageItem } from "@/components/system/products/steps/MediaStep";
import { EStatus, EPromotion, ESort } from "@/enums/filters.enums";

export type TProductFilters = {
  categories: string[];
  status: EStatus;
  promotion: EPromotion;
  minPrice: number;
  maxPrice: number;
  sort: ESort;
};

export interface IProductImage {
  id: string;
  productId: string;
  url: string;
  isMain: boolean;
  sortOrder: number;
}

export interface TProductFormData {
  sku: string;
  barcode: string;
  name: string;
  description: string;
  categoryId: string;
  brand: string;
  manufacturer: string;
  weight: string;
  tags: string[];
  isFeatured: boolean;
  basePrice: number;
  costPrice: number;
  discountPrice: number;
  stockUnits: number;
  lowStockAlert: number;
  metaTitle: string;
  metaDescription: string;
  images: ImageItem[];
  dimensions?: string;
}

export interface IProduct {
  id: string;
  sku: string;
  barcode?: string;
  name: string;
  description?: string;
  category?: {
    id: string;
    name: string;
  };
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
  mainImage?: string[];
  images?: IProductImage[];
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
  images?: File[];
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

export interface IProductListResponse {
  items: IProduct[];
  data: {
    items: IProduct[];
  };
}
