import { create } from "./request";
import { SwipeRequest } from "../types/requests/SwipeRequest";

const ENDPOINT = "swipes";

export const swipe = async (swipeRequest: SwipeRequest) => {
  return create(`/${ENDPOINT}`, swipeRequest);
};
