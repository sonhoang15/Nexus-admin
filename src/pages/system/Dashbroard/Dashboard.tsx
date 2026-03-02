import { useNavigate } from "react-router-dom";
import { Users, FileText, File } from "lucide-react";
import { StatsCard } from "@/pages/system/Dashbroard/dashboard/StatsCard";
import { PlatformGrowthChart } from "@/pages/system/Dashbroard/dashboard/PlatformGrowthChart";
import { CategorySplitChart } from "@/pages/system/Dashbroard/dashboard/CategorySplitChart";
import { LatestProducts } from "@/pages/system/Dashbroard/dashboard/LatestProducts";
import { ContentStatus } from "@/pages/system/Dashbroard/dashboard/ContentStatus";
import { useDashboard } from "@/hooks/useDashboard";
import { ERoutePath } from "@/enums/route.enums";

const CATEGORY_COLORS = ["#6366f1", "#f59e0b", "#10b981", "#ef4444", "#8b5cf6"];

export default function Dashboard() {
  const navigate = useNavigate();

  const {
    stats,
    growth,
    categorySplit,
    latestProducts,
    contentStatus,
    loading,
    error,
  } = useDashboard();

  if (loading) {
    return <div className="p-6">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="p-6 text-destructive">{error}</div>;
  }

  const growthData =
    growth?.labels?.map((label, index) => ({
      month: label,
      users:
        growth?.datasets?.find((d) => d.name === "Users")?.data?.[index] || 0,
    })) ?? [];

  const categoryData =
    categorySplit?.map((item, index) => ({
      name: item.name,
      value: item.value,
      color: CATEGORY_COLORS[index % CATEGORY_COLORS.length],
    })) ?? [];

  const mappedProducts =
    latestProducts?.map((p) => ({
      ...p,
      brand: "N/A",
      category: { name: "General" },
      stockUnits: 10,
      lowStockAlert: 5,
    })) ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
        <p className="text-muted-foreground">
          System management and detailed overview.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatsCard
          title="Total Platform Users"
          value={stats?.totalUsers || 0}
          icon={Users}
        />
        <StatsCard
          title="Published Pages"
          value={stats?.publishedPages || 0}
          icon={FileText}
        />
        <StatsCard
          title="Stored Documents"
          value={stats?.totalDocuments || 0}
          icon={File}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <PlatformGrowthChart data={growthData} />
        <CategorySplitChart data={categoryData} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <LatestProducts
          products={mappedProducts}
          onViewAll={() => navigate(ERoutePath.PRODUCTS)}
        />
        <ContentStatus
          pages={contentStatus}
          onNewPage={() => navigate(ERoutePath.PAGES)}
        />
      </div>
    </div>
  );
}
