import { fetcher } from "@/lib/fetcher";

import { useQuery } from "@tanstack/react-query";

import { CardWithList } from "@/types/prisma-types";

import { useCardModal } from "@/hooks/use-card-modal";

import { Dialog, DialogContent } from "../ui/dialog";
import { CardHeader } from "./header";

export const CardModal = () => {
  const id = useCardModal((state) => state.id);
  const isOpen = useCardModal((state) => state.isOpen);
  const onClose = useCardModal((state) => state.onClose);

  const { data: cardData } = useQuery<CardWithList>({
    queryKey: ["card", id],
    queryFn: () => fetcher(`/api/cards/${id}`),
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        {cardData ? <CardHeader data={cardData} /> : <CardHeader.Skeleton />}
      </DialogContent>
    </Dialog>
  );
};
