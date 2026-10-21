"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  Folder,
  Layers,
  PanelLeft,
  Settings,
  Star,
} from "lucide-react";

import { useSidebar } from "@/components/dashboard/SidebarContext";
import { SidebarToggle } from "@/components/dashboard/SidebarToggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getItemTypeHref, getItemTypeIcon } from "@/lib/item-types";
import { collections, currentUser, itemTypes, items } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const RECENT_COLLECTIONS_LIMIT = 5;

const FAVORITE_COLLECTIONS = collections.filter((c) => c.isFavorite);

function getLastActivity(collectionId: string) {
  return Math.max(
    0,
    ...items
      .filter((item) => item.collectionId === collectionId)
      .map((item) => new Date(item.updatedAt).getTime()),
  );
}

const RECENT_COLLECTIONS = collections
  .filter((c) => !c.isFavorite)
  .sort((a, b) => getLastActivity(b.id) - getLastActivity(a.id))
  .slice(0, RECENT_COLLECTIONS_LIMIT);

const USER_INITIALS = currentUser.name
  .split(" ")
  .map((part) => part[0])
  .join("");

interface SidebarContentProps {
  isCollapsed?: boolean;
  onNavigate?: () => void;
}

interface SectionProps {
  title: string;
  isCollapsed: boolean;
  children: React.ReactNode;
}

interface NavLinkProps {
  href: string;
  label: string;
  icon: React.ReactNode;
  trailing?: React.ReactNode;
  isCollapsed: boolean;
  onNavigate?: () => void;
}

function Section({ title, isCollapsed, children }: SectionProps) {
  const [isOpen, setOpen] = useState(true);

  if (isCollapsed) {
    return <div className="px-3 py-3">{children}</div>;
  }

  return (
    <div className="px-3 py-3">
      <button
        type="button"
        onClick={() => setOpen(!isOpen)}
        aria-expanded={isOpen}
        className="flex items-center gap-1 px-2 pb-2 text-xs font-medium text-muted-foreground hover:text-foreground"
      >
        {title}
        <ChevronDown
          className={cn("size-3.5 transition-transform", !isOpen && "-rotate-90")}
        />
      </button>
      {isOpen && children}
    </div>
  );
}

function GroupLabel({
  isCollapsed,
  children,
}: {
  isCollapsed: boolean;
  children: React.ReactNode;
}) {
  if (isCollapsed) return null;

  return (
    <p className="px-2 pt-2 pb-1 text-[11px] font-medium tracking-wider text-muted-foreground uppercase">
      {children}
    </p>
  );
}

function NavLink({
  href,
  label,
  icon,
  trailing,
  isCollapsed,
  onNavigate,
}: NavLinkProps) {
  return (
    <li>
      <Link
        href={href}
        onClick={onNavigate}
        title={isCollapsed ? label : undefined}
        aria-label={isCollapsed ? label : undefined}
        className={cn(
          "flex items-center gap-3 rounded-md py-1.5 text-sm text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
          isCollapsed ? "justify-center px-0 py-2" : "px-2",
        )}
      >
        {icon}
        {!isCollapsed && (
          <>
            <span className="flex-1 truncate">{label}</span>
            {trailing}
          </>
        )}
      </Link>
    </li>
  );
}

export function SidebarContent({
  isCollapsed = false,
  onNavigate,
}: SidebarContentProps) {
  const { toggleSidebar } = useSidebar();

  return (
    <div className="flex h-full flex-col">
      {isCollapsed ? (
        <div className="flex h-14 shrink-0 items-center justify-center">
          <button
            type="button"
            onClick={toggleSidebar}
            aria-label="Expand sidebar"
            title="Expand sidebar"
            className="group flex size-8 items-center justify-center rounded-md hover:bg-sidebar-accent"
          >
            <span className="flex size-8 items-center justify-center rounded-md bg-linear-to-br from-blue-500 to-violet-600 text-white group-hover:hidden">
              <Layers className="size-4" />
            </span>
            <PanelLeft className="hidden size-4 group-hover:block" />
          </button>
        </div>
      ) : (
        <div className="flex h-14 shrink-0 items-center gap-2 pr-2 pl-4">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-linear-to-br from-blue-500 to-violet-600 text-white">
            <Layers className="size-4" />
          </div>
          <span className="flex-1 text-lg font-semibold">DevStash</span>
          <SidebarToggle />
        </div>
      )}

      <nav className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto">
        <Section title="Types" isCollapsed={isCollapsed}>
          <ul>
            {itemTypes.map((type) => {
              const Icon = getItemTypeIcon(type.icon);
              return (
                <NavLink
                  key={type.id}
                  href={getItemTypeHref(type.name)}
                  label={type.name}
                  icon={
                    <Icon className="size-4 shrink-0" style={{ color: type.color }} />
                  }
                  trailing={
                    <span className="text-xs text-muted-foreground">
                      {type.count}
                    </span>
                  }
                  isCollapsed={isCollapsed}
                  onNavigate={onNavigate}
                />
              );
            })}
          </ul>
        </Section>

        <div className="mx-3 border-t" />

        <Section title="Collections" isCollapsed={isCollapsed}>
          <GroupLabel isCollapsed={isCollapsed}>Favorites</GroupLabel>
          <ul>
            {FAVORITE_COLLECTIONS.map((collection) => (
              <NavLink
                key={collection.id}
                href={`/collections/${collection.id}`}
                label={collection.name}
                icon={<Folder className="size-4 shrink-0 text-muted-foreground" />}
                trailing={
                  <Star className="size-3.5 fill-yellow-400 text-yellow-400" />
                }
                isCollapsed={isCollapsed}
                onNavigate={onNavigate}
              />
            ))}
          </ul>

          <GroupLabel isCollapsed={isCollapsed}>Recent</GroupLabel>
          <ul>
            {RECENT_COLLECTIONS.map((collection) => (
              <NavLink
                key={collection.id}
                href={`/collections/${collection.id}`}
                label={collection.name}
                icon={<Folder className="size-4 shrink-0 text-muted-foreground" />}
                trailing={
                  <span className="text-xs text-muted-foreground">
                    {collection.itemCount}
                  </span>
                }
                isCollapsed={isCollapsed}
                onNavigate={onNavigate}
              />
            ))}
          </ul>
        </Section>
      </nav>

      <div
        className={cn(
          "flex shrink-0 items-center gap-3 border-t",
          isCollapsed ? "justify-center py-4" : "p-4",
        )}
      >
        <Avatar size={isCollapsed ? "default" : "lg"} title={currentUser.name}>
          {currentUser.image && <AvatarImage src={currentUser.image} />}
          <AvatarFallback>{USER_INITIALS}</AvatarFallback>
        </Avatar>
        {!isCollapsed && (
          <>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{currentUser.name}</p>
              <p className="truncate text-xs text-muted-foreground">
                {currentUser.email}
              </p>
            </div>
            <Button variant="ghost" size="icon-sm" aria-label="Settings">
              <Settings />
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
