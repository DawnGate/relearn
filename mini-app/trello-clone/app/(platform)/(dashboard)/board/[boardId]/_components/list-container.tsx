import { ListWithCard } from "@/types/prisma-types";

import { ListForm } from "./list-form";
import { ListItem } from "./list-item";

interface ListContainerProps {
  data: ListWithCard[];
  boardId: string;
}

export const ListContainer = ({ data, boardId }: ListContainerProps) => {
  return (
    <ol className="flex h-full gap-x-3">
      {data.map((list) => (
        <ListItem key={list.id} item={list} />
      ))}
      <ListForm />
      <div className="w-1 flex-shrink-0"></div>
    </ol>
  );
};
