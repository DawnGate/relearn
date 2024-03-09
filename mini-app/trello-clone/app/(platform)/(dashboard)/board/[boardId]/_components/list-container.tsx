"use client";
import { useEffect, useState } from "react";

import { toast } from "sonner";

import {
  DragDropContext,
  DropResult,
  Droppable,
  DroppableProvided,
} from "@hello-pangea/dnd";

import { useAction } from "@/hooks/use-action";

import { updateListOrder } from "@/actions/update-list-order";
import { updateCardOrder } from "@/actions/update-card-order";

import { ListWithCard } from "@/types/prisma-types";

import { ListForm } from "./list-form";
import { ListItem } from "./list-item";

interface ListContainerProps {
  data: ListWithCard[];
  boardId: string;
}

function reorder<T>(arr: T[], startIndex: number, endIndex: number) {
  const [deleted] = arr.splice(startIndex, 1);
  arr.splice(endIndex, 0, deleted);
  return arr;
}

export const ListContainer = ({ data, boardId }: ListContainerProps) => {
  const { execute: executeReorderList } = useAction(updateListOrder, {
    onSuccess: () => {
      toast.success("Reorder list success!");
    },
    onError: (err) => {
      toast.error(err);
    },
  });

  const { execute: executeReorderCard } = useAction(updateCardOrder, {
    onSuccess: () => {
      toast.success("Reorder card success!");
    },
    onError: (err) => {
      toast.error(err);
    },
  });

  const [orderedData, setOrderedData] = useState(data);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;
    if (!destination) {
      return;
    }

    // if drop in same place
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // if user move the list
    if (type === "lists") {
      const newOrdered = reorder(
        [...orderedData],
        source.index,
        destination.index,
      ).map((item, index) => ({ ...item, order: index }));

      setOrderedData(newOrdered);
      executeReorderList({
        items: newOrdered,
        boardId,
      });
      return;
    }

    // if user move the card
    if (type === "cards") {
      let newOrderData = [...orderedData];
      const destinationList = orderedData.find(
        (list) => list.id === destination.droppableId,
      );
      const sourceList = orderedData.find(
        (list) => list.id === source.droppableId,
      );

      if (!destinationList || !sourceList) return;

      // user move card in same list
      if (destination.droppableId === source.droppableId) {
        const reorderCards = reorder(
          [...destinationList.cards],
          source.index,
          destination.index,
        );

        destinationList.cards = reorderCards.map((card, index) => {
          return { ...card, order: index };
        });

        setOrderedData(newOrderData);
        executeReorderCard({
          items: destinationList.cards,
          boardId,
        });
        return;
      }

      // user move card to other list
      if (destination.droppableId !== source.droppableId) {
        const [deleteCard] = sourceList.cards.splice(source.index, 1);

        deleteCard.listId = destination.droppableId;

        destinationList.cards.splice(destination.index, 0, deleteCard);

        destinationList.cards.forEach((card, index) => {
          card.order = index;
        });

        setOrderedData(newOrderData);
        executeReorderCard({
          items: destinationList.cards,
          boardId,
        });
        return;
      }
    }
  };

  useEffect(() => {
    setOrderedData(data);
  }, [data]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="board" type="lists" direction="horizontal">
        {(provided: DroppableProvided) => {
          return (
            <ol
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="flex h-full gap-x-3"
            >
              {orderedData.map((list, index) => (
                <ListItem key={list.id} item={list} index={index} />
              ))}
              {provided.placeholder}
              <ListForm />
              <div className="w-1 flex-shrink-0"></div>
            </ol>
          );
        }}
      </Droppable>
    </DragDropContext>
  );
};
