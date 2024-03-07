import { List } from "@prisma/client";
import { ListHeader } from "./list-header";
import { ListWrapper } from "./list-wrapper";

interface ListItemProps {
  item: List;
}

export const ListItem = ({ item }: ListItemProps) => {
  return (
    <ListWrapper>
      <div className="w-full rounded-md bg-[#f1f2f4] pb-2 shadow-md">
        <ListHeader data={item} />
      </div>
    </ListWrapper>
  );
};
