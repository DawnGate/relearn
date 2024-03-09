"use client";
import { ElementRef, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "sonner";

import { useQueryClient } from "@tanstack/react-query";

import { useAction } from "@/hooks/use-action";
import { updateCard } from "@/actions/update-card";

import { CardWithList } from "@/types/prisma-types";

import { Layout } from "lucide-react";

import { Skeleton } from "../ui/skeleton";
import { FormInput } from "../form/form-input";

interface CardHeaderProps {
  data: CardWithList;
}

export const CardHeader = ({ data }: CardHeaderProps) => {
  const params = useParams();
  const queryClient = useQueryClient();

  const [title, setTitle] = useState(data.title);

  const inputRef = useRef<ElementRef<"input">>(null);

  const { execute, fieldErrors } = useAction(updateCard, {
    onSuccess: (data) => {
      toast.success(`Updated "${data.title}" success!`);
      setTitle(data.title);
      queryClient.invalidateQueries({
        queryKey: ["card", data.id],
      });
    },
    onError: (err) => {
      toast.error(err);
    },
  });

  const onSubmit = (formData: FormData) => {
    let newTitle = formData.get("title") as string;
    newTitle = newTitle.trim();
    const boardId = params.boardId as string;

    if (newTitle === title) {
      return;
    }

    execute({
      title: newTitle,
      id: data.id,
      boardId,
    });
  };

  const onBlur = () => {
    inputRef.current?.form?.requestSubmit();
  };

  return (
    <div className="mb-6 flex items-start gap-x-3">
      <Layout className="mt-1 h-6 w-5 text-neutral-700" />
      <div className="w-full">
        <form action={onSubmit}>
          <FormInput
            id="title"
            ref={inputRef}
            defaultValue={title}
            errors={fieldErrors}
            onBlur={onBlur}
            className="relative -left-1.5 mb-0.5 w-[95%] truncate border-transparent bg-transparent px-1 text-xl font-semibold text-neutral-700 focus-visible:border-input focus-visible:bg-white"
          />
        </form>
        <p className="text-sm text-muted-foreground">
          in list <span className="underline">{data.list.title}</span>
        </p>
      </div>
    </div>
  );
};

CardHeader.Skeleton = function CardHeaderSkeleton() {
  return (
    <div className="mb-6 flex items-start gap-x-3">
      <Skeleton className="mt-1 h-6 w-6 bg-neutral-200" />
      <div>
        <Skeleton className="mb-1 h-6 w-24 bg-neutral-200" />
        <Skeleton className="h-6 w-12 bg-neutral-200" />
      </div>
    </div>
  );
};
