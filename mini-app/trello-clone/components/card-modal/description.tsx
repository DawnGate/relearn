"use client";

import { ElementRef, useRef, useState } from "react";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

import { useParams } from "next/navigation";

import { toast } from "sonner";

import { useQueryClient } from "@tanstack/react-query";

import { useAction } from "@/hooks/use-action";
import { updateCard } from "@/actions/update-card";

import { AlignLeft } from "lucide-react";

import { CardWithList } from "@/types/prisma-types";

import { Skeleton } from "../ui/skeleton";
import { FormTextarea } from "../form/form-textarea";
import { Button } from "../ui/button";
import { FormSubmit } from "../form/form-submit";

interface CardDescriptionProps {
  data: CardWithList;
}

export const CardDescription = ({ data }: CardDescriptionProps) => {
  const params = useParams();
  const queryClient = useQueryClient();

  const [isEditing, setIsEditing] = useState(false);

  const formRef = useRef<ElementRef<"form">>(null);
  const textareaRef = useRef<ElementRef<"textarea">>(null);

  const { execute, fieldErrors } = useAction(updateCard, {
    onSuccess: (data) => {
      toast.success(`Updated "${data.title}" success!`);
      queryClient.invalidateQueries({
        queryKey: ["card", data.id],
      });
      disableEditing();
    },
    onError: (err) => {
      toast.error(err);
    },
  });

  const enableEditing = () => {
    setIsEditing(true);

    setTimeout(() => {
      textareaRef.current?.focus();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      disableEditing();
    }
  };

  useEventListener("keydown", onKeyDown);
  useOnClickOutside(formRef, disableEditing);

  const onSubmit = (formData: FormData) => {
    let newDescription = formData.get("description") as string;
    newDescription = newDescription.trim();

    const boardId = params.boardId as string;

    if (newDescription === data.description) {
      return;
    }

    execute({
      description: newDescription,
      id: data.id,
      boardId,
    });
  };

  return (
    <div className="flex w-full items-start gap-x-3">
      <AlignLeft className="mt-0.5 h-5 w-5 text-neutral-700" />
      <div className="w-full">
        <p className="mb-2 font-semibold text-neutral-700">Description</p>
        {isEditing ? (
          <form ref={formRef} action={onSubmit} className="space-y-2">
            <FormTextarea
              id="description"
              ref={textareaRef}
              onBlur={onBlur}
              errors={fieldErrors}
              defaultValue={data.description || undefined}
              placeholder="Add a more detailed description..."
            />
            <div className="flex items-center gap-x-2">
              <FormSubmit>Save</FormSubmit>
              <Button
                size="sm"
                variant="ghost"
                onClick={disableEditing}
                type="button"
              >
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <div
            onClick={enableEditing}
            role="button"
            className="min-h-[78px] rounded-md bg-neutral-200 px-3.5 py-3 text-sm font-medium"
          >
            {data.description || "Add a more detailed description..."}
          </div>
        )}
      </div>
    </div>
  );
};

CardDescription.Skeleton = function CardDescriptionSkeleton() {
  return (
    <div className="flex w-full items-start gap-x-3">
      <Skeleton className="h-6 w-6 bg-neutral-200" />
      <div className="w-full">
        <Skeleton className="mb-2 h-6 w-24 bg-neutral-200" />
        <Skeleton className="h-[78px] w-full bg-neutral-200" />
      </div>
    </div>
  );
};
