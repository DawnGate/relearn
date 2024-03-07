"use client";

import { ElementRef, useRef, useState } from "react";

import { Plus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/form/form-input";
import { FormSubmit } from "@/components/form/form-submit";

import { ListWrapper } from "./list-wrapper";

export const ListForm = () => {
  const [isEditing, setIsEditing] = useState(false);

  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const enableEditing = () => {
    setIsEditing(true);
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <ListWrapper>
        <form
          ref={formRef}
          className="w-full space-y-4 rounded-md bg-white p-3 shadow-md"
        >
          <FormInput
            id="title"
            ref={inputRef}
            className="h-7 border-transparent px-2 py-1 text-sm font-medium transition hover:border-input focus:border-input"
            placeholder="Enter list title..."
          />
          <input className="hidden" />
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
      <Button
        onClick={enableEditing}
        className="text-natural-500 flex w-full items-center justify-start rounded-md bg-white/80 p-3 text-sm font-medium hover:bg-white/50"
      >
        <Plus className="mr-2 h-4 w-4" />
        Add a list
      </Button>
    </ListWrapper>
  );
};
