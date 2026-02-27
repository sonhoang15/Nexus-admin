import instance from "@/libs/axios";
import {
  IDocumentFromBE,
  IDocumentPayload,
  IPaginatedResponse,
} from "@/types/document";

const toFormData = (payload: IDocumentPayload): FormData => {
  const formData = new FormData();

  if (payload.title) {
    formData.append("title", payload.title);
  }

  formData.append("file", payload.file);

  return formData;
};

export const documentService = {
  getAll: async (): Promise<IDocumentFromBE[]> => {
    const res = (await instance.get<IPaginatedResponse<IDocumentFromBE>>(
      "/api/documents",
    )) as unknown as IPaginatedResponse<IDocumentFromBE>;

    return res.items;
  },

  getById: async (id: string): Promise<IDocumentFromBE> => {
    return (await instance.get<IDocumentFromBE>(
      `/api/documents/${id}`,
    )) as unknown as IDocumentFromBE;
  },

  create: (payload: IDocumentPayload): Promise<IDocumentFromBE> => {
    const formData = toFormData(payload);

    return instance.post("/api/documents", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  delete: (id: string): Promise<void> => {
    return instance.delete(`/api/documents/${id}`);
  },

  download: (id: string): Promise<Blob> => {
    return instance.get(`/api/documents/${id}/download`, {
      responseType: "blob",
    });
  },
};
