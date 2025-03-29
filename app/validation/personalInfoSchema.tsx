import { z } from "zod";
import { Gender } from "../types/enums/GenderEnum";
import { Cleanliness } from "../types/enums/CLeanlinessEnum";
import { Lifestyle } from "../types/enums/LifestyleEnum";

export const personalInfoSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  age: z.number().min(18),
  gender: z.nativeEnum(Gender),
  bio: z.string().optional(),
  cleanliness: z.nativeEnum(Cleanliness),
  lifestyle: z.array(z.nativeEnum(Lifestyle)),
});
export type PersonalInfoForm = z.infer<typeof personalInfoSchema>;
