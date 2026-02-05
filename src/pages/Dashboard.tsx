import { useNavigate } from "react-router-dom";
import { Users, FileText, File } from "lucide-react";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { PlatformGrowthChart } from "@/components/dashboard/PlatformGrowthChart";
import { CategorySplitChart } from "@/components/dashboard/CategorySplitChart";
import { LatestProducts } from "@/components/dashboard/LatestProducts";
import { ContentStatus } from "@/components/dashboard/ContentStatus";
import {
  mockProducts,
  mockPages,
  platformGrowthData,
  categorySplitData,
} from "@/data/mockData";

export default function Dashboard() {
  const navigate = useNavigate();

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
          value={4}
          icon={Users}
          change={{ value: "+8.2%", positive: true }}
        />
        <StatsCard
          title="Published Pages"
          value={1}
          icon={FileText}
          change={{ value: "+4.3%", positive: true }}
        />
        <StatsCard
          title="Stored Documents"
          value={2}
          icon={File}
          change={{ value: "-1.2%", positive: false }}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <PlatformGrowthChart data={platformGrowthData} />
        <CategorySplitChart data={categorySplitData} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <LatestProducts
          products={mockProducts}
          onViewAll={() => navigate("/products")}
        />
        <ContentStatus pages={mockPages} onNewPage={() => navigate("/pages")} />
      </div>
    </div>
  );
}
