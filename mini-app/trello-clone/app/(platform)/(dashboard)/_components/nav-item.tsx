"use client";

import { usePathname, useRouter } from "next/navigation";

import Image from "next/image";
import { Activity, CreditCard, Layout, Link, Settings } from "lucide-react";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

export type Organization = {
  id: string;
  slug: string;
  imageUrl: string;
  name: string;
};

interface NavItemProps {
  isExpanded: boolean;
  isActive: boolean;
  onExpand: (id: string) => void;
  organization: Organization;
}

export const NavItem = ({
  isActive,
  isExpanded,
  organization,
  onExpand,
}: NavItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const routes = [
    {
      icon: <Layout className="mr-2 h-4 w-4" />,
      href: `/organization/${organization.id}`,
      label: "Board",
    },
    {
      icon: <Activity className="mr-2 h-4 w-4" />,
      href: `/organization/${organization.id}/activity`,
      label: "Activity",
    },
    {
      icon: <Settings className="mr-2 h-4 w-4" />,
      href: `/organization/${organization.id}/settings`,
      label: "Settings",
    },
    {
      icon: <CreditCard className="mr-2 h-4 w-4" />,
      href: `/organization/${organization.id}/billing`,
      label: "Billing",
    },
  ];

  const handleClickRouteBtn = (href: string) => {
    router.push(href);
  };

  return (
    <AccordionItem value={organization.id} className="border-none">
      <AccordionTrigger
        onClick={() => onExpand(organization.id)}
        className={cn(
          "rounded-md p-1.5 text-neutral-700 no-underline transition hover:bg-neutral-500/10 hover:no-underline",
          isActive && !isExpanded && "bg-sky-500/10 text-sky-700",
        )}
      >
        <div className="flex items-center gap-x-2">
          <div className="relative h-7 w-7">
            <Image
              src={organization.imageUrl}
              alt="org icon"
              fill
              sizes="100%"
              className="rounded-sm object-cover"
            />
          </div>
          <div className="text-sm font-medium">{organization.name}</div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="pt-1 text-neutral-700">
        {routes.map((route) => (
          <Button
            key={route.href}
            onClick={() => handleClickRouteBtn(route.href)}
            size="sm"
            variant="ghost"
            className={cn(
              "mb-1 w-full justify-start pl-10 font-normal",
              pathname === route.href && "bg-sky-500/10 text-sky-700",
            )}
          >
            {route.icon}
            {route.label}
          </Button>
        ))}
      </AccordionContent>
    </AccordionItem>
  );
};

NavItem.Skeleton = function SkeletonNavItem() {
  return (
    <div className="flex items-center gap-x-2">
      <Skeleton className="h-10 w-10 shrink-0" />
      <Skeleton className="h-10 w-full" />
    </div>
  );
};
