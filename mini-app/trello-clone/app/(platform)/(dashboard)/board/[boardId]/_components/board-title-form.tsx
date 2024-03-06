"use client";

import { ElementRef, useRef, useState } from "react";

import { Board } from "@prisma/client";

import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/form/form-input";
import { useAction } from "@/hooks/use-action";
import { updateBoard } from "@/actions/updateBoard";
import { toast } from "sonner";

interface BoardTitleFormProps {
  board: Board;
}

export const BoardTitleForm = ({ board }: BoardTitleFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const [title, setTitle] = useState(board.title);

  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const { execute } = useAction(updateBoard, {
    onSuccess: (data) => {
      toast.success(`Board ${data.title} updated!`);
      setTitle(data.title);
      disableEditing();
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

  const handleInputBlur = () => {
    formRef.current?.requestSubmit();
  };

  const onSubmit = (formData: FormData) => {
    let newTitle = formData.get("title") as string;
    newTitle = newTitle.trim();

    if (title === newTitle) {
      disableEditing();
    } else {
      execute({ title: newTitle, id: board.id });
    }
  };

  if (isEditing) {
    return (
      <form ref={formRef} action={onSubmit} className="flex items-center">
        <FormInput
          id="title"
          ref={inputRef}
          defaultValue={title}
          onBlur={handleInputBlur}
          className="h-7 bg-transparent py-1 text-lg font-bold"
        />
      </form>
    );
  }

  return (
    <Button
      onClick={enableEditing}
      variant="transparent"
      className="h-auto w-auto p-1 px-2 text-lg font-bold"
    >
      {board.title}
    </Button>
  );
};
