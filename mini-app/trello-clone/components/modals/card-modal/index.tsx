import { fetcher } from "@/lib/fetcher";

import { AuditLog } from "@prisma/client";

import { useQuery } from "@tanstack/react-query";

import { CardWithList } from "@/types/prisma-types";

import { useCardModal } from "@/hooks/use-card-modal";

import { CardHeader } from "./header";
import { CardAction } from "./actions";
import { CardDescription } from "./description";
import { CardActivity } from "./activity";

import { Dialog, DialogContent } from "../../ui/dialog";

export const CardModal = () => {
  const id = useCardModal((state) => state.id);
  const isOpen = useCardModal((state) => state.isOpen);
  const onClose = useCardModal((state) => state.onClose);

  const { data: cardData } = useQuery<CardWithList>({
    queryKey: ["card", id],
    queryFn: () => fetcher(`/api/cards/${id}`),
  });

  const { data: auditLogData } = useQuery<AuditLog[]>({
    queryKey: ["card-audit-log", id],
    queryFn: () => fetcher(`/api/cards/${id}/logs`),
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        {cardData ? <CardHeader data={cardData} /> : <CardHeader.Skeleton />}
        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4">
          <div className="col-span-3">
            <div className="w-full">
              {cardData ? (
                <CardDescription data={cardData} />
              ) : (
                <CardDescription.Skeleton />
              )}
            </div>
          </div>
          {cardData ? <CardAction data={cardData} /> : <CardAction.Skeleton />}
        </div>
        {auditLogData ? (
          <CardActivity data={auditLogData} />
        ) : (
          <CardActivity.Skeleton />
        )}
      </DialogContent>
    </Dialog>
  );
};
