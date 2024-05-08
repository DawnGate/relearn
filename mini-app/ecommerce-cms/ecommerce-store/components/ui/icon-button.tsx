import { MouseEventHandler, ReactElement } from "react";
import { cn } from "@/lib/utils";

interface Props {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  icon: ReactElement;
  className?: string;
}

export const IconButton = ({ onClick, icon, className }: Props) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full flex items-center justify-center bg-white border shadow-md p-2 hover:scale-110 transition",
        className
      )}
    >
      {icon}
    </button>
  );
};
