export type TUserRole = "ADMIN" | "SUPER_ADMIN";
export type TUserStatus = "ACTIVE" | "INACTIVE";

export interface TUser {
  id: string;
  fullName: string;
  email: string;
  role: TUserRole;
  status: TUserStatus;
  createdAt: string;
}

export interface TCreateUserDto {
  fullName: string;
  email: string;
  password: string;
  role?: TUserRole;
  status?: TUserStatus;
}

export interface TUpdateUserDto {
  fullName?: string;
  email?: string;
  password?: string;
  role?: TUserRole;
  status?: TUserStatus;
}
