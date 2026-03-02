import instance from "@/libs/axios";
import { IDocumentFromBE, IDocumentPayload } from "@/types";
import { throwServiceError } from "@/utils/errorServiceHelper";
import { EDocumentApi } from "@/enums/service.enums";

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
    try {
      const res = await instance.get(EDocumentApi.BASE);
      return res.data.data.items ?? [];
    } catch (error) {
      return throwServiceError(error);
    }
  },

  create: async (payload: IDocumentPayload): Promise<IDocumentFromBE> => {
    try {
      const formData = toFormData(payload);

      const { data } = await instance.post(EDocumentApi.BASE, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return data.data;
    } catch (error) {
      return throwServiceError(error);
    }
  },

  getById: async (id: string): Promise<IDocumentFromBE> => {
    try {
      const res = await instance.get(`${EDocumentApi.BASE}/${id}`);
      return res.data.data;
    } catch (error) {
      return throwServiceError(error);
    }
  },

  download: async (id: string): Promise<Blob> => {
    try {
      const res = await instance.get(`${EDocumentApi.BASE}/${id}/download`, {
        responseType: "blob",
      });
      return res.data;
    } catch (error) {
      return throwServiceError(error);
    }
  },

  delete: async (id: string): Promise<void> => {
    try {
      await instance.delete(`${EDocumentApi.BASE}/${id}`);
    } catch (error) {
      return throwServiceError(error);
    }
  },

  preview: async (id: string): Promise<string> => {
    try {
      const res = await instance.get(`${EDocumentApi.BASE}/${id}/preview`);
      console.log("previewUrl:", res.data.data);
      return res.data.data;
    } catch (error) {
      return throwServiceError(error);
    }
  },
};
