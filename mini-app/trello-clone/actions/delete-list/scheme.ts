import { z } from "zod";

export const DeleteListScheme = z.object({
  boardId: z.string(),
  id: z.string(),
});
