import { useMutation, useQueryClient } from "@tanstack/react-query";
import dao from "../dao";
import { queryKeys } from "./queryKeys";
import { PreferencesForm } from "@/validation/preferencesSchema";
import { Preferences } from "@/types/responses/Preferences";

export const useUpdatePreferencesMutation = (userId: number | undefined) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (preferences: PreferencesForm) => {
      if (!userId) {
        console.error("User ID is required to update preferences.");
        return Promise.reject(new Error("Missing userId"));
      }
      return dao.updatePreferences(userId, preferences);
    },
    onSuccess: (updatedPreferences: Preferences) => {
      if (!userId) {
        throw new Error("User ID is required to update preferences.");
      }
      queryClient.setQueryData(
        queryKeys.preferences(userId),
        updatedPreferences
      );
      queryClient.invalidateQueries({
        queryKey: queryKeys.preferences(userId),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.userPreferences(userId),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.matchableProfiles(userId),
      });
    },
  });
};
