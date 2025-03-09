import * as yup from "yup";
import { Gender } from "../types/enums/GenderEnum";
import { Lifestyle } from "../types/enums/LifestyleEnum";

export const profileSchema = yup.object().shape({
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
  maxRent: yup.string().required("Rent budget is required"),
  lifestyle: yup
    .array()
    .of(
      yup
        .mixed<Lifestyle>()
        .oneOf(Object.values(Lifestyle), "Invalid lifestyle")
    ).min(1, "Select at least one lifestyle option"),
  bio: yup.string().max(500, "Bio must be under 500 characters"),
  minAgePreference: yup.number().min(18, "Minimum age must be 18"),
  maxAgePreference: yup
    .number()
    .max(99, "Max age must be below 99")
    .moreThan(
      yup.ref("minAgePreference"),
      "Max age must be greater than Min age"
    ),
  preferredGender: yup
    .mixed<Gender>()
    .oneOf(Object.values(Gender), "Invalid selection"),
  preferredLocations: yup.array().of(yup.string()),
});
