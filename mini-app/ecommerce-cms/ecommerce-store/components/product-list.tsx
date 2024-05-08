import { Product } from "@/types";

import { NoResult } from "@/components/no-result";
import { ProductItem } from "./product-item";

interface Props {
  title: string;
  items: Product[];
}

export const ProductList = ({ title, items }: Props) => {
  return (
    <div className="space-y-4">
      <h3 className="font-bold text-3xl">{title}</h3>
      {items.length === 0 && <NoResult />}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {items.map((item) => (
          <ProductItem item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};
