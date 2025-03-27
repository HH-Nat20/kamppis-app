import { useMutation } from "@tanstack/react-query";
import { SwipeRequest, SwipeResponse } from "../types/requests/SwipeRequest";
import dao from "../ajax/dao";

export const useSwipeMutation = () => {
  return useMutation<SwipeResponse, Error, SwipeRequest>({
    mutationFn: (swipeRequest) => dao.swipe(swipeRequest),
  });
};
