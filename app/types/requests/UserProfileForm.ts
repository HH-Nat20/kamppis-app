import { Gender } from "../enums/GenderEnum";
import { Cleanliness } from "../enums/CLeanlinessEnum";
import { Lifestyle } from "../enums/LifestyleEnum";
import { Location } from "../enums/LocationEnum";
import { MaxRent } from "../enums/MaxRentEnum";

export type UserProfileForm = {
  firstName: string;
  lastName: string;
  age: number;
  gender: Gender;
  maxRent: MaxRent;
  cleanliness: Cleanliness;
  lifestyle: Lifestyle[];
  bio: string;
  minAgePreference: number;
  maxAgePreference: number;
  genderPreferences: Gender[];
  locationPreferences: Location[];
};
