import { useMutation, useQueryClient } from "@tanstack/react-query";
import dao from "../dao";
import { queryKeys } from "./queryKeys";

import { FlatForm } from "@/validation/flatFormSchema";
import { Flat } from "@/types/responses/Flat";

export const useCreateFlatMutation = (userId: number | undefined) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (flat: FlatForm) => {
      if (!userId) {
        console.error("User ID is required to create a flat.");
        return Promise.reject(new Error("Missing userId"));
      }
      return dao.createFlat(flat);
    },
    onSuccess: (createdFlat: Flat) => {
      if (!userId) {
        throw new Error("User ID is required to create a flat.");
      }
      queryClient.setQueryData(queryKeys.flat(createdFlat.id), createdFlat);
      queryClient.invalidateQueries({
        queryKey: queryKeys.flat(createdFlat.id),
      });
    },
  });
};

export const useUpdateFlatMutation = (flatId: number | undefined) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (flat: FlatForm) => {
      if (!flatId) {
        console.error("Flat ID is required to update a flat.");
        return Promise.reject(new Error("Missing flatId"));
      }
      return dao.updateFlat(flatId, flat);
    },
    onSuccess: (updatedFlat: Flat) => {
      if (!flatId) {
        throw new Error("Flat ID is required to update a flat.");
      }
      queryClient.setQueryData(queryKeys.flat(flatId), updatedFlat);
      queryClient.invalidateQueries({
        queryKey: queryKeys.flat(flatId),
      });
    },
  });
};
