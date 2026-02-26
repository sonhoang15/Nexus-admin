import instance from "@/libs/axios";
import {
  ILoginDto,
  IRefreshTokenDto,
  TLoginResponse,
  IApiResponse,
  IAuthUser,
  IAuthData,
} from "@/types/auth";

export const loginService = async (data: ILoginDto): Promise<IAuthData> => {
  return instance.post<IAuthData, IAuthData>("/api/auth/login", data);
};

export const refreshTokenService = async (
  data: IRefreshTokenDto,
): Promise<TLoginResponse> => {
  const res = await instance.post<TLoginResponse>("/api/auth/refresh", data);
  return res.data;
};

export const getMeService = async (): Promise<IApiResponse<IAuthUser>> => {
  return instance.get<IApiResponse<IAuthUser>, IApiResponse<IAuthUser>>(
    "/api/auth/me",
  );
};

export const logoutService = async (): Promise<IApiResponse<null>> => {
  return instance.post<IApiResponse<null>, IApiResponse<null>>(
    "/api/auth/logout",
  );
};
