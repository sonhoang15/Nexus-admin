export interface ISetting {
  id: string;
  configKey: string;
  description: string;
  configData: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateSettingDto {
  configKey: string;
  description: string;
  configData: Record<string, unknown>;
}

export interface IUpdateSettingDto {
  description?: string;
  configData?: Record<string, unknown>;
}
