import { z } from "zod";

import { Scheme } from "./scheme";

import { ActionState } from "@/lib/create-safe-action";

export type InputType = z.infer<typeof Scheme>;
export type ReturnType = ActionState<InputType, string>;
