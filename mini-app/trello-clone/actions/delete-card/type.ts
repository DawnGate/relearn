import { z } from "zod";

import { Card } from "@prisma/client";

import { DeleteCardScheme } from "./scheme";

import { ActionState } from "@/lib/create-safe-action";

export type InputType = z.infer<typeof DeleteCardScheme>;
export type ReturnType = ActionState<InputType, Card>;
