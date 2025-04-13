import React, { createContext, useContext, useEffect, useRef } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Toast from "react-native-toast-message";
import { ActivityIndicator } from "react-native";
import { useUser } from "./UserContext";
import { useQuery } from "@tanstack/react-query";

import { router, useLocalSearchParams } from "expo-router";

import { useUpdateFlatMutation } from "@/api/queries/flatMutations";
import { getFlatQueryOptions } from "@/api/queries/flatQueries";
import { FlatForm, flatFormSchema } from "@/validation/flatFormSchema";

import { Location } from "@/types/enums/LocationEnum";
import { Utilities } from "@/types/enums/UtilitiesEnum";

const FlatFormContext = createContext<any>(undefined);

export const FlatFormProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const isMounted = useRef(false);
  const { user } = useUser();
  const flatId = user?.roomProfiles.length
    ? user?.roomProfiles[0].flat?.id
    : undefined;

  if (!flatId) {
    router.back();
  }

  const mutation = useUpdateFlatMutation(Number(flatId));

  const { isPending, data: profile } = useQuery(
    getFlatQueryOptions(Number(flatId))
  );

  const methods = useForm<FlatForm>({
    resolver: zodResolver(flatFormSchema),
    defaultValues: {
      name: "",
      description: "",
      location: Location.HELSINKI,
      totalRoommates: 1,
      petHousehold: false,
      flatUtilities: [] as Utilities[],
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
        name: profile.name ?? "",
        description: profile.description ?? "",
        location: profile.location ?? Location.HELSINKI,
        totalRoommates: profile.totalRoommates ?? 1,
        petHousehold: profile.petHousehold ?? false,
        flatUtilities: profile.flatUtilities ?? ([] as Utilities[]),
      });
    }
  }, [profile]);

  useEffect(() => {
    isMounted.current = true;
  }, []);

  const onSubmit = async (data: FlatForm) => {
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
    <FlatFormContext.Provider value={{ onSubmit, formState: { errors } }}>
      <FormProvider {...methods}>
        {isPending ? <ActivityIndicator size="large" color="#fff" /> : children}
      </FormProvider>
    </FlatFormContext.Provider>
  );
};

export const useFlatForm = () => {
  const context = useContext(FlatFormContext);
  if (!context)
    throw new Error("useFlatForm must be used within ProfileFormProvider");
  return context;
};
