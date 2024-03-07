import { z } from "zod";

import { List } from "@prisma/client";

import { DeleteListScheme } from "./scheme";

import { ActionState } from "@/lib/create-safe-action";

export type InputType = z.infer<typeof DeleteListScheme>;
export type ReturnType = ActionState<InputType, List>;
