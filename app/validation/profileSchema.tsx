import * as yup from "yup";
import { Gender } from "../types/enums/GenderEnum";
import { Lifestyle } from "../types/enums/LifestyleEnum";
import { Location } from "../types/enums/LocationEnum";
import { Cleanliness } from "../types/enums/CLeanlinessEnum";
import { MaxRent } from "../types/enums/MaxRentEnum";

export const profileSchema = yup.object({
  firstName: yup
    .string()
    .required("First name is required")
    .min(2, "Too short")
    .max(25, "Too long"),
  lastName: yup
    .string()
    .required("Last name is required")
    .min(2, "Too short")
    .max(50, "Too long"),
  age: yup
    .number()
    .required("Age is required")
    .min(18, "You must be at least 18")
    .max(99, "Age must be below 99"),
  gender: yup.mixed<Gender>().oneOf(Object.values(Gender), "Invalid gender"),
  maxRent: yup.string().oneOf(Object.values(MaxRent)).required(),
  lifestyle: yup
    .array()
    .of(
      yup
        .mixed<Lifestyle>()
        .oneOf(Object.values(Lifestyle), "Invalid lifestyle")
    )
    .min(1, "Select at least one lifestyle option"),
  cleanliness: yup
    .mixed<Cleanliness>()
    .oneOf(Object.values(Cleanliness))
    .required(),
  bio: yup.string().max(500, "Bio must be under 500 characters"),
  minAgePreference: yup.number().min(18, "Minimum age must be 18"),
  maxAgePreference: yup
    .number()
    .max(99, "Max age must be below 99")
    .moreThan(
      yup.ref("minAgePreference"),
      "Max age must be greater than Min age"
    ),
  preferredGenders: yup
    .array()
    .of(yup.mixed<Gender>().oneOf(Object.values(Gender), "Invalid selection"))
    .min(1, "Select at least one preferred gender option"),
  preferredLocations: yup
    .array()
    .of(
      yup.mixed<Location>().oneOf(Object.values(Location), "Invalid location")
    )
    .min(1, "Select at least one preferred location option"),
});

export type UserFormSchema = yup.InferType<typeof profileSchema>;
