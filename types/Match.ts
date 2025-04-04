import { User } from "./responses/User";
export interface MatchUser {
  id: number;
  email: string;
  status: "OFFLINE" | "ONLINE";
}
export interface Match {
  id: number;
  userIds: number[];
}

export interface MatchWithUser {
  matchId: number;
  users: User[];
}
