import { queryKeys } from "./queryKeys";
import { queryOptions } from "@tanstack/react-query";
import dao from "../dao";

import { RoomProfile } from "@/types/responses/RoomProfile";

export const getRoomProfileQueryOptions = (profileId: number | undefined) =>
  queryOptions<RoomProfile, Error>({
    queryKey: queryKeys.roomProfile(profileId!),
    queryFn: async () => await dao.getRoomProfile(profileId!),
    enabled: !!profileId,
  });
