import { queryOptions } from "@tanstack/react-query";
import dao from "../dao";
import { User } from "@/types/responses/User";
import { queryKeys } from "./queryKeys";

export const getRoommateQueryOptions = (userIds: number[]) =>
  queryOptions({
    queryKey: queryKeys.roommates(userIds),
    queryFn: async () => {
      const results = await Promise.all(userIds.map((id) => dao.getUser(id)));
      return results as User[];
    },
    enabled: !!userIds?.length,
  });
