import instance from "@/libs/axios";
import {
  ILoginDto,
  IRefreshTokenDto,
  TLoginResponse,
  IApiResponse,
  IAuthUser,
} from "@/types/auth";

export const loginService = async (
  data: ILoginDto,
): Promise<TLoginResponse> => {
  return instance.post<TLoginResponse, TLoginResponse>("/api/auth/login", data);
};

export const refreshTokenService = async (
  data: IRefreshTokenDto,
): Promise<TLoginResponse> => {
  return instance.post<TLoginResponse, TLoginResponse>(
    "/api/auth/refresh",
    data,
  );
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
