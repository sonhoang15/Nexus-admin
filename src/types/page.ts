export type TPageStatus = "PUBLISHED" | "DRAFT";

export interface IPage {
  id: string;
  title: string;
  slug: string;
  content?: string;
  status: TPageStatus;
  featuredImage?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface ICreatePageDto {
  title: string;
  slug?: string;
  content?: string;
  status?: TPageStatus;
  featuredImage?: File;
}

export interface IUpdatePageDto {
  title?: string;
  slug?: string;
  content?: string;
  status?: TPageStatus;
  featuredImage?: File;
}
