import { FolderPlus, Layers, Plus, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Kbd, KbdGroup } from "@/components/ui/kbd";

export function TopBar() {
  return (
    <header className="flex h-14 shrink-0 items-center gap-4 border-b px-4">
      <div className="flex w-56 shrink-0 items-center gap-2">
        <div className="flex size-8 items-center justify-center rounded-md bg-gradient-to-br from-blue-500 to-violet-600 text-white">
          <Layers className="size-4" />
        </div>
        <span className="text-lg font-semibold">DevStash</span>
      </div>

      <div className="relative w-full max-w-md">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search items..."
          aria-label="Search items"
          className="pr-14 pl-9"
        />
        <KbdGroup className="absolute top-1/2 right-2 -translate-y-1/2">
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <Button variant="outline">
          <FolderPlus />
          New Collection
        </Button>
        <Button>
          <Plus />
          New Item
        </Button>
      </div>
    </header>
  );
}
