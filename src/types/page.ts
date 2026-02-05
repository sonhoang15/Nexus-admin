export type TPageStatus = "PUBLISHED" | "DRAFT";

export interface TPage {
  id: string;
  title: string;
  slug: string;
  content?: string;
  status: TPageStatus;
  featuredImage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TCreatePageDto {
  title: string;
  slug?: string;
  content?: string;
  status?: TPageStatus;
  featuredImage?: File;
}

export interface TUpdatePageDto {
  title?: string;
  slug?: string;
  content?: string;
  status?: TPageStatus;
  featuredImage?: File;
}
