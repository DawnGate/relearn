"use client";
import { MoreHorizontal, X } from "lucide-react";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
} from "@/components/ui/popover";
import { useAction } from "@/hooks/use-action";
import { deleteBoard } from "@/actions/deleteBoard";

interface BoardOptionsProps {
  id: string;
}

export const BoardOptions = ({ id }: BoardOptionsProps) => {
  const { isLoading, execute } = useAction(deleteBoard, {
    onSuccess: (data) => {
      toast.success(`Delete board success!`);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const handleDeleteBoard = () => {
    execute({ id });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="transparent" className="h-auto w-auto p-2">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="relative px-0 py-3" align="end" side="bottom">
        <div className="pb-4 text-center text-sm font-medium text-neutral-600">
          Board actions
        </div>
        <PopoverClose asChild>
          <Button
            className="absolute right-2 top-2 h-auto w-auto p-2 text-neutral-600"
            variant="ghost"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <Button
          variant="ghost"
          disabled={isLoading}
          onClick={handleDeleteBoard}
          className="h-auto w-full justify-start rounded-none p-2 px-5 text-sm font-normal"
        >
          Delete this board
        </Button>
      </PopoverContent>
    </Popover>
  );
};
