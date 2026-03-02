import instance from "@/libs/axios";
import { ISetting, CreateSettingDto, IUpdateSettingDto } from "@/types";
import { IApiResponse } from "@/types";
import { throwServiceError } from "@/utils/errorServiceHelper";
import { ESettingApi } from "@/enums/service.enums";

export const getSettingsService = async (
  limit = 10,
): Promise<IApiResponse<ISetting[]>> => {
  try {
    const { data } = await instance.get<IApiResponse<ISetting[]>>(
      ESettingApi.BASE,
      {
        params: { limit },
      },
    );

    return data;
  } catch (error) {
    return throwServiceError(error);
  }
};

export const getSettingByIdService = async (
  id: string,
): Promise<IApiResponse<ISetting>> => {
  try {
    const { data } = await instance.get<IApiResponse<ISetting>>(
      `${ESettingApi.BASE}/${id}`,
    );

    return data;
  } catch (error) {
    return throwServiceError(error);
  }
};

export const getSettingByKeyService = async (
  key: string,
): Promise<IApiResponse<ISetting>> => {
  try {
    const { data } = await instance.get<IApiResponse<ISetting>>(
      `${ESettingApi.BY_KEY}/${key}`,
    );

    return data;
  } catch (error) {
    return throwServiceError(error);
  }
};

export const createSettingService = async (
  payload: CreateSettingDto,
): Promise<IApiResponse<ISetting>> => {
  try {
    const { data } = await instance.post<IApiResponse<ISetting>>(
      ESettingApi.BASE,
      payload,
    );

    return data;
  } catch (error) {
    return throwServiceError(error);
  }
};

export const updateSettingService = async (
  id: string,
  payload: IUpdateSettingDto,
): Promise<IApiResponse<ISetting>> => {
  try {
    const { data } = await instance.put<IApiResponse<ISetting>>(
      `${ESettingApi.BASE}/${id}`,
      payload,
    );

    return data;
  } catch (error) {
    return throwServiceError(error);
  }
};

export const deleteSettingService = async (
  id: string,
): Promise<IApiResponse<void>> => {
  try {
    const { data } = await instance.delete<IApiResponse<void>>(
      `${ESettingApi.BASE}/${id}`,
    );

    return data;
  } catch (error) {
    return throwServiceError(error);
  }
};
