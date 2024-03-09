import { z } from "zod";

import { Card } from "@prisma/client";

import { CopyCardScheme } from "./scheme";

import { ActionState } from "@/lib/create-safe-action";

export type InputType = z.infer<typeof CopyCardScheme>;
export type ReturnType = ActionState<InputType, Card>;
