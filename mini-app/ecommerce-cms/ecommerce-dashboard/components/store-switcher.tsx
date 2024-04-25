"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

import {
  Check,
  ChevronsUpDownIcon,
  PlusCircleIcon,
  StoreIcon,
} from "lucide-react";

import { Store } from "@prisma/client";
import { cn } from "@/lib/utils";
import { useModal } from "@/hooks/use-modal";

interface Props {
  items: Store[];
}

export const StoreSwitcher = ({ items }: Props) => {
  const params = useParams();

  const storeModal = useModal();

  const formattedItems = items.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  const currentStore = formattedItems.find(
    (item) => item.value === params.storeId
  );

  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a store"
          className="w-[200px] justify-between"
        >
          <StoreIcon className="h-5 w-5 mr-2" />
          {currentStore?.label}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Command>
          <CommandList>
            <CommandInput placeholder="Search store..." />
            <CommandEmpty>No Store found.</CommandEmpty>
            <CommandGroup heading="Stores">
              {formattedItems.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={(currentValue) => {
                    setOpen(false);
                  }}
                  className="text-sm"
                >
                  <StoreIcon className="mr-2 h-4 w-4" />
                  {item.label}
                  <Check
                    className={cn(
                      "ml-2 h-4 w-4",
                      item.value === currentStore?.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup heading="AddStore">
              <CommandItem
                onSelect={() => {
                  storeModal.onOpen();
                  setOpen(false);
                }}
                className="text-sm"
              >
                <PlusCircleIcon className="mr-2 h-4 w-4" />
                Create a new store
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
