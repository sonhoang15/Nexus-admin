import instance from "@/libs/axios";
import {
  IDashboardStats,
  IDashboardGrowth,
  ICategorySplitItem,
  ILatestProduct,
  IContentStatusItem,
} from "@/types/dashboard";
import { IApiResponse } from "@/types";
import { throwServiceError } from "@/utils/errorServiceHelper";
import { EDashboardApi } from "@/enums/service.enums";

const dashboardService = {
  getStats: async (): Promise<IApiResponse<IDashboardStats>> => {
    try {
      const res = await instance.get(EDashboardApi.STATS);
      return res.data;
    } catch (error) {
      return throwServiceError(error);
    }
  },

  getGrowth: async (): Promise<IApiResponse<IDashboardGrowth>> => {
    try {
      const res = await instance.get(EDashboardApi.GROWTH);
      return res.data;
    } catch (error) {
      return throwServiceError(error);
    }
  },

  getCategorySplit: async (): Promise<IApiResponse<ICategorySplitItem[]>> => {
    try {
      const res = await instance.get(EDashboardApi.CATEGORY_SPLIT);
      return res.data;
    } catch (error) {
      return throwServiceError(error);
    }
  },

  getLatestProducts: async (): Promise<IApiResponse<ILatestProduct[]>> => {
    try {
      const res = await instance.get(EDashboardApi.LATEST_PRODUCTS);
      return res.data;
    } catch (error) {
      return throwServiceError(error);
    }
  },

  getContentStatus: async (): Promise<IApiResponse<IContentStatusItem[]>> => {
    try {
      const res = await instance.get(EDashboardApi.CONTENT_STATUS);
      return res.data;
    } catch (error) {
      return throwServiceError(error);
    }
  },
};

export default dashboardService;
