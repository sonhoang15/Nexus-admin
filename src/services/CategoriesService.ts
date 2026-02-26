import instance from "@/libs/axios";
import {
  ICategory,
  ICreateCategoryDto,
  IUpdateCategoryDto,
  ICategoryListResponse,
} from "@/types/category";

export const getCategoriesService = async (
  limit = 10,
): Promise<ICategory[]> => {
  const res = await instance.get<ICategoryListResponse, ICategoryListResponse>(
    "/api/categories",
    {
      params: { limit },
    },
  );

  return res.items ?? [];
};

export const createCategoryService = async (data: ICreateCategoryDto) => {
  return instance.post("/api/categories", data);
};

export const updateCategoryService = async (
  id: string,
  data: IUpdateCategoryDto,
) => {
  return instance.put(`/api/categories/${id}`, data);
};

export const deleteCategoryService = async (id: string) => {
  return instance.delete(`/api/categories/${id}`);
};
