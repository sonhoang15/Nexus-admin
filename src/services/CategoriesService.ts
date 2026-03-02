import instance from "@/libs/axios";
import {
  ICategory,
  ICreateCategoryDto,
  IUpdateCategoryDto,
  ICategoryListResponse,
} from "@/types/category";
import { IApiResponse } from "@/types";
import { throwServiceError } from "@/utils/errorServiceHelper";
import { ECategoryApi } from "@/enums/service.enums";

export const getCategoriesService = async (
  limit = 10,
): Promise<ICategory[]> => {
  try {
    const { data } = await instance.get<IApiResponse<ICategoryListResponse>>(
      ECategoryApi.BASE,
      {
        params: { limit },
      },
    );

    return data.data.items ?? [];
  } catch (error) {
    return throwServiceError(error);
  }
};

export const createCategoryService = async (
  payload: ICreateCategoryDto,
): Promise<ICategory> => {
  try {
    const { data } = await instance.post<IApiResponse<ICategory>>(
      ECategoryApi.BASE,
      payload,
    );

    return data.data;
  } catch (error) {
    return throwServiceError(error);
  }
};

export const updateCategoryService = async (
  id: string,
  payload: IUpdateCategoryDto,
): Promise<ICategory> => {
  try {
    const { data } = await instance.put<IApiResponse<ICategory>>(
      `${ECategoryApi.BASE}/${id}`,
      payload,
    );

    return data.data;
  } catch (error) {
    return throwServiceError(error);
  }
};

export const deleteCategoryService = async (id: string): Promise<void> => {
  try {
    await instance.delete(`${ECategoryApi.BASE}/${id}`);
  } catch (error) {
    return throwServiceError(error);
  }
};
