import { z } from "zod";

import { Card } from "@prisma/client";

import { UpdateCardScheme } from "./scheme";

import { ActionState } from "@/lib/create-safe-action";

export type InputType = z.infer<typeof UpdateCardScheme>;
export type ReturnType = ActionState<InputType, Card>;
