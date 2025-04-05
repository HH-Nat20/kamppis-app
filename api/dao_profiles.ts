import { UserProfile } from "@/types/responses/UserProfile";
import { RoomProfile } from "@/types/responses/RoomProfile";

import { get, update } from "./request";
import { UserProfileForm } from "@/types/requests/UserProfileForm";
import { ProfileForm } from "@/validation/profileFormSchema";

import { LookingFor } from "@/types/enums/LookingForEnum";

const ENDPOINT = "profiles";

/**
 * Fetch possible matches for the user
 *
 * @param {number} userId
 * @returns {Promise<UserProfile[] | RoomProfile[]>}
 */
export const getPossibleMatches = async (userId: number) => {
  const profiles = [];

  console.log("Fetching possible matches for user: ", userId);

  let lookingFor: LookingFor = LookingFor.USER_PROFILES; // Default to user profiles

  // First check what profiles user wants to see
  try {
    const res = await get(`users/${userId}`);
    const user = await res.json();
    lookingFor = user?.lookingFor as LookingFor;
    console.log("User: ", user);
    console.log("User looking for: ", lookingFor);
  } catch (err) {
    console.log("Error fetching user", err);
    return;
  }

  // Then fetch all profiles for the user

  let responseBody1, responseBody2;

  try {
    const res1 = await get(`room-profiles/${userId}/query`);
    responseBody1 = await res1.json();
  } catch (err) {
    console.log("Error parsing room profiles response:", err);
  }

  try {
    const res2 = await get(`user-profiles/${userId}/query`);
    responseBody2 = await res2.json();
  } catch (err) {
    console.log("Error parsing user profiles response:", err);
  }

  if (responseBody1?.status === 404) {
    console.log("No room profiles found");
  } else if (Array.isArray(responseBody1)) {
    console.log(`Found ${responseBody1.length} room profiles`);
    if (
      lookingFor === LookingFor.OTHER_USER_PROFILES_OR_ROOM_PROFILES ||
      lookingFor === LookingFor.ROOM_PROFILES
    ) {
      profiles.push(...responseBody1);
    }
  }

  if (!responseBody2) {
    console.log("No user profiles found");
  } else if (Array.isArray(responseBody2)) {
    console.log(`Found ${responseBody2.length} user profiles`);
    if (
      lookingFor === LookingFor.OTHER_USER_PROFILES_OR_ROOM_PROFILES ||
      lookingFor === LookingFor.USER_PROFILES ||
      lookingFor === LookingFor.OTHER_USER_PROFILES
    ) {
      profiles.push(...responseBody2);
    }
  }

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
  userId: number,
  profileId: number,
  profileForm: ProfileForm
) => {
  console.log("Updating user profile with form: ", profileForm);

  const body = {
    type: "userProfile",
    userId: userId,
    bio: profileForm.bio,
    cleanliness: profileForm.cleanliness,
    lifestyle: profileForm.lifestyle,
  };

  const response = await update(`${ENDPOINT}/${profileId}`, body); // TODO: Check URL
  const profile: UserProfile = await response.json();
  console.log(`Updated user profile: `, profile);
  return profile;
};
