import Link from "next/link";
import { Clock, Pin } from "lucide-react";

import { CollectionCard } from "@/components/dashboard/CollectionCard";
import { ItemRow } from "@/components/dashboard/ItemRow";
import { StatsCards } from "@/components/dashboard/StatsCards";
import {
  getPinnedItems,
  getRecentCollections,
  getRecentItems,
} from "@/lib/dashboard";

export default function DashboardPage() {
  const recentCollections = getRecentCollections();
  const pinnedItems = getPinnedItems();
  const recentItems = getRecentItems();

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-10">
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-muted-foreground">Your developer knowledge hub</p>
      </div>

      <StatsCards />

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Collections</h2>
          <Link
            href="/collections"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            View all
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {recentCollections.map((collection) => (
            <CollectionCard key={collection.id} collection={collection} />
          ))}
        </div>
      </section>

      {pinnedItems.length > 0 && (
        <section>
          <h2 className="mb-4 flex items-center gap-2 text-muted-foreground">
            <Pin className="size-4" />
            Pinned
          </h2>
          <div className="flex flex-col gap-3">
            {pinnedItems.map((item) => (
              <ItemRow key={item.id} item={item} />
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="mb-4 flex items-center gap-2 text-muted-foreground">
          <Clock className="size-4" />
          Recent Items
        </h2>
        <div className="flex flex-col gap-3">
          {recentItems.map((item) => (
            <ItemRow key={item.id} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
