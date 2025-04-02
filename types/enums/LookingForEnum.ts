export enum LookingFor {
  USER_PROFILES = "USER_PROFILES",
  ROOM_PROFILES = "ROOM_PROFILES",
  OTHER_USER_PROFILES = "OTHER_USER_PROFILES",
  OTHER_USER_PROFILES_OR_ROOM_PROFILES = "OTHER_USER_PROFILES_OR_ROOM_PROFILES",
}

export const LookingForLabels: Record<LookingFor, string> = {
  [LookingFor.USER_PROFILES]: "Roommates for a free room",
  [LookingFor.ROOM_PROFILES]: "Free rooms",
  [LookingFor.OTHER_USER_PROFILES]: "People to search for a free room with",
  [LookingFor.OTHER_USER_PROFILES_OR_ROOM_PROFILES]: "Anything I can get",
};
