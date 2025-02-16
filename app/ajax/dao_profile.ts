import { User } from "../types/user";

import { get } from "./request";

const ENDPOINT = "user-profiles";

export const getPossibleMatches = async (userId: number) => {
  const response = await get(`/${ENDPOINT}/${userId}/query`);
  const users: User[] = await response.json();
  return users;
};
