import { queryOptions } from "@tanstack/react-query";

import dao from "../dao";
import { queryKeys } from "./queryKeys";

import { Flat } from "@/types/responses/Flat";

export const flatQueryOptions = (flatId: number | undefined) =>
  queryOptions<Flat, Error>({
    queryKey: queryKeys.flat(flatId!),
    queryFn: async () => await dao.getFlat(flatId!),
    enabled: !!flatId,
  });
