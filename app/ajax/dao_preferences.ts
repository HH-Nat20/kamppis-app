import { get, update } from "./request";
import { PreferencesForm } from "../validation/preferencesSchema";
import { Preferences } from "../types/responses/Preferences";
import { PreferencesRequest } from "../types/requests/PreferencesRequest";

const ENDPOINT = "user";

/**
 * Fetch a user's preferences by ID
 *
 * @param {number} userId
 * @returns {Promise<RoommatePreferences>}
 */
export const getPreferences = async (userId: number): Promise<Preferences> => {
  const response = await get(`${ENDPOINT}/${userId}/preferences`);
  const preferences: Preferences = await response.json();
  return preferences;
};

/**
 * Update a user's preferences
 *
 * @param {number} userId
 * @param {PreferencesForm} preferences
 * @returns {Promise<Preferences>}
 */
export const updatePreferences = async (
  userId: number,
  formData: PreferencesForm
): Promise<Preferences> => {
  const preferences: PreferencesRequest = {
    roomPreference: {
      maxRent: formData.maxRent,
      hasPrivateRoom: formData.hasPrivateRoom,
      maxRoommates: formData.maxRoommates,
      locationPreferences: formData.locationPreferences,
    },
    roommatePreference: {
      minAgePreference: formData.minAgePreference,
      maxAgePreference: formData.maxAgePreference,
      genderPreferences: formData.genderPreferences,
      locationPreferences: formData.locationPreferences,
    },
  };

  const response = await update(
    `${ENDPOINT}/${userId}/preferences`,
    preferences
  );
  const updatedPreferences: Preferences = await response.json();
  return updatedPreferences;
};
