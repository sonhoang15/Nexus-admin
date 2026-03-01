import { useEffect, useState, useCallback } from "react";
import dashboardService from "@/services/DashboardService";
import {
  IDashboardStats,
  IDashboardGrowth,
  ICategorySplitItem,
  ILatestProduct,
  IContentStatusItem,
} from "@/types/dashboard";

interface UseDashboardReturn {
  stats: IDashboardStats | null;
  growth: IDashboardGrowth | null;
  categorySplit: ICategorySplitItem[];
  latestProducts: ILatestProduct[];
  contentStatus: IContentStatusItem[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useDashboard(): UseDashboardReturn {
  const [stats, setStats] = useState<IDashboardStats | null>(null);
  const [growth, setGrowth] = useState<IDashboardGrowth | null>(null);
  const [categorySplit, setCategorySplit] = useState<ICategorySplitItem[]>([]);
  const [latestProducts, setLatestProducts] = useState<ILatestProduct[]>([]);
  const [contentStatus, setContentStatus] = useState<IContentStatusItem[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboard = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [statsRes, growthRes, categoryRes, latestRes, contentRes] =
        await Promise.all([
          dashboardService.getStats(),
          dashboardService.getGrowth(),
          dashboardService.getCategorySplit(),
          dashboardService.getLatestProducts(),
          dashboardService.getContentStatus(),
        ]);

      setStats(statsRes.data);
      setGrowth(growthRes.data);
      setCategorySplit(categoryRes.data);
      setLatestProducts(latestRes.data);
      setContentStatus(contentRes.data);
    } catch (err: any) {
      setError(err?.message || "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  return {
    stats,
    growth,
    categorySplit,
    latestProducts,
    contentStatus,
    loading,
    error,
    refetch: fetchDashboard,
  };
}
