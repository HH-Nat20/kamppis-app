import { Gender } from "../enums/GenderEnum";
import { Cleanliness } from "../enums/CLeanlinessEnum";
import { Lifestyle } from "../enums/LifestyleEnum";
import { Location } from "../enums/LocationEnum";

export type UserProfileForm = {
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
