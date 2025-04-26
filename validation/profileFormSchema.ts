import { z } from "zod";
import { Cleanliness } from "@/types/enums/CLeanlinessEnum";
import { Lifestyle } from "@/types/enums/LifestyleEnum";
import { Pets } from "@/types/enums/PetsEnum";

export const profileFormSchema = z.object({
  bio: z.string().optional(),
  cleanliness: z.nativeEnum(Cleanliness),
  lifestyle: z.array(z.nativeEnum(Lifestyle)),
  pets: z.nativeEnum(Pets).optional(),
});

export type ProfileForm = z.infer<typeof profileFormSchema>;
