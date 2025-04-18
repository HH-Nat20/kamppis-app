import { queryKeys } from "./queryKeys";
import { queryOptions } from "@tanstack/react-query";
import dao from "../dao";

import { RoomProfile } from "@/types/responses/RoomProfile";
import { InviteResponse } from "@/types/responses/Invite";

export const getRoomProfileQueryOptions = (profileId: number | undefined) =>
  queryOptions<RoomProfile, Error>({
    queryKey: queryKeys.roomProfile(profileId!),
    queryFn: async () => await dao.getRoomProfile(profileId!),
    enabled: !!profileId,
  });

export const getRoomProfileInviteQueryOptions = (
  roomProfileId: number | undefined
) =>
  queryOptions<InviteResponse, Error>({
    queryKey: queryKeys.invite(roomProfileId!),
    queryFn: async () => await dao.getRoomProfileInvite(roomProfileId!),
    enabled: !!roomProfileId,
  });
