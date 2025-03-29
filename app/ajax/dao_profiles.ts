import { UserProfile } from "../types/responses/UserProfile";
import { RoomProfile } from "../types/responses/RoomProfile";

import { get, update } from "./request";
import { UserProfileForm } from "../types/requests/UserProfileForm";
import { PersonalInfoForm } from "../validation/personalInfoSchema";

const ENDPOINT = "profiles";

/**
 * Fetch possible matches for the user
 *
 * @param {number} userId
 * @returns {Promise<UserProfile[] | RoomProfile[]>}
 */
export const getPossibleMatches = async (userId: number) => {
  const response = await get(`${ENDPOINT}/${userId}/query`);
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
 * @returns {Promise<UserProfile | RoomProfile>}
 */
export const getProfile = async (
  userId: number
): Promise<UserProfile | RoomProfile> => {
  const response = await get(`${ENDPOINT}/${userId}`);
  const profile: UserProfile | RoomProfile = await response.json();
  //console.log(`Found user profile: `, user); // TODO: Figure out why this gets called so many times
  return profile;
};

/**
 * For testing purposes, fetch all user profiles
 *
 * @returns {Promise<(UserProfile | RoomProfile)[]>}
 */
export const getAllProfiles = async () => {
  const response = await get(ENDPOINT);
  const profiles: (UserProfile | RoomProfile)[] = await response.json();
  return profiles;
};

/**
 * Update a user profile
 *
 * @param {number} userId
 * @returns {Promise<UserProfile | RoomProfile>}
 */
export const updateProfile = async (
  profileId: number,
  profileForm: UserProfileForm
) => {
  console.log("Updating profile with form: ", profileForm);
  const response = await update(`${ENDPOINT}/${profileId}`, profileForm);
  const profile: UserProfile = await response.json();
  console.log(`Updated profile: `, profile);
  return profile;
};

/**
 * Update a user profile
 */
export const updateUserProfile = async (
  profileId: number,
  profileForm: PersonalInfoForm
) => {
  console.log("Updating user profile with form: ", profileForm);

  const body = {
    type: "userProfile",
    id: profileId,
    bio: profileForm.bio,
    cleanliness: profileForm.cleanliness,
    lifestyle: profileForm.lifestyle,
    photos: [], // TODO: Add photos or remove this field from the backend
  };

  const response = await update(`${ENDPOINT}/${profileId}`, body); // TODO: Check URL
  const profile: UserProfile = await response.json();
  console.log(`Updated user profile: `, profile);
  return profile;
};
