import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { User } from "../types/User";
import { Gender } from "../types/enums/GenderEnum";

export const ProfileFormContext = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const methods = useForm<User>({
    defaultValues: {
      firstName: "",
      lastName: "",
      age: 18,
      gender: Gender.OTHER,
      maxRent: "HIGH",
      lifestyle: [],
      bio: "",
      minAgePreference: 18,
      maxAgePreference: 99,
      preferredGender: Gender.NOT_IMPORTANT,
      preferredLocations: [],
    },
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};
