import { TUserRole } from "@/types/user";

export interface ILoginDto {
  email: string;
  password: string;
}

export interface IRefreshTokenDto {
  refreshToken: string;
}

export interface IAuthUser {
  id: string;
  fullName: string;
  email: string;
  role: TUserRole;
  avatarUrl: string | null;
}

export interface IAuthData {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: IAuthUser;
  message: string;
}

export interface IApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export type TLoginResponse = IApiResponse<IAuthData>;
