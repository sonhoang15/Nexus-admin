export type TUserRole = "ADMIN" | "SUPER_ADMIN";
export type TUserStatus = "ACTIVE" | "INACTIVE";

export interface IUser {
  id: string;
  fullName: string;
  email: string;
  role: TUserRole;
  status: TUserStatus;
  createdAt: string;
}

export interface ICreateUserDto {
  fullName: string;
  email: string;
  password: string;
  role?: TUserRole;
  status?: TUserStatus;
}

export interface IUpdateUserDto {
  fullName?: string;
  email?: string;
  password?: string;
  role?: TUserRole;
  status?: TUserStatus;
}
