import { queryOptions } from "@tanstack/react-query";
import dao from "../dao";
import { queryKeys } from "./queryKeys";

export const getServerHealthQuery = queryOptions({
  queryKey: queryKeys.serverHealth,
  queryFn: () => dao.getServerHealth(),
});

export const getDatabaseHealthQuery = queryOptions({
  queryKey: queryKeys.databaseHealth,
  queryFn: () => dao.getDatabaseHealth(),
});
