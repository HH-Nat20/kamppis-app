export interface MatchUser {
  id: number;
  email: string;
  status: "OFFLINE" | "ONLINE";
}
export interface Match {
  id: number;
  users: MatchUser[];
  createdAt: number[];
  updatedAt: number[];
}
