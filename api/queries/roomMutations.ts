import { useMutation, useQueryClient } from "@tanstack/react-query";
import dao from "../dao";
import { queryKeys } from "./queryKeys";

import { RoomProfileForm } from "@/validation/roomFormSchema";
import { RoomProfile } from "@/types/responses/RoomProfile";

export const useCreateRoomProfileMutation = (userId: number | undefined) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (roomProfile: RoomProfileForm) => {
      if (!userId) {
        console.error("User ID is required to create a room profile.");
        return Promise.reject(new Error("Missing userId"));
      }
      return dao.createRoomProfile(roomProfile);
    },
    onSuccess: (createdRoomProfile: RoomProfile) => {
      if (!userId) {
        throw new Error("User ID is required to create a room profile.");
      }
      queryClient.setQueryData(
        queryKeys.roomProfile(createdRoomProfile.id),
        createdRoomProfile
      );
      queryClient.invalidateQueries({
        queryKey: queryKeys.roomProfile(createdRoomProfile.id),
      });
    },
  });
};

export const useUpdateRoomProfileMutation = (
  roomProfileId: number | undefined
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (roomProfile: RoomProfileForm) => {
      if (!roomProfileId) {
        console.error("Room Profile ID is required to update a room profile.");
        return Promise.reject(new Error("Missing roomProfileId"));
      }
      return dao.updateRoomProfile(roomProfileId, roomProfile);
    },
    onSuccess: (updatedRoomProfile: RoomProfile) => {
      if (!roomProfileId) {
        throw new Error(
          "Room Profile ID is required to update a room profile."
        );
      }
      queryClient.setQueryData(
        queryKeys.roomProfile(roomProfileId),
        updatedRoomProfile
      );
      queryClient.invalidateQueries({
        queryKey: queryKeys.roomProfile(roomProfileId),
      });
    },
  });
};
