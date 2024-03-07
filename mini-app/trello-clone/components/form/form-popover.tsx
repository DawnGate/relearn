"use client";

import { toast } from "sonner";

import { useAction } from "@/hooks/use-action";

import { createBoard } from "@/actions/create-board";

import { X } from "lucide-react";

import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";

import { Button } from "../ui/button";
import { FormInput } from "./form-input";
import { FormSubmit } from "./form-submit";
import { FormPicker } from "./form-picker";

interface FormPopover {
  children: React.ReactNode;
  side?: "left" | "right" | "bottom" | "top";
  align?: "start" | "center" | "end";
  sideOffset?: number;
}

export const FormPopover = ({
  children,
  side = "bottom",
  align = "start",
  sideOffset = 0,
}: FormPopover) => {
  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      toast.success("Board created");
    },
    onError: (err) => {
      toast.error("Board error");
    },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const image = formData.get("image") as string;

    execute({
      title,
      image,
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        align={align}
        sideOffset={sideOffset}
        side={side}
        className="w-80 pt-3"
      >
        <div className="pb-4 text-center text-sm font-medium text-neutral-600">
          Create board
        </div>
        <PopoverClose asChild>
          <Button
            className="absolute right-2 top-2 h-auto w-auto p-2 text-neutral-600"
            variant="ghost"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <form action={onSubmit} className="space-y-4">
          <FormPicker id="image" errors={fieldErrors} />
          <FormInput
            id="title"
            errors={fieldErrors}
            type="text"
            label="Board title"
          />
          <FormSubmit>Create board</FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
};
