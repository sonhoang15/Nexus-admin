import instance from "@/libs/axios";
import { IPage } from "@/types/page";
import { IApiResponse } from "@/types";
import { throwServiceError } from "@/utils/errorServiceHelper";
import { EPageApi } from "@/enums/service.enums";

export interface PagePayload {
  title: string;
  slug: string;
  content: string;
  status: "PUBLISHED" | "DRAFT";
  featuredImage?: File | null;
}

interface PaginatedResponse<T> {
  items: T[];
  meta: unknown;
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

export const getPagesService = async (): Promise<IPage[]> => {
  try {
    const { data } = await instance.get<IApiResponse<PaginatedResponse<IPage>>>(
      EPageApi.BASE,
    );

    return data.data.items ?? [];
  } catch (error) {
    return throwServiceError(error);
  }
};

export const getPageByIdService = async (id: string): Promise<IPage> => {
  try {
    const { data } = await instance.get<IApiResponse<IPage>>(
      `${EPageApi.BASE}/${id}`,
    );

    return data.data;
  } catch (error) {
    return throwServiceError(error);
  }
};

export const getPageBySlugService = async (slug: string): Promise<IPage> => {
  try {
    const { data } = await instance.get<IApiResponse<IPage>>(
      `${EPageApi.BY_SLUG}/${slug}`,
    );

    return data.data;
  } catch (error) {
    return throwServiceError(error);
  }
};

export const createPageService = async (
  payload: PagePayload,
): Promise<IPage> => {
  try {
    const formData = toFormData(payload);

    const { data } = await instance.post<IApiResponse<IPage>>(
      EPageApi.BASE,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    return data.data;
  } catch (error) {
    return throwServiceError(error);
  }
};

export const updatePageService = async (
  id: string,
  payload: PagePayload,
): Promise<IPage> => {
  try {
    const formData = toFormData(payload);

    const { data } = await instance.put<IApiResponse<IPage>>(
      `${EPageApi.BASE}/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    return data.data;
  } catch (error) {
    return throwServiceError(error);
  }
};

export const deletePageService = async (id: string): Promise<void> => {
  try {
    await instance.delete(`${EPageApi.BASE}/${id}`);
  } catch (error) {
    return throwServiceError(error);
  }
};
