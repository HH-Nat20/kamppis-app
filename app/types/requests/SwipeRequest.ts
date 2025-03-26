export interface SwipeRequest {
  swipingProfileId: number;
  swipedProfileId: number;
  isRightSwipe: boolean;
}

export interface SwipeResponse {
  isMatch: boolean;
}
