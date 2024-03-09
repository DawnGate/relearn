"use client";

import { useCardModal } from "@/hooks/use-card-modal";

import { Draggable } from "@hello-pangea/dnd";

import { Card } from "@prisma/client";

interface CardItemProps {
  data: Card;
  index: number;
}

export const CardItem = ({ data, index }: CardItemProps) => {
  const openCardModal = useCardModal((state) => state.onOpen);

  const onClickCard = () => {
    openCardModal(data.id);
  };

  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="truncate rounded-md border-2 border-transparent bg-white px-3 py-2 text-sm shadow-sm hover:border-black"
            role="button"
            onClick={onClickCard}
          >
            {data.title}
          </div>
        );
      }}
    </Draggable>
  );
};
