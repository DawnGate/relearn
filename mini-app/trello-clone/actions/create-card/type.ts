import { z } from "zod";

import { Card } from "@prisma/client";

import { CreateCardScheme } from "./scheme";

import { ActionState } from "@/lib/create-safe-action";

export type InputType = z.infer<typeof CreateCardScheme>;
export type ReturnType = ActionState<InputType, Card>;
