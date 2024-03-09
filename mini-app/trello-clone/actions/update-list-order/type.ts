import { z } from "zod";

import { List } from "@prisma/client";

import { UpdateListOrderScheme } from "./scheme";

import { ActionState } from "@/lib/create-safe-action";

export type InputType = z.infer<typeof UpdateListOrderScheme>;
export type ReturnType = ActionState<InputType, List[]>;
