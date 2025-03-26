export const queryKeys = {
  user: (userId: number) => ["user", userId] as const,
  userPreferences: (userId: number) => ["userPreferences", userId] as const,
  profile: (profileId: number) => ["profile", profileId] as const,
  serverHealth: ["serverHealth"] as const,
  databaseHealth: ["databaseHealth"] as const,
};
