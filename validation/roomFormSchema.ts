import { z } from "zod";
import { Location } from "@/types/enums/LocationEnum";

export const roomProfileFormSchema = z.object({
  name: z.string().optional(),
  totalRoommates: z.number().min(1).max(10),
  location: z.nativeEnum(Location),
  rent: z.number().min(0),
  isPrivateRoom: z.boolean(),
  furnished: z.boolean(),
  furnishedInfo: z.string().optional(),
});

export type RoomProfileForm = z.infer<typeof roomProfileFormSchema>;
