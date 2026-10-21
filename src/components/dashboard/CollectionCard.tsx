import Link from "next/link";
import { MoreHorizontal, Star } from "lucide-react";

import { getItemTypeById, type Collection } from "@/lib/dashboard";
import { getItemTypeIcon } from "@/lib/item-types";

interface CollectionCardProps {
  collection: Collection;
}

export function CollectionCard({ collection }: CollectionCardProps) {
  const types = collection.typeIds
    .map(getItemTypeById)
    .filter((type) => type !== undefined);
  const accentColor = types[0]?.color;

  return (
    <div
      className="group relative rounded-xl border border-l-2 bg-card p-5 transition-colors hover:bg-accent/40"
      style={{ borderLeftColor: accentColor }}
    >
      <div className="flex items-start gap-2">
        <div className="min-w-0 flex-1">
          <h3 className="flex items-center gap-2 font-medium">
            <Link
              href={`/collections/${collection.id}`}
              className="truncate after:absolute after:inset-0"
            >
              {collection.name}
            </Link>
            {collection.isFavorite && (
              <Star className="size-3.5 shrink-0 fill-yellow-400 text-yellow-400" />
            )}
          </h3>
          <p className="text-sm text-muted-foreground">
            {collection.itemCount} items
          </p>
        </div>
        <button
          type="button"
          aria-label="Collection actions"
          className="relative rounded-md p-1 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:bg-accent hover:text-foreground focus-visible:opacity-100"
        >
          <MoreHorizontal className="size-4" />
        </button>
      </div>

      <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">
        {collection.description}
      </p>

      <div className="mt-3 flex items-center gap-2">
        {types.map((type) => {
          const Icon = getItemTypeIcon(type.icon);
          return (
            <Icon
              key={type.id}
              className="size-4"
              style={{ color: type.color }}
              aria-label={type.name}
            />
          );
        })}
      </div>
    </div>
  );
}
