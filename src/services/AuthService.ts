import instance from "@/libs/axios";
import {
  ILoginDto,
  IRefreshTokenDto,
  TLoginResponse,
  IApiResponse,
  IAuthUser,
} from "@/types/auth";

export const loginApi = async (data: ILoginDto): Promise<TLoginResponse> => {
  return instance.post<TLoginResponse, TLoginResponse>("/api/auth/login", data);
};

export const refreshTokenApi = async (
  data: IRefreshTokenDto,
): Promise<TLoginResponse> => {
  return instance.post<TLoginResponse, TLoginResponse>(
    "/api/auth/refresh",
    data,
  );
};

export const getMeApi = async (): Promise<IApiResponse<IAuthUser>> => {
  return instance.get<IApiResponse<IAuthUser>, IApiResponse<IAuthUser>>(
    "/api/auth/me",
  );
};

export const logoutApi = async (): Promise<IApiResponse<null>> => {
  return instance.post<IApiResponse<null>, IApiResponse<null>>(
    "/api/auth/logout",
  );
};
