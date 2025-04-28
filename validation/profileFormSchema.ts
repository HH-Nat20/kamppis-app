import { z } from "zod";
import { Cleanliness } from "@/types/enums/CLeanlinessEnum";
import { Lifestyle } from "@/types/enums/LifestyleEnum";
import { Pets } from "@/types/enums/PetsEnum";

export const profileFormSchema = z
  .object({
    bio: z.string().optional(),
    cleanliness: z.nativeEnum(Cleanliness),
    lifestyle: z.array(z.nativeEnum(Lifestyle)),
    pets: z.nativeEnum(Pets).optional(),
  })
  .refine(
    (data) => {
      const lifestyle = data.lifestyle;

      const hasConflict =
        (lifestyle.includes(Lifestyle.EARLY_BIRD) &&
          lifestyle.includes(Lifestyle.NIGHT_OWL)) ||
        (lifestyle.includes(Lifestyle.PARTY_GOER) &&
          lifestyle.includes(Lifestyle.HOMEBODY));

      return !hasConflict;
    },
    {
      message: "You can't select conflicting lifestyles.",
      path: ["lifestyle"],
    }
  );

export type ProfileForm = z.infer<typeof profileFormSchema>;
