export interface ICategory {
  id: string;
  name: string;
  description?: string;
  productCount: number;
  createdAt: string;
}

export interface ICreateCategoryDto {
  name: string;
  description?: string;
}

export interface IUpdateCategoryDto {
  name?: string;
  description?: string;
}
