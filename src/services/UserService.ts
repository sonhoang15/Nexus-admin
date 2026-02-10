import instance from "@/libs/axios";
import {
  IUser,
  ICreateUserDto,
  IUpdateUserDto,
  IUserListResponse,
} from "@/types/user";

export const getUsersApi = async (limit = 10): Promise<IUser[]> => {
  const data = await instance.get<IUserListResponse, IUserListResponse>(
    "/api/users",
    {
      params: { limit },
    },
  );
  return data.data.items;
};

export const createUserApi = async (data: ICreateUserDto) => {
  return instance.post("/api/users", data);
};

export const updateUserApi = async (id: string, data: IUpdateUserDto) => {
  return instance.put(`/api/users/${id}`, data);
};

export const deleteUserApi = async (id: string) => {
  return instance.delete(`/api/users/${id}`);
};
