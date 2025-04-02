import { useMutation, useQueryClient } from "@tanstack/react-query";
import dao from "../dao";
import { queryKeys } from "./queryKeys";

import { ProfileForm } from "../../validation/profileFormSchema";

import { UserProfile } from "../../types/responses/UserProfile";

export const useUpdateUserProfileMutation = (
  profileId: number | undefined,
  userId: number | undefined
) => {
  const queryClient = useQueryClient();

  console.log("useUpdateUserProfileMutation", profileId);
  return useMutation({
    mutationFn: async (profile: ProfileForm) => {
      if (!profileId || !userId) {
        console.error(
          "Profile ID and User ID is required to update user profile"
        );
        return Promise.reject(new Error("Missing profileId"));
      }
      return dao.updateUserProfile(userId, profileId, profile);
    },
    onSuccess: (updatedProfile: UserProfile) => {
      if (!profileId) return;
      queryClient.setQueryData(queryKeys.profile(profileId), updatedProfile);
      queryClient.invalidateQueries({ queryKey: queryKeys.profile(profileId) });
      queryClient.invalidateQueries({
        queryKey: queryKeys.user(updatedProfile.user.id),
      });
    },
  });
};
