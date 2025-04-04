import { queryOptions } from "@tanstack/react-query";

import dao from "../dao";
import { queryKeys } from "./queryKeys";
import { UserProfile } from "@/types/responses/UserProfile";
import { RoomProfile } from "@/types/responses/RoomProfile";

export const getProfileQueryOptions = (profileId: number | undefined) =>
  queryOptions<UserProfile | RoomProfile, Error>({
    queryKey: queryKeys.profile(profileId!),
    queryFn: async () => await dao.getProfile(profileId!),
    enabled: !!profileId,
  });

export const getUserProfileQueryOptions = (profileId: number | undefined) =>
  queryOptions<UserProfile, Error>({
    queryKey: queryKeys.profile(profileId!),
    queryFn: async () => {
      const profile = await dao.getProfile(profileId!);
      if ("user" in profile) {
        return profile as UserProfile;
      }
      throw new Error("Expected UserProfile but received RoomProfile");
    },
    enabled: !!profileId,
  });

export const getRoomProfileQueryOptions = (profileId: number | undefined) =>
  queryOptions<RoomProfile, Error>({
    queryKey: queryKeys.profile(profileId!),
    queryFn: async () => {
      const profile = await dao.getProfile(profileId!);
      if ("room" in profile) {
        return profile as RoomProfile;
      }
      throw new Error("Expected RoomProfile but received UserProfile");
    },
    enabled: !!profileId,
  });
