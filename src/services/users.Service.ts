import instance from "@/libs/axios";
import {
  IUser,
  ICreateUserDto,
  IUpdateUserDto,
  IUserListResponse,
} from "@/types/user";
import { throwServiceError } from "@/utils/errorServiceHelper";
import { EUserApi } from "@/enums/service.enums";

export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export const getUsersService = async (limit = 10): Promise<IUser[]> => {
  try {
    const res = await instance.get<ApiResponse<IUserListResponse>>(
      EUserApi.BASE,
      { params: { limit } },
    );

    return res.data.data.items ?? [];
  } catch (error) {
    return throwServiceError(error);
  }
};

export const getUserByIdService = async (id: string): Promise<IUser> => {
  try {
    const res = await instance.get<ApiResponse<IUser>>(
      `${EUserApi.BASE}/${id}`,
    );

    return res.data.data;
  } catch (error) {
    return throwServiceError(error);
  }
};

export const createUserService = async (
  data: ICreateUserDto,
): Promise<IUser> => {
  try {
    const res = await instance.post<ApiResponse<IUser>>(EUserApi.BASE, data);
    console.log("create user called", res.data.data);
    return res.data.data;
  } catch (error) {
    return throwServiceError(error);
  }
};

export const updateUserService = async (
  id: string,
  data: IUpdateUserDto,
): Promise<IUser> => {
  try {
    const res = await instance.put<ApiResponse<IUser>>(
      `${EUserApi.BASE}/${id}`,
      data,
    );

    return res.data.data;
  } catch (error) {
    return throwServiceError(error);
  }
};

export const deleteUserService = async (id: string): Promise<void> => {
  try {
    await instance.delete(`${EUserApi.BASE}/${id}`);
  } catch (error) {
    return throwServiceError(error);
  }
};
