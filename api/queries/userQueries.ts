import { queryOptions } from "@tanstack/react-query";
import dao from "../dao";
import { queryKeys } from "./queryKeys";
import { User } from "../../types/responses/User";
import { Preferences } from "../../types/responses/Preferences";

export const getUserQueryOptions = (userId: number | undefined) => {
  return queryOptions<User, Error>({
    queryKey: queryKeys.user(userId!),
    queryFn: () => dao.getUser(userId!),
    enabled: !!userId, // avoid running if userId is null (e.g. on initial load)
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
};

export const getUserPreferencesQueryOptions = (userId: number | undefined) => {
  return queryOptions<Preferences, Error>({
    queryKey: queryKeys.userPreferences(userId!),
    queryFn: () => dao.getPreferences(userId!),
    staleTime: 1000 * 60 * 5, // 5 minutes cache
    enabled: !!userId,
  });
};
