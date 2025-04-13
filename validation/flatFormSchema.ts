import { z } from "zod";
import { Location } from "@/types/enums/LocationEnum";
import { Utilities } from "@/types/enums/UtilitiesEnum";

export const flatFormSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  location: z.nativeEnum(Location),
  totalRoommates: z.number().min(1).max(10),
  petHousehold: z.boolean(),
  flatUtilities: z.array(z.nativeEnum(Utilities)),
});

export type FlatForm = z.infer<typeof flatFormSchema>;
