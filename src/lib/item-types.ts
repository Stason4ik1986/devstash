import {
  Code,
  File,
  Image,
  Link,
  Sparkles,
  StickyNote,
  Terminal,
  type LucideIcon,
} from "lucide-react";

export const ITEM_TYPE_ICONS: Record<string, LucideIcon> = {
  Code,
  File,
  Image,
  Link,
  Sparkles,
  StickyNote,
  Terminal,
};

export function getItemTypeIcon(iconName: string): LucideIcon {
  return ITEM_TYPE_ICONS[iconName] ?? File;
}

export function getItemTypeHref(typeName: string) {
  return `/items/${typeName.toLowerCase()}`;
}
