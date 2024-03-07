import { z } from "zod";

import { List } from "@prisma/client";

import { CreateListScheme } from "./scheme";

import { ActionState } from "@/lib/create-safe-action";

export type InputType = z.infer<typeof CreateListScheme>;
export type ReturnType = ActionState<InputType, List>;
