export interface SwipeRequest {
  swipingUserId: number;
  swipedUserId: number;
  isRightSwipe: boolean;
}

export interface SwipeResponse {
  isMatch: boolean;
}
