import { z } from "zod";

import { Board } from "@prisma/client";

import { UpdateBoardScheme } from "./scheme";

import { ActionState } from "@/lib/create-safe-action";

export type InputType = z.infer<typeof UpdateBoardScheme>;
export type ReturnType = ActionState<InputType, Board>;
