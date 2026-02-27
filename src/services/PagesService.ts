import instance from "@/libs/axios";
import { IPage } from "@/types/page";

export interface PagePayload {
  title: string;
  slug: string;
  content: string;
  status: "PUBLISHED" | "DRAFT";
  featuredImage?: File | null;
}

interface PaginatedResponse<T> {
  items: T[];
  meta: any;
}

const toFormData = (payload: PagePayload): FormData => {
  const formData = new FormData();

  formData.append("title", payload.title);
  formData.append("slug", payload.slug);
  formData.append("content", payload.content);
  formData.append("status", payload.status);

  if (payload.featuredImage) {
    formData.append("featuredImage", payload.featuredImage);
  }

  return formData;
};

export const pageService = {
  getAll: async (): Promise<IPage[]> => {
    const res = (await instance.get<PaginatedResponse<IPage>>(
      "/api/pages",
    )) as unknown as PaginatedResponse<IPage>;

    return res.items;
  },
  getById: async (id: string): Promise<IPage> => {
    return (await instance.get<IPage>(`/api/pages/${id}`)) as unknown as IPage;
  },

  getBySlug: (slug: string): Promise<IPage> => {
    return instance.get(`/api/pages/slug/${slug}`);
  },

  create: (payload: PagePayload): Promise<IPage> => {
    const formData = toFormData(payload);

    return instance.post("/api/pages", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  update: (id: string, payload: PagePayload): Promise<IPage> => {
    const formData = toFormData(payload);

    return instance.put(`/api/pages/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  delete: (id: string): Promise<void> => {
    return instance.delete(`/api/pages/${id}`);
  },
};
