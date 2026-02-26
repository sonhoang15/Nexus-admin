import instance from "@/libs/axios";

export interface Page {
  id: number;
  title: string;
  slug: string;
  content: string;
  thumbnail?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PagePayload {
  title: string;
  slug: string;
  content: string;
  thumbnail?: File | null;
}

const toFormData = (payload: PagePayload): FormData => {
  const formData = new FormData();

  formData.append("title", payload.title);
  formData.append("slug", payload.slug);
  formData.append("content", payload.content);

  if (payload.thumbnail) {
    formData.append("thumbnail", payload.thumbnail);
  }

  return formData;
};

export const pageService = {
  getAll: (): Promise<Page[]> => {
    return instance.get("/api/pages");
  },

  getById: (id: number): Promise<Page> => {
    return instance.get(`/api/pages/${id}`);
  },

  getBySlug: (slug: string): Promise<Page> => {
    return instance.get(`/api/pages/slug/${slug}`);
  },

  create: (payload: PagePayload): Promise<Page> => {
    const formData = toFormData(payload);

    return instance.post("/api/pages", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  update: (id: number, payload: PagePayload): Promise<Page> => {
    const formData = toFormData(payload);

    return instance.put(`/api/pages/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  delete: (id: number): Promise<void> => {
    return instance.delete(`/api/pages/${id}`);
  },
};
