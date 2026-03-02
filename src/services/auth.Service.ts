import instance from "@/libs/axios";
import {
  ILoginDto,
  IRefreshTokenDto,
  IAuthUser,
  IAuthData,
  IApiResponse,
} from "@/types";
import { throwServiceError } from "@/utils/errorServiceHelper";
import { EAuthApi } from "@/enums/service.enums";

export const loginService = async (
  data: ILoginDto,
): Promise<IApiResponse<IAuthData>> => {
  try {
    const { data: response } = await instance.post(EAuthApi.LOGIN, data);
    return response;
  } catch (error) {
    return throwServiceError(error);
  }
};

export const refreshTokenService = async (
  data: IRefreshTokenDto,
): Promise<IApiResponse<IAuthData>> => {
  try {
    const { data: response } = await instance.post(EAuthApi.REFRESH, data);
    return response;
  } catch (error) {
    return throwServiceError(error);
  }
};

export const getMeService = async (): Promise<IApiResponse<IAuthUser>> => {
  try {
    const { data: response } = await instance.get(EAuthApi.ME);
    return response;
  } catch (error) {
    return throwServiceError(error);
  }
};

export const logoutService = async (): Promise<IApiResponse<null>> => {
  try {
    const { data: response } = await instance.post(EAuthApi.LOGOUT);
    return response;
  } catch (error) {
    return throwServiceError(error);
  }
};
