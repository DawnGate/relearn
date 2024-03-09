import { z } from "zod";

import { Card } from "@prisma/client";

import { UpdateCardOrderScheme } from "./scheme";

import { ActionState } from "@/lib/create-safe-action";

export type InputType = z.infer<typeof UpdateCardOrderScheme>;
export type ReturnType = ActionState<InputType, Card>;
