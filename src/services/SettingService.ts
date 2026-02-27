import instance from "@/libs/axios";
import {
  ISetting,
  ISettingListResponse,
  CreateSettingDto,
  IUpdateSettingDto,
} from "@/types";

const BASE_URL = "/api/settings";

const settingsService = {
  getAll: (): Promise<ISettingListResponse> => instance.get(BASE_URL),

  getById: (id: string): Promise<ISetting> => instance.get(`${BASE_URL}/${id}`),

  getByKey: (key: string): Promise<ISetting> =>
    instance.get(`${BASE_URL}/key/${key}`),

  create: (data: CreateSettingDto): Promise<ISetting> =>
    instance.post(BASE_URL, data),

  update: (id: string, data: IUpdateSettingDto): Promise<ISetting> =>
    instance.put(`${BASE_URL}/${id}`, data),

  delete: (id: string): Promise<Record<string, never>> =>
    instance.delete(`${BASE_URL}/${id}`),
};

export default settingsService;
