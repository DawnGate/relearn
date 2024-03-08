"use client";

import { ElementRef, KeyboardEventHandler, forwardRef, useRef } from "react";
import { useParams } from "next/navigation";

import { toast } from "sonner";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

import { Plus, X } from "lucide-react";

import { useAction } from "@/hooks/use-action";

import { createCard } from "@/actions/create-card";
import { FormSubmit } from "@/components/form/form-submit";
import { FormTextarea } from "@/components/form/form-textarea";
import { Button } from "@/components/ui/button";

interface CardFormProps {
  listId: string;
  enableEditing: () => void;
  disableEditing: () => void;
  isEditing: boolean;
}

export const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(
  ({ listId, enableEditing, disableEditing, isEditing }, ref) => {
    const formRef = useRef<ElementRef<"form">>(null);

    const params = useParams();

    const { execute, fieldErrors } = useAction(createCard, {
      onSuccess: (data) => {
        toast.success(`Card ${data.title} created!`);
        disableEditing();
      },
      onError: (err) => {
        toast.error(err);
      },
    });

    const onSubmit = (formData: FormData) => {
      const title = formData.get("title") as string;
      const listId = formData.get("listId") as string;
      const boardId = params.boardId as string;

      execute({ title, listId, boardId });
    };

    const onTextareaKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (
      e,
    ) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        formRef.current?.requestSubmit();
      }
    };

    const onKeydown = (e: KeyboardEvent) => {
      if (e.key === "Esc") {
        disableEditing();
      }
    };

    useOnClickOutside(formRef, disableEditing);
    useEventListener("keydown", onKeydown);

    if (isEditing) {
      return (
        <form
          ref={formRef}
          action={onSubmit}
          className="m-1 space-y-4 px-1 py-0.5"
        >
          <FormTextarea
            onKeyDown={onTextareaKeyDown}
            ref={ref}
            id="title"
            placeholder="Enter a title for this card..."
            errors={fieldErrors}
          />
          <input hidden id="listId" name="listId" defaultValue={listId} />
          <div className="flex items-center gap-x-1">
            <FormSubmit>Add card</FormSubmit>
            <Button onClick={disableEditing} size="sm" variant="ghost">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </form>
      );
    }

    return (
      <div className="px-2 pt-2">
        <Button
          className="flex h-auto w-full items-center justify-start px-2 py-1.5 text-sm text-muted-foreground"
          size="sm"
          variant="ghost"
          onClick={enableEditing}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add a card
        </Button>
      </div>
    );
  },
);

CardForm.displayName = "CardForm";
