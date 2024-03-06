import { z } from "zod";

export const DeleteBoardScheme = z.object({
  id: z.string(),
});
