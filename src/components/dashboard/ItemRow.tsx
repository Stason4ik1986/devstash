import { createElement } from "react";
import { Pin, Star } from "lucide-react";

import { formatShortDate, getItemTypeById, type Item } from "@/lib/dashboard";
import { getItemTypeIcon } from "@/lib/item-types";

interface ItemRowProps {
  item: Item;
}

export function ItemRow({ item }: ItemRowProps) {
  const type = getItemTypeById(item.typeId);

  return (
    <div
      className="flex gap-4 rounded-xl border border-l-2 bg-card p-4 transition-colors hover:bg-accent/40"
      style={{ borderLeftColor: type?.color }}
    >
      <div
        className="flex size-9 shrink-0 items-center justify-center rounded-md"
        style={{ backgroundColor: type ? `${type.color}1a` : undefined }}
      >
        {createElement(getItemTypeIcon(type?.icon ?? ""), {
          className: "size-4",
          style: { color: type?.color },
        })}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3 className="truncate font-medium">{item.title}</h3>
          {item.isPinned && (
            <Pin className="size-3.5 shrink-0 text-muted-foreground" />
          )}
          {item.isFavorite && (
            <Star className="size-3.5 shrink-0 fill-yellow-400 text-yellow-400" />
          )}
        </div>
        <p className="truncate text-sm text-muted-foreground">
          {item.description}
        </p>
        {item.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <time
        dateTime={item.updatedAt}
        className="shrink-0 text-xs text-muted-foreground"
      >
        {formatShortDate(item.updatedAt)}
      </time>
    </div>
  );
}
