import React from "react";

import { createContext, useContext, useEffect } from "react";
import { useForm, FormProvider, FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ActivityIndicator } from "react-native";
import Toast from "react-native-toast-message";
import { useUser } from "./UserContext";
import { useQuery } from "@tanstack/react-query";
import { useUpdatePreferencesMutation } from "../queries/prefrencesMutations";
import { getUserPreferencesQueryOptions } from "../queries/userQueries";
import {
  preferencesSchema,
  PreferencesForm,
} from "../validation/preferencesSchema";
import { Gender } from "../types/enums/GenderEnum";
import { Location } from "../types/enums/LocationEnum";

const PreferencesFormContext = createContext<any>(undefined);

export const PreferencesFormProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user } = useUser();
  const query = useQuery(getUserPreferencesQueryOptions(user?.id));
  const mutation = useUpdatePreferencesMutation(user?.id);

  const methods = useForm<PreferencesForm>({
    resolver: zodResolver(preferencesSchema),
    defaultValues: {
      maxRent: 1000,
      minAgePreference: 18,
      maxAgePreference: 99,
      genderPreferences: [Gender.NOT_IMPORTANT],
      locationPreferences: [Location.HELSINKI],
    },
  });

  const {
    reset,
    handleSubmit,
    formState: { errors },
  } = methods;

  useEffect(() => {
    if (query.data) {
      const roomPref = query.data.roomPreference;
      const roommatePref = query.data.roommatePreference;

      reset({
        maxRent: roomPref?.maxRent ?? 1000,
        minAgePreference: roommatePref?.minAgePreference ?? 21,
        maxAgePreference: roommatePref?.maxAgePreference ?? 44,
        genderPreferences: roommatePref?.genderPreferences ?? [
          Gender.NOT_IMPORTANT,
        ],
        locationPreferences: roommatePref?.locationPreferences ?? [
          Location.HELSINKI,
        ],
      });
    }
  }, [query.data]);

  const onSubmit = async (data: PreferencesForm) => {
    try {
      await mutation?.mutateAsync(data!);
      Toast.show({
        type: "success",
        text1: "Saved",
        text2: "Preferences updated",
      });
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Could not update preferences",
      });
    }
  };

  return (
    <PreferencesFormContext.Provider
      value={{ onSubmit, formState: { errors } }}
    >
      <FormProvider {...methods}>
        {query.isLoading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          children
        )}
      </FormProvider>
    </PreferencesFormContext.Provider>
  );
};

export const usePreferencesForm = () => {
  const context = useContext(PreferencesFormContext);
  if (!context)
    throw new Error("usePreferencesForm must be used inside provider");
  return context;
};
