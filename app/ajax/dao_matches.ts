import { User } from "../types/User";
import { Match } from "../types/Match";
import { get } from "./request";

const ENDPOINT = "matches";

export const getMatches = async (userId: number) => {
  const response = await get(`/${ENDPOINT}?userId=${userId}`);
  const matches: Match[] = await response.json();
  return matches;
};

export const getMatchedProfiles = async (userId: number) => {
  const response = await get(`/${ENDPOINT}/profiles/${userId}`);
  const users: User[] = await response.json();
  return users;
};
