"use client";
import { ElementRef, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import { ListWithCard } from "@/types/prisma-types";

import { ListHeader } from "./list-header";
import { ListWrapper } from "./list-wrapper";

import { CardForm } from "./card-form";
import { CardItem } from "./card-item";
import {
  Draggable,
  DraggableProvided,
  Droppable,
  DroppableProvided,
} from "@hello-pangea/dnd";

interface ListItemProps {
  item: ListWithCard;
  index: number;
}

export const ListItem = ({ item, index }: ListItemProps) => {
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
    <Draggable draggableId={item.id} index={index}>
      {(provided: DraggableProvided) => {
        return (
          <ListWrapper
            ref={provided.innerRef}
            {...provided.draggableProps}
            className="h-full w-[272px] shrink-0 select-none"
          >
            <div
              className="w-full rounded-md bg-[#f1f2f4] pb-2 shadow-md"
              {...provided.dragHandleProps}
            >
              <ListHeader onAddCard={enableEditing} data={item} />
              <Droppable droppableId={item.id} type="cards">
                {(provided) => {
                  return (
                    <ol
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={cn(
                        "mx-1 flex flex-col gap-y-2 px-1 py-0.5",
                        item.cards.length > 0 ? "mt-2" : "mt-0",
                      )}
                    >
                      {item.cards.map((item, index) => (
                        <CardItem index={index} data={item} key={item.id} />
                      ))}
                      {provided.placeholder}
                    </ol>
                  );
                }}
              </Droppable>
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
      }}
    </Draggable>
  );
};
