import { z } from "zod";

import { List } from "@prisma/client";

import { UpdateListScheme } from "./scheme";

import { ActionState } from "@/lib/create-safe-action";

export type InputType = z.infer<typeof UpdateListScheme>;
export type ReturnType = ActionState<InputType, List>;
