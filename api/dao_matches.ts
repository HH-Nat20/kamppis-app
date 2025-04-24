import { User } from "@/types/responses/User";
import { Match } from "@/types/Match";
import { get, create } from "./request";

const ENDPOINT = "matches";

export const getMatches = async (userId: number) => {
  const response = await get(`${ENDPOINT}?userId=${userId}`);
  const matches: Match[] = await response.json();
  return matches;
};

export const getMatchedProfiles = async (userId: number) => {
  const response = await get(`${ENDPOINT}/profiles/${userId}`);
  const users: User[] = await response.json();
  return users;
};

export const removeUserFromMatch = async (matchId: number, userId: number) => {
  const response = await create(`${ENDPOINT}/${matchId}`, {
    userIds: [userId],
  });
  console.log("Response from removeUserFromMatch:", response);
  if (!response.ok) {
    throw new Error("Failed to remove user from match");
  }
  return true;
};
