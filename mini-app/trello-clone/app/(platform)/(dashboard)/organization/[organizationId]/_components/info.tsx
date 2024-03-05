"use client";

import { useOrganization } from "@clerk/nextjs";

import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { CreditCard } from "lucide-react";

export const Info = () => {
  const { isLoaded, organization } = useOrganization();

  if (!isLoaded) {
    return <Info.Skeleton />;
  }

  return (
    <div className="flex items-center gap-x-4">
      <div className="relative h-[60px] w-[60px]">
        <Image
          src={organization?.imageUrl ?? ""}
          alt={organization?.name ?? ""}
          fill
          sizes="100%"
          className="rounded-md object-cover"
        />
      </div>
      <div className="space-y-1">
        <div className="text-xl font-semibold">{organization?.name}</div>
        <div className="flex items-center text-xs text-muted-foreground">
          <CreditCard className="mr-1 h-4 w-4" />
          Free
        </div>
      </div>
    </div>
  );
};

Info.Skeleton = function SkeletonInfo() {
  return (
    <div className="flex items-center gap-x-4">
      <Skeleton className="h-[60px] w-[60px] rounded-md" />
      <div className="space-y-1">
        <Skeleton className="h-[28px] w-[200px]" />
        <div className="flex items-center">
          <Skeleton className=" mr-1 h-4 w-4 " />
          <Skeleton className="h-4 w-[100px]" />
        </div>
      </div>
    </div>
  );
};
