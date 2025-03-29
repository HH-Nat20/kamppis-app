import { queryOptions } from "@tanstack/react-query";

import dao from "../ajax/dao";
import { queryKeys } from "./queryKeys";
import { UserProfile } from "../types/responses/UserProfile";
import { RoomProfile } from "../types/responses/RoomProfile";

export const getProfileQueryOptions = (profileId: number | undefined) =>
  queryOptions<UserProfile | RoomProfile, Error>({
    queryKey: queryKeys.profile(profileId || 0), // 0 shouldn't be called because of the enabled below
    queryFn: async () => await dao.getProfile(profileId || 0),
    enabled: !!profileId,
  });

export const getUserProfileQueryOptions = (profileId: number | undefined) =>
  queryOptions<UserProfile, Error>({
    queryKey: queryKeys.profile(profileId || 0), // 0 shouldn't be called because of the enabled below
    queryFn: async () => {
      const profile = await dao.getProfile(profileId || 0);
      if ("user" in profile) {
        return profile as UserProfile;
      }
      throw new Error("Expected UserProfile but received RoomProfile");
    },
    enabled: !!profileId,
  });

export const getRoomProfileQueryOptions = (profileId: number | undefined) =>
  queryOptions<RoomProfile, Error>({
    queryKey: queryKeys.profile(profileId || 0), // 0 shouldn't be called because of the enabled below
    queryFn: async () => {
      const profile = await dao.getProfile(profileId || 0);
      if ("room" in profile) {
        return profile as RoomProfile;
      }
      throw new Error("Expected RoomProfile but received UserProfile");
    },
    enabled: !!profileId,
  });
