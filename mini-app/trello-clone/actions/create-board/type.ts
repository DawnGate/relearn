import { z } from "zod";

import { Board } from "@prisma/client";

import { BoardScheme } from "./scheme";

import { ActionState } from "@/lib/create-safe-action";

export type InputType = z.infer<typeof BoardScheme>;
export type ReturnType = ActionState<InputType, Board>;
