import { useMutation, useQueryClient } from "@tanstack/react-query";
import dao from "../ajax/dao";
import { queryKeys } from "./queryKeys";

import {
  ProfileForm,
  profileFormSchema,
} from "../validation/profileFormSchema";

import { UserProfile } from "../types/responses/UserProfile";

export const useUpdateUserProfileMutation = (profileId: number | undefined) => {
  const queryClient = useQueryClient();

  console.log("useUpdateUserProfileMutation", profileId);

  if (!profileId) {
    //throw new Error("profileId is required to update user profile");
    return;
  }

  return useMutation({
    mutationFn: async (profile: ProfileForm) =>
      dao.updateUserProfile(profileId, profile),
    onSuccess: (updatedProfile: UserProfile) => {
      queryClient.setQueryData(queryKeys.profile(profileId), updatedProfile);
      queryClient.invalidateQueries({ queryKey: queryKeys.profile(profileId) });
      queryClient.invalidateQueries({
        queryKey: queryKeys.user(updatedProfile.user.id),
      });
    },
  });
};
