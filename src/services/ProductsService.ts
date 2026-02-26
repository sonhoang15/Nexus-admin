import instance from "@/libs/axios";
import {
  IProduct,
  ICreateProductDto,
  IUpdateProductDto,
  IProductListResponse,
  TProductFilters,
  TProductFormData,
} from "@/types";

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
    } else if (typeof value === "boolean") {
      formData.append(key, String(value));
    } else if (typeof value === "number") {
      formData.append(key, String(value));
    } else {
      formData.append(key, value as string);
    }
  });

  return formData;
};

export const getProducts = async (
  params?: Partial<TProductFilters> & {
    page?: number;
    limit?: number;
  },
): Promise<IProductListResponse> => {
  return instance.get("/api/products", { params });
};

export const getProductById = async (id: string): Promise<IProduct> => {
  return instance.get(`/api/products/${id}`);
};

export const createProduct = async (
  data: TProductFormData,
): Promise<IProduct> => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (key !== "images") {
      if (Array.isArray(value)) {
        value.forEach((v) => formData.append(key, v));
      } else {
        formData.append(key, String(value ?? ""));
      }
    }
  });
  data.images
    .filter((img) => img.type === "new")
    .forEach((img) => {
      formData.append("images", img.file);
    });

  return instance.post("/api/products", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateProduct = async (
  id: string,
  data: IUpdateProductDto,
): Promise<IProduct> => {
  const formData = buildFormData(data);

  return instance.put(`/api/products/${id}`, formData);
};

export const deleteProduct = async (id: string): Promise<void> => {
  return instance.delete(`/api/products/${id}`);
};

export const uploadProductImages = async (productId: string, files: File[]) => {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("images", file);
  });

  return instance.post(`/api/products/${productId}/images`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteProductImage = async (
  productId: string,
  imageId: string,
): Promise<void> => {
  return instance.delete(`/api/products/${productId}/images/${imageId}`);
};
