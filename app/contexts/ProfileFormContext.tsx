import React, { createContext, useContext } from "react";
import { useForm, FormProvider, FieldErrors } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ActivityIndicator } from "react-native";
import Toast from "react-native-toast-message";

import { useUser } from "./UserContext";
import { useMatchableProfiles } from "./MatchableProfilesContext";
import { useQueries } from "@tanstack/react-query";
import { getUserPreferencesQueryOptions } from "../queries/userQueries";
import { getProfileQueryOptions } from "../queries/profileQueries";
import { useUpdateUserProfileMutation } from "../queries/profileMutations";

import { Gender, GenderLabels } from "../types/enums/GenderEnum";
import { MaxRent } from "../types/enums/MaxRentEnum";
import { Lifestyle } from "../types/enums/LifestyleEnum";
import { Location } from "../types/enums/LocationEnum";
import { Cleanliness } from "../types/enums/CLeanlinessEnum";
import { UserProfileForm } from "../types/requests/UserProfileForm";
import { UserFormSchema, profileSchema } from "../validation/profileSchema";

interface ProfileFormContextProps {
  loading: boolean;
  onSubmit: (data: UserProfileForm) => Promise<void>;
  onError?: (errors: any) => void;
  formState: { errors: FieldErrors<UserProfileForm> };
}

const ProfileFormContext = createContext<ProfileFormContextProps | undefined>(
  undefined
);

export const ProfileFormProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user } = useUser();
  const { refreshMatchableProfiles } = useMatchableProfiles();

  const profileId = user?.userProfile.id;
  const mutation = useUpdateUserProfileMutation(profileId);

  const methods = useForm<UserFormSchema>({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      age: 18,
      gender: Gender.OTHER,
      maxRent: MaxRent.HIGH,
      lifestyle: [],
      bio: "",
      minAgePreference: 18,
      maxAgePreference: 99,
      genderPreferences: [],
      locationPreferences: [],
    },
  });

  const {
    reset,
    handleSubmit,
    formState: { errors },
  } = methods;

  const results = useQueries({
    queries: [
      getProfileQueryOptions(profileId),
      getUserPreferencesQueryOptions(user?.id),
    ],
  });

  const isLoading = results.some((q) => q.isLoading);
  const [profileRes, prefRes] = results;

  React.useEffect(() => {
    if (
      profileRes?.data &&
      "lifestyle" in profileRes.data &&
      prefRes?.data &&
      user
    ) {
      const updatedProfile: UserProfileForm = {
        firstName: user.firstName ?? "",
        lastName: user.lastName ?? "",
        gender: user.gender ?? Gender.NOT_IMPORTANT,
        age: user.age ?? 18,
        maxRent: prefRes.data.roomPreference?.maxRent ?? MaxRent.HIGH,
        lifestyle: profileRes.data.lifestyle ?? [],
        cleanliness: profileRes.data.cleanliness ?? Cleanliness.TIDY,
        bio: profileRes.data.bio ?? "",
        minAgePreference:
          prefRes.data.roommatePreference?.minAgePreference ?? 21,
        maxAgePreference:
          prefRes.data.roommatePreference?.maxAgePreference ?? 44,
        genderPreferences: prefRes.data.roommatePreference
          ?.genderPreferences ?? [Gender.NOT_IMPORTANT],
        locationPreferences: prefRes.data.roommatePreference
          ?.locationPreferences ?? [
          Location.HELSINKI,
          Location.ESPOO,
          Location.VANTAA,
        ],
      };

      reset(updatedProfile);
    }
  }, [profileRes.data, prefRes.data, reset, user]);

  const onSubmit = async (data: UserProfileForm) => {
    if (!user) return;

    try {
      if (Object.keys(errors).length > 0) {
        Toast.show({
          type: "info",
          text1: "Invalid Input",
          text2: "Cannot submit this shit.",
        });
        return;
      }

      await mutation.mutateAsync(data);
      reset(data);
      Toast.show({
        type: "success",
        text1: "Profile Updated",
        text2: "Your changes have been saved.",
      });
      refreshMatchableProfiles();
    } catch (error) {
      console.error("Update failed", error);
      Toast.show({
        type: "error",
        text1: "Update Failed",
        text2: "Something went wrong. Please try again.",
      });
    }
  };

  const onError = (errors: any) => {
    Toast.show({
      type: "error",
      text1: "Invalid Input",
      text2: "Please fix the errors before submitting.",
    });
  };

  return (
    <ProfileFormContext.Provider
      value={{
        loading: isLoading || mutation.isPending,
        onSubmit,
        onError,
        formState: { errors },
      }}
    >
      <FormProvider {...methods}>
        {isLoading ? <ActivityIndicator size="large" color="#fff" /> : children}
      </FormProvider>
    </ProfileFormContext.Provider>
  );
};

export const useProfileForm = () => {
  const context = useContext(ProfileFormContext);
  if (!context) {
    throw new Error("useProfileForm must be used within a ProfileFormProvider");
  }
  return context;
};
