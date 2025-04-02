import React, { createContext, useContext, useEffect, useRef } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Toast from "react-native-toast-message";
import { ActivityIndicator } from "react-native";
import { useUser } from "./UserContext";
import { useQuery } from "@tanstack/react-query";
import { useUpdateUserProfileMutation } from "../api/queries/profileMutations";
import { getUserProfileQueryOptions } from "../api/queries/profileQueries";
import {
  ProfileForm,
  profileFormSchema,
} from "../validation/profileFormSchema";
import { Cleanliness } from "../types/enums/CLeanlinessEnum";
import { Lifestyle } from "../types/enums/LifestyleEnum";

const ProfileFormContext = createContext<any>(undefined);

export const ProfileFormProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const isMounted = useRef(false);
  const { user } = useUser();
  const profileId = user?.userProfile.id;

  const mutation = useUpdateUserProfileMutation(profileId, user?.id);
  const { isPending, data: profile } = useQuery(
    getUserProfileQueryOptions(profileId)
  );

  const methods = useForm<ProfileForm>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      bio: "",
      cleanliness: Cleanliness.TIDY,
      lifestyle: [],
    },
  });

  const {
    reset,
    handleSubmit,
    formState: { errors },
  } = methods;

  useEffect(() => {
    if (profile) {
      reset({
        bio: profile.bio ?? "",
        cleanliness: profile.cleanliness ?? Cleanliness.TIDY,
        lifestyle: profile.lifestyle ?? ([] as Lifestyle[]),
      });
    }
  }, [profile]);

  useEffect(() => {
    isMounted.current = true;
  }, []);

  const onSubmit = async (data: ProfileForm) => {
    try {
      await mutation!.mutateAsync(data);
      Toast.show({
        type: "success",
        text1: "Saved",
        text2: "Lifestyle info updated",
      });
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Could not update lifestyle info",
      });
    }
  };

  return (
    <ProfileFormContext.Provider value={{ onSubmit, formState: { errors } }}>
      <FormProvider {...methods}>
        {isPending ? <ActivityIndicator size="large" color="#fff" /> : children}
      </FormProvider>
    </ProfileFormContext.Provider>
  );
};

export const useProfileForm = () => {
  const context = useContext(ProfileFormContext);
  if (!context)
    throw new Error("useProfileForm must be used within ProfileFormProvider");
  return context;
};
