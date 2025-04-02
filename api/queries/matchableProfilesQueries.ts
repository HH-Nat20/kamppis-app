import { queryOptions } from "@tanstack/react-query";
import dao from "../dao";
import { queryKeys } from "./queryKeys";

/**
 * TEMP: Using getAllProfiles() for testing
 * CHANGE TO getPossibleMatches(userId) when going to production
 */
export const getMatchableProfilesQueryOptions = (userId: number) =>
  queryOptions({
    queryKey: queryKeys.matchableProfiles(userId),
    queryFn: () => dao.getAllProfiles(), // for now
    // queryFn: () => dao.getPossibleMatches(userId), // for production
    enabled: !!userId,
    staleTime: 0,
  });
