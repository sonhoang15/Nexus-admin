export interface IDashboardStats {
  totalUsers: number;
  totalProducts: number;
  totalCategories: number;
  publishedPages: number;
  draftPages: number;
  totalDocuments: number;
  lowStockProducts: number;
  outOfStockProducts: number;
  featuredProducts: number;
}

export interface IDashboardGrowth {
  labels: string[];
  datasets: {
    name: string;
    data: number[];
  }[];
}

export interface ICategorySplitItem {
  name: string;
  value: number;
  percentage: number;
}

export interface ILatestProduct {
  id: string;
  name: string;
  sku: string;
  basePrice: string;
  mainImage: string;
  createdAt: string;
}

export interface IContentStatusItem {
  id: string;
  action: "created" | "updated";
  createdAt: string;
  updatedAt: string;

  title: string;
  slug: string;
  content: string;
  status: "PUBLISHED" | "DRAFT";
  featuredImage?: File;
}
