import { useMutation, useQueryClient } from "@tanstack/react-query";
import dao from "../ajax/dao";
import { queryKeys } from "./queryKeys";
import { PreferencesForm } from "../validation/preferencesSchema";
import { RoommatePreferences } from "../types/responses/RoommatePreferences";

export const useUpdatePreferencesMutation = (userId: number | undefined) => {
  const queryClient = useQueryClient();

  if (!userId) {
    //throw new Error("userId is required to update user preferences");
    return;
  }

  return useMutation({
    mutationFn: (preferences: PreferencesForm) =>
      dao.updatePreferences(userId, preferences),
    onSuccess: (updatedPreferences: RoommatePreferences) => {
      queryClient.setQueryData(
        queryKeys.preferences(userId),
        updatedPreferences
      );
      queryClient.invalidateQueries({
        queryKey: queryKeys.preferences(userId),
      });
    },
  });
};
