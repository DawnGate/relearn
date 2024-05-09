"use client";

import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { Color, Size } from "@/types";
import { Dialog, DialogPanel } from "@headlessui/react";
import { PlusIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { Filter } from "./filter";

interface Props {
  colors: Color[];
  sizes: Size[];
}

export const MobileFilters = ({ colors, sizes }: Props) => {
  const [open, setOpen] = useState(false);

  const onOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button className="flex items-center gap-x-2 lg:hidden" onClick={onOpen}>
        Fitlers
        <PlusIcon size={20} />
      </Button>
      <Dialog
        open={open}
        as="div"
        className="relative z-40 lg:hidden"
        onClose={onClose}
      >
        {/* Background */}
        <div className="fixed inset-0 bg-black bg-opacity-25"></div>

        {/* Dialog position */}
        <div className="fixed inset-0 z-40 flex">
          <DialogPanel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl">
            {/* Close Button */}
            <div className="flex items-center justify-end px-4">
              <IconButton
                icon={<XIcon size={15} />}
                onClick={onClose}
              ></IconButton>
            </div>

            {/* Render the filters */}
            <div className="p-4">
              <Filter valueKey="sizeId" data={sizes} name="Sizes" />
              <Filter valueKey="colorId" data={colors} name="Colors" />
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};
