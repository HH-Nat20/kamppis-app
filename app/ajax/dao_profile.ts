import { User } from "../types/user";

import { get } from "./request";

export const getPossibleMatches = async (userId: number) => {
  const response = await get(`/user-profile/${userId}/query`);
  const users: User[] = await response.json();
  return users;
};
