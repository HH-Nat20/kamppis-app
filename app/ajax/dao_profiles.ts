import { UserProfile } from "../types/responses/UserProfile";
import { RoomProfile } from "../types/responses/RoomProfile";

import { User } from "../types/responses/User";

import { get, update } from "./request";
import { UserProfileForm } from "../types/requests/UserProfileForm";

const ENDPOINT = "profiles";

/**
 * Fetch possible matches for the user
 *
 * @param {number} userId
 * @returns {Promise<UserProfile[] | RoomProfile[]>}
 */
export const getPossibleMatches = async (userId: number) => {
  //const response = await get(`/${ENDPOINT}/${userId}/query`);
  const response = await get(`${ENDPOINT}`);
  if (response.status == 204) {
    return [];
  }
  const responseBody = await response.json();
  //console.log(`Found ${responseBody.length} profiles: `, responseBody);
  const profiles: UserProfile[] | RoomProfile[] = responseBody;
  return profiles;
};

/**
 * Fetch a profile by ID
 *
 * @param {number} userId
 * @returns {Promise<User>}
 */
export const getProfile = async (userId: number): Promise<User> => {
  const response = await get(`users/${userId}`);
  const profile: User = await response.json();
  //console.log(`Found user profile: `, user); // TODO: Figure out why this gets called so many times
  return profile;
};

/**
 * For testing purposes, fetch all user profiles
 *
 * @returns {Promise<User[]>}
 */
export const getAllProfiles = async () => {
  const response = await get(`users`);
  const profiles: User[] = await response.json(); // TODO: Is User a good idea? Maybe UserProfile[] | RoomProfile[]?
  return profiles;
};

/**
 * Update a user profile
 *
 * @param {number} userId
 * @returns {Promise<User>}
 */
export const updateProfile = async (
  userId: number,
  userProfile: UserProfileForm
) => {
  const response = await update(`${ENDPOINT}/${userId}`, userProfile);
  const user: UserProfile = await response.json();
  console.log(`Updated profile: `, user);
  return user;
};
