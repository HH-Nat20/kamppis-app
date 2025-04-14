import { z } from "zod";

export const roomProfileFormSchema = z.object({
  userIds: z.array(z.number()).optional(),
  flatId: z.number().optional(),
  name: z.string().optional(),
  rent: z.number().min(0),
  isPrivateRoom: z.boolean(),
  furnished: z.boolean(),
  furnishedInfo: z.string().optional(),
  bio: z.string().optional(),
  id: z.number().optional(),
});

export type RoomProfileForm = z.infer<typeof roomProfileFormSchema>;
