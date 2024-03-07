import { ListWithCard } from "@/types/prisma-types";

import { ListForm } from "./list-form";

interface ListContainerProps {
  data: ListWithCard[];
  boardId: string;
}

export const ListContainer = ({ data, boardId }: ListContainerProps) => {
  return (
    <ol>
      <ListForm />
      <div className="w-1 flex-shrink-0"></div>
    </ol>
  );
};
