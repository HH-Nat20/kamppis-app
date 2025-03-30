import { get, update } from "./request";
import { PreferencesForm } from "../validation/preferencesSchema";
import { RoommatePreferences } from "../types/responses/RoommatePreferences";
import { User } from "../types/responses/User";
import { UserProfile } from "../types/responses/UserProfile";

const ENDPOINT = "user";

/**
 * Fetch a user's preferences by ID
 *
 * @param {number} userId
 * @returns {Promise<RoommatePreferences>}
 */
export const getPreferences = async (
  userId: number
): Promise<RoommatePreferences> => {
  const response = await get(`${ENDPOINT}/${userId}/preferences`);
  const preferences: RoommatePreferences = await response.json();
  return preferences;
};

/**
 * Update a user's preferences
 *
 * @param {number} userId
 * @param {PreferencesForm} preferences
 * @returns {Promise<RoommatePreferences>}
 */
export const updatePreferences = async (
  userId: number,
  preferences: PreferencesForm
): Promise<RoommatePreferences> => {
  const response = await update(
    `${ENDPOINT}/${userId}/preferences`,
    preferences
  );
  const updatedPreferences: RoommatePreferences = await response.json();
  return updatedPreferences;
};
