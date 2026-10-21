import { Folder, FolderHeart, Layers, Star, type LucideIcon } from "lucide-react";

import { getDashboardStats } from "@/lib/dashboard";

interface StatCardProps {
  label: string;
  value: number;
  icon: LucideIcon;
}

function StatCard({ label, value, icon: Icon }: StatCardProps) {
  return (
    <div className="rounded-xl border bg-card p-4">
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        {label}
        <Icon className="size-4" />
      </div>
      <p className="mt-2 text-2xl font-semibold">{value}</p>
    </div>
  );
}

export function StatsCards() {
  const stats = getDashboardStats();

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <StatCard label="Items" value={stats.items} icon={Layers} />
      <StatCard label="Collections" value={stats.collections} icon={Folder} />
      <StatCard label="Favorite Items" value={stats.favoriteItems} icon={Star} />
      <StatCard
        label="Favorite Collections"
        value={stats.favoriteCollections}
        icon={FolderHeart}
      />
    </div>
  );
}
