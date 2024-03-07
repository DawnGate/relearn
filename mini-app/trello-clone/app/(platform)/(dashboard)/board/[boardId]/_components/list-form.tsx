"use client";

import { ElementRef, useRef, useState } from "react";

import { useParams } from "next/navigation";

import { useEventListener, useOnClickOutside } from "usehooks-ts";

import { Plus, X } from "lucide-react";

import { toast } from "sonner";

import { useAction } from "@/hooks/use-action";

import { createList } from "@/actions/create-list";

import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/form/form-input";
import { FormSubmit } from "@/components/form/form-submit";

import { ListWrapper } from "./list-wrapper";

export const ListForm = () => {
  const params = useParams();

  const [isEditing, setIsEditing] = useState(false);

  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const { execute, fieldErrors } = useAction(createList, {
    onSuccess: (data) => {
      toast.success(`List ${data.title} is created`);
      disableEditing();
    },
    onError: (err) => {
      toast.error(err);
    },
  });

  const enableEditing = () => {
    setIsEditing(true);

    setTimeout(() => {
      inputRef.current?.focus();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      disableEditing();
    }
  };

  useEventListener("keydown", handleKeyDown);
  useOnClickOutside(formRef, disableEditing);

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const boardId = formData.get("boardId") as string;

    execute({
      title,
      boardId,
    });
  };

  if (isEditing) {
    return (
      <ListWrapper>
        <form
          ref={formRef}
          className="w-full space-y-4 rounded-md bg-white p-3 shadow-md"
          action={onSubmit}
        >
          <FormInput
            id="title"
            ref={inputRef}
            errors={fieldErrors}
            className="h-7 border-transparent px-2 py-1 text-sm font-medium transition hover:border-input focus:border-input"
            placeholder="Enter list title..."
          />
          <input hidden name="boardId" value={params.boardId} />
          <div className="flex items-center gap-x-1">
            <FormSubmit>Add list</FormSubmit>
            <Button variant="ghost" size="sm" onClick={disableEditing}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </ListWrapper>
    );
  }

  return (
    <ListWrapper>
      <button
        type="button"
        onClick={enableEditing}
        className="text-natural-500 flex w-full items-center justify-start rounded-md bg-white/80 p-3 text-sm font-medium hover:bg-white/50"
      >
        <Plus className="mr-2 h-4 w-4" />
        Add a list
      </button>
    </ListWrapper>
  );
};
