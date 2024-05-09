import { cn } from "@/lib/utils";
import { ProductImage } from "@/types";
import { Tab } from "@headlessui/react";
import Image from "next/image";

interface Props {
  image: ProductImage;
}

export const GalleryTab = ({ image }: Props) => {
  return (
    <Tab className="relative flex aspect-square cursor-pointer items-center justify-center rounded-md bg-white">
      {({ selected }) => (
        <div>
          <span className="absolute h-full w-full aspect-square inset-0 overflow-hidden rounded-md">
            <Image
              src={image.url}
              alt="Image"
              className="object-cover object-center"
              fill
            />
          </span>
          <span
            className={cn(
              "absolute inset-0 rounded-md ring-2 ring-offset-2",
              selected ? "ring-black" : "ring-transparent"
            )}
          ></span>
        </div>
      )}
    </Tab>
  );
};
