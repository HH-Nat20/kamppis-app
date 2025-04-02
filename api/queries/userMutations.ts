import { useMutation, useQueryClient } from "@tanstack/react-query";
import dao from "../dao";
import { queryKeys } from "./queryKeys";

import { User } from "../../types/responses/User";
import { UserForm } from "../../validation/userFormSchema";

export const useUpdateUserMutation = (userId: number | undefined) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (user: UserForm) => {
      if (!userId) {
        console.error("User ID is required to update user profile");
        return Promise.reject(new Error("Missing userId"));
      }
      return dao.updateUser(userId, user);
    },
    onSuccess: (updatedUser: User) => {
      if (!userId) return;
      queryClient.setQueryData(queryKeys.user(userId), updatedUser);
      queryClient.invalidateQueries({ queryKey: queryKeys.user(userId) });
    },
  });
};
