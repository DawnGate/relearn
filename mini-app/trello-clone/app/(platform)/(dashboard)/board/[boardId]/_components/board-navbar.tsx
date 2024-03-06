import { Board } from "@prisma/client";
import { BoardTitleForm } from "./board-title-form";
import { BoardOptions } from "./board-options";

interface BoardNavBarProps {
  board: Board;
}

export const BoardNavbar = ({ board }: BoardNavBarProps) => {
  return (
    <div className="fixed top-14 z-40 flex h-14 w-full items-center bg-black/50 px-6 text-white">
      <BoardTitleForm board={board} />
      <div className="ml-auto">
        <BoardOptions id={board.id} />
      </div>
    </div>
  );
};
