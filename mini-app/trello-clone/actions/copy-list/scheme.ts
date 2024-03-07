import { z } from "zod";

export const CopyListScheme = z.object({
  boardId: z.string(),
  id: z.string(),
});
