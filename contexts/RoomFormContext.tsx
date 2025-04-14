import React, { createContext, useContext, useEffect, useRef } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Toast from "react-native-toast-message";
import { ActivityIndicator } from "react-native";
import { useUser } from "./UserContext";
import { useQuery } from "@tanstack/react-query";

import { router, useLocalSearchParams } from "expo-router";

import { useUpdateRoomProfileMutation } from "@/api/queries/roomMutations";
import { getRoomProfileQueryOptions } from "@/api/queries/roomQueries";
import {
  RoomProfileForm,
  roomProfileFormSchema,
} from "@/validation/roomFormSchema";

const RoomFormContext = createContext<any>(undefined);

export const RoomFormProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const isMounted = useRef(false);
  const { user } = useUser();
  const { roomId } = useLocalSearchParams<{ roomId: string }>();

  if (!roomId) {
    router.back();
  }

  const mutation = useUpdateRoomProfileMutation(Number(roomId));

  const { isPending, data: room } = useQuery(
    getRoomProfileQueryOptions(Number(roomId))
  );

  const methods = useForm<RoomProfileForm>({
    resolver: zodResolver(roomProfileFormSchema),
    defaultValues: {
      name: "",
      userIds: [user?.id],
      flatId: Number(user?.roomProfiles[0]?.flat?.id),
      rent: 500,
      isPrivateRoom: true,
      furnished: false,
      furnishedInfo: undefined,
      bio: "Room description",
    },
  });

  const {
    reset,
    handleSubmit,
    formState: { errors },
  } = methods;

  useEffect(() => {
    if (room) {
      reset({
        name: room.name,
        userIds: room.userIds,
        flatId: room.flat.id,
        rent: room.rent,
        isPrivateRoom: room.isPrivateRoom,
        furnished: room.furnished,
        furnishedInfo: room.furnishedInfo,
        bio: room.bio,
      });
    }
  }, [room]);

  useEffect(() => {
    isMounted.current = true;
  }, []);

  const onSubmit = async (data: RoomProfileForm) => {
    try {
      await mutation!.mutateAsync(data);
      Toast.show({
        type: "success",
        text1: "Saved",
        text2: "Room updated",
      });
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Could not update room profile",
      });
    }
  };

  return (
    <RoomFormContext.Provider value={{ onSubmit, formState: { errors } }}>
      <FormProvider {...methods}>
        {isPending ? <ActivityIndicator size="large" color="#fff" /> : children}
      </FormProvider>
    </RoomFormContext.Provider>
  );
};

export const useRoomForm = () => {
  const context = useContext(RoomFormContext);
  if (!context)
    throw new Error("useRoomForm must be used within ProfileFormProvider");
  return context;
};
