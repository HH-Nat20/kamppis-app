import { User } from "../types/user";

import { baseUrl, get, create, update, remove } from "./request";

export const getPossibleMatches = async (userId: number) => {
  const response = await get(`${baseUrl}/user-profile/${userId}/query`);
  const users: User[] = await response.json();
  return users;
};
