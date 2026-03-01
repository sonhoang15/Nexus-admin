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
}
