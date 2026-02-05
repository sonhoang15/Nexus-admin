export interface TCategory {
  id: string;
  name: string;
  description?: string;
  productCount: number;
  createdAt: string;
}

export interface TCreateCategoryDto {
  name: string;
  description?: string;
}

export interface TUpdateCategoryDto {
  name?: string;
  description?: string;
}
