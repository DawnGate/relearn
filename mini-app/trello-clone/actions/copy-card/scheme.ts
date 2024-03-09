import { z } from "zod";

export const CopyCardScheme = z.object({
  id: z.string(),
  boardId: z.string(),
});
