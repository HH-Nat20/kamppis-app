import React, { createContext, useContext, useEffect, useRef } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUser } from "./UserContext";
import { useQuery } from "@tanstack/react-query";
import { getUserProfileQueryOptions } from "../queries/profileQueries";
import { Gender } from "../types/enums/GenderEnum";
import {
  personalInfoSchema,
  PersonalInfoForm,
} from "../validation/personalInfoSchema";

const UserFormContext = createContext<any>(undefined);

export const UserFormProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const isMounted = useRef(false);
  const { user } = useUser();
  const profileId = user?.userProfile.id;

  const { isPending, data: profile } = useQuery(
    getUserProfileQueryOptions(profileId)
  );

  const methods = useForm<PersonalInfoForm>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      age: 18,
      gender: Gender.NOT_IMPORTANT,
    },
  });

  const { reset } = methods;

  useEffect(() => {
    if (profile) {
      reset({
        firstName: profile.user.firstName ?? "",
        lastName: profile.user.lastName ?? "",
        age: profile.user.age ?? 18,
        gender: profile.user.gender ?? Gender.NOT_IMPORTANT,
      });
    }
  }, [profile]);

  useEffect(() => {
    isMounted.current = true;
  }, []);

  return (
    <UserFormContext.Provider value={{}}>
      <FormProvider {...methods}>{isPending ? null : children}</FormProvider>
    </UserFormContext.Provider>
  );
};

export const useUserForm = () => {
  const context = useContext(UserFormContext);
  if (!context)
    throw new Error("useUserForm must be used within UserFormProvider");
  return context;
};
