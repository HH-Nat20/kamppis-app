import { User } from "../types/User";

import { get, update } from "./request";

const ENDPOINT = "user-profiles";

/**
 * Fetch possible matches for the user
 *
 * @param {number} userId
 * @returns {Promise<User[]>}
 */
export const getPossibleMatches = async (userId: number) => {
  //const response = await get(`/${ENDPOINT}/${userId}/query`);
  const response = await get(`/${ENDPOINT}`);
  if (response.status == 204) {
    return [];
  }
  const responseBody = await response.json();
  console.log(`Found ${responseBody.length} profiles: `, responseBody);
  const users: User[] = responseBody;
  return users;
};

/**
 * Fetch a user profile by ID
 *
 * @param {number} userId
 * @returns {Promise<User>}
 */
export const getUserProfile = async (userId: number) => {
  const response = await get(`/${ENDPOINT}/${userId}`);
  const user: User = await response.json();
  console.log(`Found user profile: `, user);
  return user;
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

/**
 * Update a user profile
 *
 * @param {number} userId
 * @returns {Promise<User>}
 */
export const updateUserProfile = async (userId: number, userProfile: User) => {
  const response = await update(`/${ENDPOINT}/${userId}`, userProfile);
  const user: User = await response.json();
  console.log(`Updated profile: `, user);
  return user;
};
