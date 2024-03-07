"use client";

import { ElementRef, useRef, useState } from "react";

import { toast } from "sonner";

import { useEventListener } from "usehooks-ts";

import { List } from "@prisma/client";

import { updateList } from "@/actions/update-list";
import { useAction } from "@/hooks/use-action";

import { FormInput } from "@/components/form/form-input";

interface ListHeaderProps {
  data: List;
}

export const ListHeader = ({ data }: ListHeaderProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(data.title);

  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const { fieldErrors, execute } = useAction(updateList, {
    onSuccess: (data) => {
      toast.success("List has updated!");
      disableEditing();
      setTitle(data.title);
    },
    onError: (err) => {
      toast.error(err);
    },
  });

  const enableEditing = () => {
    setIsEditing(true);

    setTimeout(() => {
      formRef.current?.focus();
      inputRef.current?.select();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onSubmit = (formData: FormData) => {
    let newTitle = formData.get("title") as string;
    newTitle = newTitle.trim();

    if (newTitle === data.title) {
      disableEditing();
      return;
    }

    execute({
      title: newTitle,
      id: data.id,
      boardId: data.boardId,
    });
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      formRef.current?.requestSubmit();
    }
  };

  useEventListener("keydown", handleKeyDown);

  let content;
  if (isEditing) {
    content = (
      <form ref={formRef} action={onSubmit} className="flex-1 px-1">
        <FormInput
          id="title"
          errors={fieldErrors}
          ref={inputRef}
          placeholder="Enter list title..."
          className="truncate bg-transparent px-2 text-sm font-medium focus:bg-white"
          onBlur={onBlur}
        />
      </form>
    );
  } else {
    content = (
      <button
        type="button"
        className="w-full cursor-pointer truncate border-transparent px-2 py-1 text-left text-sm"
        onClick={enableEditing}
      >
        {title}
      </button>
    );
  }

  return (
    <div className="flex items-center justify-start gap-x-2 px-2 pt-2">
      {content}
    </div>
  );
};
