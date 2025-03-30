import { z } from "zod";
import { Gender } from "../types/enums/GenderEnum";

export const userFormSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  age: z.number().min(18),
  gender: z.nativeEnum(Gender),
});

export type UserForm = z.infer<typeof userFormSchema>;
