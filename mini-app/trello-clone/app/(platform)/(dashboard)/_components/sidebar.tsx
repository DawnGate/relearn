"use client";
import Link from "next/link";

import { useLocalStorage } from "usehooks-ts";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";

import { Plus } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Accordion } from "@/components/ui/accordion";
import { NavItem, Organization } from "./nav-item";

interface SidebarProps {
  storageKey?: string;
}

export const Sidebar = ({ storageKey = "t-sidebar-state" }: SidebarProps) => {
  const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(
    storageKey,
    {},
  );

  const { organization: activeOrganization, isLoaded: isLoadedOrg } =
    useOrganization();

  const { userMemberships, isLoaded: isLoadedOrgList } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });

  const defaultAccordionValue: string[] = Object.keys(expanded).reduce(
    (acc: string[], id) => {
      if (expanded[id]) {
        acc.push(id);
      }
      return acc;
    },
    [],
  );

  const onExpand = (id: string) => {
    setExpanded((curr) => ({ ...curr, [id]: !expanded[id] }));
  };

  if (!isLoadedOrg || !isLoadedOrgList || userMemberships.isLoading) {
    return (
      <>
        <div className="mb-2 flex items-center justify-between">
          <Skeleton className="h-10 w-[50%]" />
          <Skeleton className="h-10 w-10" />
        </div>
        <div className="space-y-2">
          <NavItem.Skeleton />
          <NavItem.Skeleton />
          <NavItem.Skeleton />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="mb-1 flex items-center text-xs font-medium">
        <div className="pl-4">Work spaces</div>
        <Button
          asChild
          type="button"
          variant="ghost"
          size="icon"
          className="ml-auto"
        >
          <Link href="/select-org">
            <Plus className="h-4 w-4" />
          </Link>
        </Button>
      </div>
      <Accordion
        type="multiple"
        className="space-y-2"
        defaultValue={defaultAccordionValue}
      >
        {userMemberships.data.map(({ organization }) => (
          <NavItem
            key={organization.id}
            organization={organization as Organization}
            isActive={organization.id === activeOrganization?.id}
            isExpanded={expanded[organization.id]}
            onExpand={onExpand}
          />
        ))}
      </Accordion>
    </>
  );
};
