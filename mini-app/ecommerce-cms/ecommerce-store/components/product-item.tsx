"use client";

import { Product } from "@/types";
import Image from "next/image";
import { ExpandIcon, ShoppingCartIcon } from "lucide-react";

import { Currency } from "@/components/ui/currency";
import { IconButton } from "@/components/ui/icon-button";

interface Props {
  item: Product;
}

export const ProductItem = ({ item }: Props) => {
  const imageUrl = item.images[0].url;

  return (
    <div className="bg-white group cursor-pointer border p-3 rounded-xl space-y-4">
      {/* Image and Action */}
      <div className="aspect-square rounded-xl bg-gray-100 relative">
        <Image
          className="aspect-square rounded-md object-cover"
          fill
          alt="Image"
          src={imageUrl}
        />
        <div className="opacity-0 group-hover:opacity-100 transition absolute bottom-5 w-full">
          <div className="flex items-center justify-center gap-x-2">
            <IconButton
              onClick={() => {}}
              icon={<ExpandIcon size={20} className="text-gray-600" />}
            />
            <IconButton
              onClick={() => {}}
              icon={<ShoppingCartIcon size={20} className="text-gray-600" />}
            />
          </div>
        </div>
      </div>
      {/* Description */}
      <div>
        <p className="font-semibold text-lg">{item.name}</p>
        <p className="text-sm text-gray-500">{item.category.name}</p>
      </div>
      {/* Price */}
      <div className="flex items-center justify-between">
        <Currency price={item.price} />
      </div>
    </div>
  );
};
