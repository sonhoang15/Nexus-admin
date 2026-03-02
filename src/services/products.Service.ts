import instance from "@/libs/axios";
import {
  IProduct,
  ICreateProductDto,
  IUpdateProductDto,
  IProductListResponse,
  TProductFilters,
  TProductFormData,
} from "@/types";
import { throwServiceError } from "@/utils/errorServiceHelper";
import { EProductApi } from "@/enums/service.enums";

const buildFormData = (
  data: ICreateProductDto | IUpdateProductDto,
): FormData => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    if (Array.isArray(value)) {
      value.forEach((item) => {
        if (item instanceof File) {
          formData.append(key, item);
        } else {
          formData.append(`${key}[]`, item);
        }
      });
    } else if (typeof value === "boolean" || typeof value === "number") {
      formData.append(key, String(value));
    } else {
      formData.append(key, value as string);
    }
  });

  return formData;
};

export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export const getProducts = async (
  params?: Partial<TProductFilters> & {
    page?: number;
    limit?: number;
  },
): Promise<IProductListResponse> => {
  try {
    const { data } = await instance.get<ApiResponse<IProductListResponse>>(
      EProductApi.BASE,
      { params },
    );

    return data.data;
  } catch (error) {
    return throwServiceError(error);
  }
};

export const getProductById = async (id: string): Promise<IProduct> => {
  try {
    const { data } = await instance.get<ApiResponse<IProduct>>(
      `${EProductApi.BASE}/${id}`,
    );

    return data.data;
  } catch (error) {
    return throwServiceError(error);
  }
};

export const createProduct = async (
  payload: TProductFormData,
): Promise<IProduct> => {
  try {
    const formData = new FormData();

    Object.entries(payload).forEach(([key, value]) => {
      if (key === "images") return;
      if (value === undefined || value === null) return;

      if (Array.isArray(value)) {
        value.forEach((v) => {
          formData.append(`${key}[]`, v);
        });
      } else if (typeof value === "boolean" || typeof value === "number") {
        formData.append(key, String(value));
      } else {
        formData.append(key, value as string);
      }
    });

    payload.images
      .filter((img) => img.type === "new")
      .forEach((img) => {
        formData.append("images", img.file);
      });

    const { data } = await instance.post<ApiResponse<IProduct>>(
      EProductApi.BASE,
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

export const updateProduct = async (
  id: string,
  payload: IUpdateProductDto,
): Promise<IProduct> => {
  try {
    const formData = buildFormData(payload);

    const { data } = await instance.put<ApiResponse<IProduct>>(
      `${EProductApi.BASE}/${id}`,
      formData,
    );

    return data.data;
  } catch (error) {
    return throwServiceError(error);
  }
};

export const deleteProduct = async (id: string): Promise<void> => {
  try {
    await instance.delete(`${EProductApi.BASE}/${id}`);
  } catch (error) {
    return throwServiceError(error);
  }
};

export const uploadProductImages = async (
  productId: string,
  files: File[],
): Promise<IProduct> => {
  try {
    const formData = new FormData();

    files.forEach((file) => {
      formData.append("images", file);
    });

    const { data } = await instance.post<ApiResponse<IProduct>>(
      `${EProductApi.BASE}/${productId}/images`,
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

export const deleteProductImage = async (
  productId: string,
  imageId: string,
): Promise<void> => {
  try {
    await instance.delete(`${EProductApi.BASE}/${productId}/images/${imageId}`);
  } catch (error) {
    return throwServiceError(error);
  }
};
