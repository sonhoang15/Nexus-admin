export * from "./user";
export * from "./auth";
export * from "./category";
export * from "./product";
export * from "./page";
export * from "./document";
export * from "./setting";

export interface IApiResponse<T> {
  success: boolean;
  data: T;
}
