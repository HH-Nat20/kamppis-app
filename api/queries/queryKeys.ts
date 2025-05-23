export const queryKeys = {
  user: (userId: number) => ["user", userId] as const,
  userPreferences: (userId: number) => ["userPreferences", userId] as const,
  profile: (profileId: number) => ["profile", profileId] as const,
  preferences: (userId: number) => ["preferences", userId] as const,
  matches: (userId: number) => ["matches", userId] as const,
  matchableProfiles: (userId: number) => ["matchableProfiles", userId] as const,
  roommates: (userIds: number[]) => ["roommates", userIds] as const,
  roomProfile: (roomProfileId: number) =>
    ["roomProfile", roomProfileId] as const,
  invite: (roomProfileId: number) => ["invite", roomProfileId] as const,
  flat: (flatId: number) => ["flat", flatId] as const,
  serverHealth: ["serverHealth"] as const,
  databaseHealth: ["databaseHealth"] as const,
};
