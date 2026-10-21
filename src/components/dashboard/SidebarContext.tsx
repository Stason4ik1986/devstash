"use client";

import { createContext, useContext, useState } from "react";

const DESKTOP_QUERY = "(min-width: 768px)";

interface SidebarContextValue {
  isCollapsed: boolean;
  isMobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  toggleSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextValue | null>(null);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setCollapsed] = useState(false);
  const [isMobileOpen, setMobileOpen] = useState(false);

  function toggleSidebar() {
    if (window.matchMedia(DESKTOP_QUERY).matches) {
      setCollapsed((collapsed) => !collapsed);
    } else {
      setMobileOpen((open) => !open);
    }
  }

  return (
    <SidebarContext.Provider
      value={{ isCollapsed, isMobileOpen, setMobileOpen, toggleSidebar }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within SidebarProvider");
  }
  return context;
}
