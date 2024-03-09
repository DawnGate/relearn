"use client";

import { useParams } from "next/navigation";

import { toast } from "sonner";

import { CardWithList } from "@/types/prisma-types";

import { useCardModal } from "@/hooks/use-card-modal";

import { useAction } from "@/hooks/use-action";
import { deleteCard } from "@/actions/delete-card";
import { copyCard } from "@/actions/copy-card";

import { Copy, Trash } from "lucide-react";

import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

interface CardActionsProps {
  data: CardWithList;
}

export const CardAction = ({ data }: CardActionsProps) => {
  const params = useParams();
  const boardId = params.boardId as string;

  const onCloseCardModal = useCardModal((state) => state.onClose);

  const { isLoading: isLoadingDelete, execute: executeDelete } = useAction(
    deleteCard,
    {
      onSuccess: (data) => {
        toast.success(`Deleted "${data.title}" success!`);
        onCloseCardModal();
      },
      onError: (error) => [toast.error(error)],
    },
  );

  const { isLoading: isLoadingCopy, execute: executeCopy } = useAction(
    copyCard,
    {
      onSuccess: (data) => {
        toast.success(`Copied "${data.title}" success!`);
        onCloseCardModal();
      },
      onError: (error) => [toast.error(error)],
    },
  );

  const handleClickCopy = () => {
    executeCopy({
      id: data.id,
      boardId,
    });
  };

  const handleClickDelete = () => {
    executeDelete({
      id: data.id,
      boardId,
    });
  };

  return (
    <div className="mt-2 space-y-2">
      <p className="text-xs font-semibold">Actions</p>
      <Button
        disabled={isLoadingCopy}
        onClick={handleClickCopy}
        variant="gray"
        size="inline"
        className="w-full justify-start"
      >
        <Copy className="mr-2 h-4 w-4" />
        Copy
      </Button>
      <Button
        disabled={isLoadingDelete}
        onClick={handleClickDelete}
        variant="gray"
        size="inline"
        className="w-full justify-start"
      >
        <Trash className="mr-2 h-4 w-4" />
        Delete
      </Button>
    </div>
  );
};

CardAction.Skeleton = function CardActionSkeleton() {
  return (
    <div className="mt-2 space-y-2">
      <Skeleton className="h-4 w-20 bg-neutral-200" />
      <Skeleton className="h-8 w-full bg-neutral-200" />
      <Skeleton className="h-8 w-full bg-neutral-200" />
    </div>
  );
};
