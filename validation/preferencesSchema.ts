import { z } from "zod";
import { Gender } from "@/types/enums/GenderEnum";
import { Location } from "@/types/enums/LocationEnum";

export const preferencesSchema = z
  .object({
    maxRent: z.number().min(0),
    hasPrivateRoom: z.boolean().nullable(),
    maxRoommates: z.number().min(1).max(10),
    minAgePreference: z.number().min(18),
    maxAgePreference: z.number().max(120),
    genderPreferences: z.array(z.nativeEnum(Gender)),
    locationPreferences: z.array(z.nativeEnum(Location)),
  })
  .refine(
    (data) => {
      return data.maxAgePreference >= data.minAgePreference;
    },
    {
      message: "Max age must be greater than or equal to min age.",
      path: ["maxAgePreference"],
    }
  );

export type PreferencesForm = z.infer<typeof preferencesSchema>;
