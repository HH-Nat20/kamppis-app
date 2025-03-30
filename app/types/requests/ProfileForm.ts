import { Gender } from "../enums/GenderEnum";
import { Cleanliness } from "../enums/CLeanlinessEnum";
import { Lifestyle } from "../enums/LifestyleEnum";
import { Location } from "../enums/LocationEnum";

/** NOT IN USE - CHANGE TO INCLUDE BOTH TYPES OF PROFILE */
export type ProfileForm = {
  firstName: string;
  lastName: string;
  age: number;
  gender: Gender;
  maxRent: number;
  cleanliness: Cleanliness;
  lifestyle: Lifestyle[];
  bio: string;
  minAgePreference: number;
  maxAgePreference: number;
  genderPreferences: Gender[];
  locationPreferences: Location[];
};
