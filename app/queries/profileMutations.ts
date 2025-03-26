import { useMutation, useQueryClient } from "@tanstack/react-query";
import dao from "../ajax/dao";
import { queryKeys } from "./queryKeys";

import { UserProfileForm } from "../types/requests/UserProfileForm";
import { UserProfile } from "../types/responses/UserProfile";
import { RoomProfile } from "../types/responses/RoomProfile";

export const useUpdateUserProfileMutation = (profileId: number | undefined) => {
  const queryClient = useQueryClient();

  if (!profileId) {
    throw new Error("profileId is required to update user profile");
  }

  return useMutation({
    mutationFn: (profile: UserProfileForm) =>
      dao.updateProfile(profileId, profile),
    onSuccess: (updatedProfile: UserProfile) => {
      queryClient.setQueryData(queryKeys.profile(profileId), updatedProfile);
      queryClient.invalidateQueries({ queryKey: queryKeys.profile(profileId) });
    },
  });
};
