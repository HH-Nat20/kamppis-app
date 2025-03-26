import { queryOptions } from "@tanstack/react-query";

import dao from "../ajax/dao";
import { queryKeys } from "./queryKeys";
import { UserProfile } from "../types/responses/UserProfile";
import { RoomProfile } from "../types/responses/RoomProfile";

export const getProfileQueryOptions = (profileId: number | undefined) =>
  queryOptions<UserProfile | RoomProfile, Error>({
    queryKey: queryKeys.profile(profileId || 0), // 0 shouldn't be called because of the enabled below
    queryFn: () => dao.getProfile(profileId || 0),
    enabled: !!profileId,
  });
