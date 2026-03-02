export interface ISetting {
  id: string;
  createdAt: string;
  updatedAt: string;
  configKey: string;
  description: string;
  configData: Record<string, unknown>;
}

export interface CreateSettingDto {
  configKey: string;
  description: string;
  configData: Record<string, unknown>;
}

export interface IUpdateSettingDto {
  description?: string;
  configData?: Record<string, unknown>;
}

export interface ISettingListResponse {
  items: ISetting[];
}
