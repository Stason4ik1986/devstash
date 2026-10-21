import { collections, itemTypes, items } from "@/lib/mock-data";

export type ItemType = (typeof itemTypes)[number];
export type Collection = (typeof collections)[number];
export type Item = (typeof items)[number];

const RECENT_ITEMS_LIMIT = 10;

const ITEM_TYPES_BY_ID = new Map(itemTypes.map((type) => [type.id, type]));

export function getItemTypeById(typeId: string): ItemType | undefined {
  return ITEM_TYPES_BY_ID.get(typeId);
}

export function getCollectionLastActivity(collectionId: string) {
  return Math.max(
    0,
    ...items
      .filter((item) => item.collectionId === collectionId)
      .map((item) => new Date(item.updatedAt).getTime()),
  );
}

function byUpdatedAtDesc(a: Item, b: Item) {
  return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
}

export function getDashboardStats() {
  return {
    items: items.length,
    collections: collections.length,
    favoriteItems: items.filter((item) => item.isFavorite).length,
    favoriteCollections: collections.filter((c) => c.isFavorite).length,
  };
}

export function getRecentCollections() {
  return [...collections].sort(
    (a, b) => getCollectionLastActivity(b.id) - getCollectionLastActivity(a.id),
  );
}

export function getPinnedItems() {
  return items.filter((item) => item.isPinned).sort(byUpdatedAtDesc);
}

export function getRecentItems() {
  return [...items].sort(byUpdatedAtDesc).slice(0, RECENT_ITEMS_LIMIT);
}

export function formatShortDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}
