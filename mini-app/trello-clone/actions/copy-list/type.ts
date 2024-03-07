import { z } from "zod";

import { List } from "@prisma/client";

import { CopyListScheme } from "./scheme";

import { ActionState } from "@/lib/create-safe-action";

export type InputType = z.infer<typeof CopyListScheme>;
export type ReturnType = ActionState<InputType, List>;
