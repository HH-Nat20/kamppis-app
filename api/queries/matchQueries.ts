import { queryOptions } from "@tanstack/react-query";
import dao from "../dao";
import { MatchWithUser } from "@/types/Match";
import { User } from "@/types/responses/User";
import { Match } from "@/types/Match";
import { queryKeys } from "./queryKeys";

export const getUserMatchesQueryOptions = (userId: number) =>
  queryOptions<MatchWithUser[]>({
    queryKey: queryKeys.matches(userId),
    queryFn: async () => {
      // TODO: Do we really need 2 endpoints?
      const matchesResponse: Match[] = await dao.getMatches(userId);

      const fullMatches: MatchWithUser[] = await Promise.all(
        matchesResponse.map(async (match) => {
          const otherUserIds = match.userIds.filter((id) => id !== userId)!;
          const users: User[] = await Promise.all(
            otherUserIds.map((id) => dao.getUser(id))
          );

          return {
            matchId: match.id,
            users,
          };
        })
      );

      return fullMatches;
    },
    enabled: !!userId,
    staleTime: 0,
    //refetchInterval: 60 * 1000, // Poll every minute
    // stop polling
  });
