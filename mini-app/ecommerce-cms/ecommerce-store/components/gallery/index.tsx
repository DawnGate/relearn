"use client";
import { ProductImage } from "@/types";
import { TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { GalleryTab } from "./gallery-tab";
import Image from "next/image";

interface Props {
  images: ProductImage[];
}

export const Gallery = ({ images }: Props) => {
  return (
    <TabGroup as="div" className="flex flex-col-reverse">
      <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
        <TabList className="grid grid-cols-4 gap-6">
          {images.map((item) => (
            <GalleryTab key={item.id} image={item} />
          ))}
        </TabList>
      </div>
      <TabPanels className="aspect-square w-full">
        {images.map((image) => (
          <TabPanel key={image.id}>
            <div className="aspect-square relative h-full w-full sm:rounded-lg overflow-hidden">
              <Image
                fill
                src={image.url}
                alt="Image"
                className="object-cover object-center"
              />
            </div>
          </TabPanel>
        ))}
      </TabPanels>
    </TabGroup>
  );
};
