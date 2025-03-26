import { queryOptions } from "@tanstack/react-query";

import dao from "../ajax/dao";
import { queryKeys } from "./queryKeys";
import { UserProfile } from "../types/responses/UserProfile";
import { RoomProfile } from "../types/responses/RoomProfile";

export const getProfileQueryOptions = (profileId: number) =>
  queryOptions<UserProfile | RoomProfile, Error>({
    queryKey: queryKeys.profile(profileId),
    queryFn: () => dao.getProfile(profileId),
  });
