import React from "react";
import { createContext, useContext, useEffect, useMemo, useRef } from "react";
import { useForm, FormProvider, FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ActivityIndicator } from "react-native";
import Toast from "react-native-toast-message";
import { useUser } from "./UserContext";
import { useUpdateUserProfileMutation } from "../queries/profileMutations";
import { getUserProfileQueryOptions } from "../queries/profileQueries";
import { useQuery } from "@tanstack/react-query";
import {
  personalInfoSchema,
  PersonalInfoForm,
} from "../validation/personalInfoSchema";
import { Gender } from "../types/enums/GenderEnum";
import { Cleanliness } from "../types/enums/CLeanlinessEnum";
import { Lifestyle } from "../types/enums/LifestyleEnum";

const PersonalInfoFormContext = createContext<any>(undefined);

export const PersonalInfoFormProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const isMounted = React.useRef(false);
  const { user } = useUser();
  const profileId = user?.userProfile.id;

  const mutation = useUpdateUserProfileMutation(profileId);
  const { isPending, data: profile } = useQuery(
    getUserProfileQueryOptions(profileId)
  );

  const defaultValues = React.useMemo(
    () => ({
      firstName: "Jonne",
      lastName: "",
      age: 18,
      gender: Gender.NOT_IMPORTANT,
      bio: "",
      cleanliness: Cleanliness.TIDY,
      lifestyle: [] as Lifestyle[],
    }),
    []
  );

  const methods = useForm<PersonalInfoForm>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { errors },
  } = methods;

  useEffect(() => {
    if (profile) {
      reset({
        firstName: profile.user.firstName ?? "",
        lastName: profile.user.lastName ?? "",
        age: profile.user.age ?? 18,
        gender: profile.user.gender ?? Gender.NOT_IMPORTANT,
        bio: profile.bio ?? "",
        cleanliness: profile.cleanliness ?? Cleanliness.TIDY,
        lifestyle: profile.lifestyle ?? [],
      });
    }
  }, [profile]);

  useEffect(() => {
    isMounted.current = true;
  }, []);

  const onSubmit = async (data: PersonalInfoForm) => {
    try {
      await mutation!.mutateAsync(data);
      Toast.show({
        type: "success",
        text1: "Saved",
        text2: "Personal info updated",
      });
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Could not update personal info",
      });
    }
  };

  return (
    <PersonalInfoFormContext.Provider
      value={{ onSubmit, formState: { errors } }}
    >
      <FormProvider {...methods}>
        {isPending ? <ActivityIndicator size="large" color="#fff" /> : children}
      </FormProvider>
    </PersonalInfoFormContext.Provider>
  );
};

export const usePersonalInfoForm = () => {
  const context = useContext(PersonalInfoFormContext);
  if (!context)
    throw new Error("usePersonalInfoForm must be used inside provider");
  return context;
};
