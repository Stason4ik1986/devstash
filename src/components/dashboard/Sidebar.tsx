"use client";

import { SidebarContent } from "@/components/dashboard/SidebarContent";
import { useSidebar } from "@/components/dashboard/SidebarContext";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const { isCollapsed, isMobileOpen, setMobileOpen } = useSidebar();

  return (
    <>
      <aside
        className={cn(
          "hidden shrink-0 overflow-hidden border-r bg-sidebar transition-[width] duration-200 md:block",
          isCollapsed ? "w-16" : "w-64",
        )}
      >
        <SidebarContent isCollapsed={isCollapsed} />
      </aside>

      <Sheet open={isMobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent
          side="left"
          showCloseButton={false}
          className="w-72 gap-0 bg-sidebar p-0 md:hidden"
        >
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <SidebarContent onNavigate={() => setMobileOpen(false)} />
        </SheetContent>
      </Sheet>
    </>
  );
}
