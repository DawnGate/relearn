"use client";

import { ElementRef, useRef } from "react";
import { toast } from "sonner";

import { List } from "@prisma/client";

import { MoreHorizontal, X } from "lucide-react";

import { copyList } from "@/actions/copy-list";
import { deleteList } from "@/actions/delete-list";

import { useAction } from "@/hooks/use-action";

import { FormSubmit } from "@/components/form/form-submit";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ListOptionsProps {
  data: List;
}

export const ListOptions = ({ data }: ListOptionsProps) => {
  const closeBtnRef = useRef<ElementRef<"button">>(null);

  const { execute: executeDelete } = useAction(deleteList, {
    onSuccess: (data) => {
      toast.success(`List ${data.title} deleted!`);
      closeBtnRef.current?.click();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const { execute: executeCopy } = useAction(copyList, {
    onSuccess: (data) => {
      toast.success(`List ${data.title} copied!`);
      closeBtnRef.current?.click();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onSubmitDelete = (formData: FormData) => {
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;

    executeDelete({
      id,
      boardId,
    });
  };

  const onSubmitCopy = (formData: FormData) => {
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;

    executeCopy({
      id,
      boardId,
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-auto w-auto p-2" variant="ghost">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="px-0 py-3" side="bottom" align="start">
        <div className="pb-4 text-center text-sm font-medium text-neutral-600">
          List actions
        </div>
        <PopoverClose asChild>
          <Button
            ref={closeBtnRef}
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 h-auto w-auto p-2 text-neutral-600"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <Button
          variant="ghost"
          className="h-auto w-full justify-start rounded-none p-2 px-5 text-sm font-normal"
        >
          Add card...
        </Button>
        <form action={onSubmitCopy}>
          <input hidden id="id" name="id" defaultValue={data.id} />
          <input
            hidden
            id="boardId"
            name="boardId"
            defaultValue={data.boardId}
          />
          <FormSubmit
            variant="ghost"
            className="h-auto w-full justify-start rounded-none p-2 px-5 text-sm font-normal"
          >
            Copy list...
          </FormSubmit>
        </form>
        <Separator className="my-1" />
        <form action={onSubmitDelete}>
          <input hidden id="id" name="id" defaultValue={data.id} />
          <input
            hidden
            id="boardId"
            name="boardId"
            defaultValue={data.boardId}
          />
          <FormSubmit
            variant="ghost"
            className="h-auto w-full justify-start rounded-none p-2 px-5 text-sm font-normal"
          >
            Delete this list
          </FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
};
