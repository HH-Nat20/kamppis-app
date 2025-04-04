import { create } from "./request";
import { SwipeRequest } from "@/types/requests/SwipeRequest";

const ENDPOINT = "swipes";

export const swipe = async (swipeRequest: SwipeRequest) => {
  console.log("Swiping:", swipeRequest);
  const response = await create(`${ENDPOINT}`, swipeRequest);
  console.log("Response:", response);
  const responseBody = await response.json();
  console.log("Swiped:", responseBody);
  return responseBody;
};
