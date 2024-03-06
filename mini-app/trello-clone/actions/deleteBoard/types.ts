import { z } from "zod";

import { Board } from "@prisma/client";

import { DeleteBoardScheme } from "./scheme";

import { ActionState } from "@/lib/create-safe-action";

export type InputType = z.infer<typeof DeleteBoardScheme>;
export type ReturnType = ActionState<InputType, Board>;
