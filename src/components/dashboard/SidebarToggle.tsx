"use client";

import { PanelLeft } from "lucide-react";

import { useSidebar } from "@/components/dashboard/SidebarContext";
import { Button } from "@/components/ui/button";

interface SidebarToggleProps {
  className?: string;
}

export function SidebarToggle({ className }: SidebarToggleProps) {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleSidebar}
      aria-label="Toggle sidebar"
      className={className}
    >
      <PanelLeft />
    </Button>
  );
}
