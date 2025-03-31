import { date, z } from "zod";
import { Gender } from "../types/enums/GenderEnum";
import { LookingFor } from "../types/enums/LookingForEnum";

export const userFormSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  gender: z.nativeEnum(Gender),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
  lookingFor: z.nativeEnum(LookingFor),
});

export type UserForm = z.infer<typeof userFormSchema>;
