import { AuditLog } from "@prisma/client";
import { ActivityIcon } from "lucide-react";

import { ActivityItem } from "../../activity-item";
import { Skeleton } from "../../ui/skeleton";

interface ActivityProps {
  data: AuditLog[];
}

export const CardActivity = ({ data }: ActivityProps) => {
  return (
    <div className="flex items-start gap-x-2">
      <ActivityIcon className="mt-0.5 h-5 w-5 text-neutral-700" />
      <div className="w-full">
        <p className="mb-2 font-semibold text-neutral-700">Activity</p>
        <ol className="space-y-4">
          {data.map((item) => (
            <ActivityItem data={item} key={item.id} />
          ))}
        </ol>
      </div>
    </div>
  );
};

CardActivity.Skeleton = function CardActivitySkeleton() {
  return (
    <div className="flex w-full items-start gap-x-3">
      <Skeleton className="h-6 w-6 bg-neutral-200" />
      <div className="w-full">
        <Skeleton className="h-6 w-24 bg-neutral-200" />
        <Skeleton className="h-10 w-full bg-neutral-200" />
      </div>
    </div>
  );
};
