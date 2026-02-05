export interface TSetting {
  id: string;
  configKey: string;
  description: string;
  configData: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface TCreateSettingDto {
  configKey: string;
  description: string;
  configData: Record<string, unknown>;
}

export interface TUpdateSettingDto {
  description?: string;
  configData?: Record<string, unknown>;
}
