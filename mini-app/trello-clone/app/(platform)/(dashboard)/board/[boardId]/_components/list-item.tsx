"use client";
import { ElementRef, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import { ListWithCard } from "@/types/prisma-types";

import { ListHeader } from "./list-header";
import { ListWrapper } from "./list-wrapper";

import { CardForm } from "./card-form";
import { CardItem } from "./card-item";

interface ListItemProps {
  item: ListWithCard;
}

export const ListItem = ({ item }: ListItemProps) => {
  const cardTextAreaRef = useRef<ElementRef<"textarea">>(null);
  const [isEditing, setIsEditing] = useState(false);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      cardTextAreaRef.current?.focus();
    });
  };

  const disabledEditing = () => {
    setIsEditing(false);
  };

  return (
    <ListWrapper>
      <div className="w-full rounded-md bg-[#f1f2f4] pb-2 shadow-md">
        <ListHeader onAddCard={enableEditing} data={item} />
        <ol
          className={cn(
            "mx-1 flex flex-col gap-y-2 px-1 py-0.5",
            item.cards.length > 0 ? "mt-2" : "mt-0",
          )}
        >
          {item.cards.map((item) => (
            <CardItem index={item.order} data={item} key={item.id} />
          ))}
        </ol>
        <CardForm
          enableEditing={enableEditing}
          disableEditing={disabledEditing}
          isEditing={isEditing}
          ref={cardTextAreaRef}
          listId={item.id}
        />
      </div>
    </ListWrapper>
  );
};
