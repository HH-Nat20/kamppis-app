import { User } from "../types/User";

import { get } from "./request";

const ENDPOINT = "user-profiles";

/**
 * Fetch possible matches for the user
 *
 * @param {number} userId
 * @returns {Promise<User[]>}
 */
export const getPossibleMatches = async (userId: number) => {
  const response = await get(`/${ENDPOINT}/${userId}/query`);
  const users: User[] = await response.json();
  return users;
};

/**
 * For testing purposes, fetch all user profiles
 *
 * @returns {Promise<User[]>}
 */
export const getAllUserProfiles = async () => {
  const response = await get(`/${ENDPOINT}`);
  const users: User[] = await response.json();
  return users;
};
